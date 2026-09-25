"""Fábrica de contenido semanal — Dimanche.

La VÍA RÁPIDA: en vez de armar pieza por pieza a mano, definís la semana
(una lista de specs) y sale TODO el lote de una pasada, sobre `plantillas.py`.

Salida en una carpeta:
  - las piezas (PNG, listas para publicar / "Propuesto"),
  - `_contact.png`  → contact sheet para revisar toda la semana de un vistazo,
  - `semana.md`     → grilla con fecha · pilar · formato · titular · copy (caption).

Esto es lo que Anto/Claude Code corre una vez por semana en vez de improvisar.

Uso:
    python fabrica.py                       # corre el piloto demo
    python fabrica.py semana.json --out CARPETA

Spec de cada pieza (dict):
    nombre   : slug corto (va al nombre de archivo)            [obligatorio]
    formato  : "lifestyle" | "solo_producto" | "placa"         [obligatorio]
    titular  : texto sobre la pieza (Niveau con filo)          [obligatorio]
    foto     : ruta a foto REAL (lifestyle / solo_producto)    [regla de oro]
    ratio    : "4:5" | "9:16"                                  (default 4:5)
    copy     : caption del post (NO va en la imagen)           (opcional)
    fecha    : "YYYY-MM-DD" o texto                            (opcional)
    pilar    : pilar de contenido POL-015                      (opcional)
    + opts de la plantilla: sello, icono_nombre, mono, fondo,
      color_titular, bajada, filo
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

import brand_kit as bk
import plantillas as P

# opts que acepta cada formato (se pasan desde el spec si están presentes)
_OPTS = {
    "lifestyle": {"sello", "icono_nombre", "mono"},
    "solo_producto": {"mono"},
    "placa": {"bajada", "fondo", "color_titular", "filo", "icono_nombre", "sello", "mono"},
}


def _render_pieza(spec: dict) -> Image.Image:
    fmt = spec["formato"]
    if fmt not in _OPTS:
        raise ValueError(f"Formato desconocido: {fmt!r}. Opciones: {sorted(_OPTS)}")
    ratio = spec.get("ratio", "4:5")
    opts = {k: spec[k] for k in _OPTS[fmt] if k in spec}

    if fmt == "placa":
        return P.placa(spec["titular"], ratio=ratio, **opts)

    foto = spec.get("foto")
    if not foto or not Path(foto).exists():
        raise FileNotFoundError(
            f"[{spec.get('nombre','?')}] formato {fmt} necesita una foto REAL existente "
            f"(regla de oro). Recibí: {foto!r}")
    return P.render(fmt, foto, spec["titular"], ratio=ratio, **opts)


def producir(piezas: list[dict], salida: str | Path) -> list[Path]:
    """Renderiza todo el lote a `salida/` + contact sheet + semana.md."""
    out = Path(salida)
    out.mkdir(parents=True, exist_ok=True)
    hechas: list[tuple[dict, Path, Image.Image]] = []

    for i, spec in enumerate(piezas, 1):
        try:
            img = _render_pieza(spec)
        except Exception as e:
            print(f"[FALLA] {i:02d} {spec.get('nombre','?')}: {e}")
            continue
        ratio = spec.get("ratio", "4:5").replace(":", "x")
        fname = f"{i:02d}_{spec['nombre']}_{ratio}.png"
        ruta = out / fname
        img.convert("RGB").save(ruta, "PNG")
        hechas.append((spec, ruta, img))
        print(f"[ok] {ruta.name}")

    if hechas:
        _contact_sheet([(s, im) for s, _, im in hechas], out / "_contact.png")
        _semana_md([s for s, _, _ in hechas], out / "semana.md")
        print(f"[done] {len(hechas)}/{len(piezas)} piezas → {out}")
    return [r for _, r, _ in hechas]


# ---------------------------------------------------------------------------
# Contact sheet: toda la semana en una imagen para revisar de un vistazo
# ---------------------------------------------------------------------------
def _contact_sheet(items: list[tuple[dict, Image.Image]], ruta: Path, cols: int = 3) -> Path:
    thumb_w = 380
    pad = 36
    label_h = 46
    crema = bk.CREMA
    cobalto = bk.COBALTO

    thumbs = []
    for spec, im in items:
        h = round(im.height * thumb_w / im.width)
        thumbs.append((spec, im.convert("RGB").resize((thumb_w, h), Image.LANCZOS)))

    rows = (len(thumbs) + cols - 1) // cols
    row_h = [0] * rows
    for idx, (_, t) in enumerate(thumbs):
        r = idx // cols
        row_h[r] = max(row_h[r], t.height)

    W = cols * thumb_w + (cols + 1) * pad
    H = sum(row_h) + rows * label_h + (rows + 1) * pad
    sheet = Image.new("RGB", (W, H), crema)
    d = ImageDraw.Draw(sheet)
    f_lbl = bk.font("bold", 22)

    y = pad
    for r in range(rows):
        x = pad
        for cidx in range(cols):
            idx = r * cols + cidx
            if idx >= len(thumbs):
                break
            spec, t = thumbs[idx]
            sheet.paste(t, (x, y))
            etiqueta = f"{idx + 1:02d} · {spec.get('formato','')} · {spec.get('nombre','')}"
            d.text((x, y + t.height + 10), etiqueta, font=f_lbl, fill=cobalto)
            x += thumb_w + pad
        y += row_h[r] + label_h + pad

    sheet.save(ruta, "PNG")
    print(f"[ok] contact sheet → {ruta.name}")
    return ruta


# ---------------------------------------------------------------------------
# semana.md: grilla con los copys, lista para cargar a "Propuesto"
# ---------------------------------------------------------------------------
def _semana_md(piezas: list[dict], ruta: Path) -> Path:
    lines = [
        "# Semana de contenido — Dimanche (lote fábrica)",
        "",
        "Piezas producidas en lote. Revisar look en `_contact.png`, pasar por brand-check, cargar a Calendario como **Propuesto**.",
        "",
        "| # | Fecha | Pilar | Formato | Titular | Copy (caption) |",
        "|---|---|---|---|---|---|",
    ]
    for i, p in enumerate(piezas, 1):
        copy = (p.get("copy", "") or "").replace("\n", " / ").replace("|", "·")
        titular = (p.get("titular", "") or "").replace("\n", " / ").replace("|", "·")
        lines.append(
            f"| {i:02d} | {p.get('fecha','—')} | {p.get('pilar','—')} | "
            f"{p.get('formato','')} | {titular} | {copy} |")
    ruta.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"[ok] grilla → {ruta.name}")
    return ruta


# ---------------------------------------------------------------------------
# PILOTO — una semana de prueba con material real (heroes ya producidos)
# ---------------------------------------------------------------------------
def _demo() -> list[Path]:
    slides = Path.home() / "Downloads" / "dimanche-slides"

    def real(*nombres: str) -> str | None:
        for n in nombres:
            p = slides / n
            if p.exists():
                return str(p)
        return None

    # OJO: solo fotos LIMPIAS (sin texto horneado). Las piezas ya compuestas
    # (HERO_*, combo_*, feed-*, 0X_*) re-componen texto sobre texto → no usar.
    cinna = real("cinna-escena.png")
    desayuno = real("cinna-escena.png")  # foto limpia (la sesión real del Drive está online-only)
    macro = real("angle-macro-lateral.png", "cinna-escena.png")

    semana = [
        {
            "nombre": "padre-domingo", "formato": "lifestyle", "ratio": "4:5",
            "foto": cinna, "titular": "el domingo, con él",
            "fecha": "2026-06-21", "pilar": "Ritual del domingo",
            "copy": "Este domingo el desayuno lo arma él. Vos poné la mesa.",
        },
        {
            "nombre": "medialuna-macro", "formato": "solo_producto", "ratio": "4:5",
            "foto": macro, "titular": "medialuna de manteca",
            "fecha": "2026-06-18", "pilar": "Producto-héroe",
            "copy": "La de siempre. La que no falla. Recién salida.",
        },
        {
            "nombre": "previa-partido", "formato": "placa", "ratio": "4:5",
            "titular": "la previa\nempieza temprano", "fondo": "cobalto",
            "color_titular": "crema", "icono_nombre": "croissant",
            "fecha": "2026-06-16", "pilar": "Ritual / cultura",
            "copy": "Antes del partido, pasá. La picada dulce la ponemos nosotros.",
        },
        {
            "nombre": "desayuno-story", "formato": "lifestyle", "ratio": "9:16",
            "foto": desayuno, "titular": "domingo,\ntodos los días",
            "fecha": "2026-06-19", "pilar": "Ritual del domingo",
            "copy": "Story: arrancá la semana como un domingo.",
        },
        {
            "nombre": "abrimos-domingos", "formato": "placa", "ratio": "9:16",
            "titular": "abrimos\ntodos los\ndomingos", "fondo": "crema",
            "color_titular": "cobalto", "icono_nombre": "sun",
            "bajada": "Villa Allende · Gauss · Boulevares",
            "fecha": "2026-06-20", "pilar": "Servicio",
            "copy": "Story: te esperamos. Los 3 locales, todos los domingos.",
        },
    ]
    return producir(semana, "/tmp/semana_dimanche")


def main() -> None:
    ap = argparse.ArgumentParser(description="Fábrica de contenido semanal Dimanche")
    ap.add_argument("spec", nargs="?", help="JSON con la lista de piezas de la semana")
    ap.add_argument("--out", default="/tmp/semana_dimanche", help="carpeta de salida")
    args = ap.parse_args()

    if not args.spec:
        print("[*] Sin spec → corriendo PILOTO demo con material real...")
        _demo()
        return

    piezas = json.loads(Path(args.spec).read_text(encoding="utf-8"))
    producir(piezas, args.out)


if __name__ == "__main__":
    main()
