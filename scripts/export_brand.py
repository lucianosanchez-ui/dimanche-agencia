#!/usr/bin/env python3
"""
export_brand.py — Baja los documentos de marca VIGENTES de Notion a brand/*.md

Notion es la fuente de verdad de la marca (base "📚 Documentos", Área = Marketing).
Este script regenera la carpeta brand/ para que los agentes (estratega, radar,
productor) y NotebookLM siempre lean la versión vigente, sin copiar a mano.

Uso:
    export NOTION_TOKEN=ntn_...
    python scripts/export_brand.py            # escribe en ../brand
    python scripts/export_brand.py --dry-run  # lista qué bajaría, no escribe

Requiere: pip install notion-client   (o: uv add notion-client)

Notas:
- Filtra Área = "Marketing" y Estado = "Vigente".
- El renderer de bloques cubre los tipos usuales (headings, listas, quote,
  callout, code, toggle, tabla). No pretende markdown perfecto: pretende
  texto fiel y legible para alimentar a los modelos.
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

try:
    from notion_client import Client
except ImportError:
    sys.exit("Falta notion-client. Instalá: pip install notion-client")

# --- Config ---------------------------------------------------------------
# Base "📚 Documentos" del teamspace Dimanche.
DB_DOCUMENTOS_ID = "dfa48c46-1027-4b84-84aa-72f86dc4892c"
AREA = "Marketing"
ESTADO = "Vigente"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "brand"

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text, flags=re.UNICODE)
    text = re.sub(r"[\s_-]+", "-", text)
    return text[:80] or "doc"


def rich_to_text(rich: list) -> str:
    return "".join(r.get("plain_text", "") for r in rich or [])


def render_block(client: Client, block: dict, depth: int = 0) -> list[str]:
    """Devuelve líneas markdown para un bloque y sus hijos."""
    t = block.get("type")
    data = block.get(t, {})
    indent = "  " * depth
    out: list[str] = []

    if t in ("heading_1", "heading_2", "heading_3"):
        hashes = "#" * int(t[-1])
        out.append(f"{hashes} {rich_to_text(data.get('rich_text'))}")
    elif t == "paragraph":
        txt = rich_to_text(data.get("rich_text"))
        if txt:
            out.append(f"{indent}{txt}")
    elif t == "bulleted_list_item":
        out.append(f"{indent}- {rich_to_text(data.get('rich_text'))}")
    elif t == "numbered_list_item":
        out.append(f"{indent}1. {rich_to_text(data.get('rich_text'))}")
    elif t == "to_do":
        mark = "x" if data.get("checked") else " "
        out.append(f"{indent}- [{mark}] {rich_to_text(data.get('rich_text'))}")
    elif t == "quote":
        out.append(f"> {rich_to_text(data.get('rich_text'))}")
    elif t == "callout":
        out.append(f"> {rich_to_text(data.get('rich_text'))}")
    elif t == "code":
        lang = data.get("language", "")
        out.append(f"```{lang}\n{rich_to_text(data.get('rich_text'))}\n```")
    elif t in ("toggle",):
        out.append(f"{indent}- {rich_to_text(data.get('rich_text'))}")
    elif t == "table_row":
        cells = [rich_to_text(c) for c in data.get("cells", [])]
        out.append("| " + " | ".join(cells) + " |")
    elif t == "divider":
        out.append("---")

    # Recursar hijos (tablas, toggles, listas anidadas).
    if block.get("has_children"):
        children = client.blocks.children.list(block_id=block["id"]).get("results", [])
        for child in children:
            out.extend(render_block(client, child, depth + 1))

    return out


def page_to_markdown(client: Client, page: dict) -> tuple[str, str]:
    props = page.get("properties", {})
    title = ""
    for p in props.values():
        if p.get("type") == "title":
            title = rich_to_text(p.get("title"))
            break

    def prop_text(name: str) -> str:
        p = props.get(name, {})
        pt = p.get("type")
        if pt == "select":
            return (p.get("select") or {}).get("name", "")
        if pt == "rich_text":
            return rich_to_text(p.get("rich_text"))
        if pt == "number":
            return str(p.get("number", ""))
        return ""

    front = [
        "---",
        f"titulo: {title}",
        f"estado: {prop_text('Estado')}",
        f"version: {prop_text('Versión')}",
        f"area: {prop_text('Área')}",
        f"notion_url: {page.get('url', '')}",
        "fuente: Notion (base 📚 Documentos). No editar a mano.",
        "---",
        "",
        f"# {title}",
        "",
    ]

    blocks = []
    cursor = None
    while True:
        resp = client.blocks.children.list(block_id=page["id"], start_cursor=cursor)
        blocks.extend(resp.get("results", []))
        if not resp.get("has_more"):
            break
        cursor = resp.get("next_cursor")

    body: list[str] = []
    for b in blocks:
        body.extend(render_block(client, b))

    return title, "\n".join(front + body) + "\n"


def query_marketing_docs(client: Client) -> list[dict]:
    results = []
    cursor = None
    flt = {
        "and": [
            {"property": "Área", "select": {"equals": AREA}},
            {"property": "Estado", "select": {"equals": ESTADO}},
        ]
    }
    while True:
        resp = client.databases.query(
            database_id=DB_DOCUMENTOS_ID, filter=flt, start_cursor=cursor
        )
        results.extend(resp.get("results", []))
        if not resp.get("has_more"):
            break
        cursor = resp.get("next_cursor")
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Exportar docs de marca vigentes de Notion a brand/")
    parser.add_argument("--dry-run", action="store_true", help="No escribe; solo lista.")
    args = parser.parse_args()

    if not NOTION_TOKEN:
        sys.exit("Falta NOTION_TOKEN en el entorno.")

    client = Client(auth=NOTION_TOKEN)
    pages = query_marketing_docs(client)
    print(f"Encontrados {len(pages)} documentos de marca vigentes (Área={AREA}).")

    if not args.dry_run:
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for page in pages:
        title, md = page_to_markdown(client, page)
        fname = f"{slugify(title)}.md"
        if args.dry_run:
            print(f"  [dry-run] {fname}  ←  {title}")
            continue
        (OUTPUT_DIR / fname).write_text(md, encoding="utf-8")
        print(f"  escrito {fname}")

    print("Listo. brand/ refleja la marca vigente en Notion.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
