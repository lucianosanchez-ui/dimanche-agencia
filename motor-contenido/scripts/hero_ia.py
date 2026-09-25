#!/usr/bin/env python3
"""Generar el HERO de una placa con IA, partiendo de fotos REALES.

Reemplaza a Higgsfield (dado de baja el 2026-09-25). Mismo modelo que venía
funcionando — **nano-banana de Google** — pero servido por **fal.ai**, que es una
API con key en vez de OAuth: no hay créditos que administrar ni sesión que
caducar, y cuesta ~US$0,04 por imagen.

La regla de oro no cambia: la IA **parte de fotos reales** y solo compone la
escena (mesa, luz, mano, fondo). Nunca inventa un producto que no existe. Por eso
`generar` EXIGE al menos una foto de referencia.

    generar   fotos reales + prompt  ->  hero 16:9 listo para la placa
    recortar  hero                   ->  PNG con alfa (rembg, local y gratis)

Uso:
    python3 hero_ia.py generar out/hero.jpg \\
        --ref "…/menu board/chipa 7.jpeg" \\
        --ref "…/menu board/bolsa kraft referencia.png" \\
        --prompt-file prompt.txt

    python3 hero_ia.py generar out/hero.jpg --ref foto.jpg --prompt "…" --variantes 2
    python3 hero_ia.py recortar out/hero.jpg out/hero-cut.png

**Cuándo NO recortar:** si en la escena hay manos, brazos o personas, el recorte
los deja fantasma (semitransparentes). En ese caso se genera el hero DIRECTO
sobre el crema de marca (pidiéndolo por hex en el prompt) y se usa a sangre.

El prompt que funciona para las placas está en
`.claude/skills/dimanche-tv/references/formato-promo-board.md`.
"""

from __future__ import annotations

import argparse
import base64
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

MODELO = "https://fal.run/fal-ai/nano-banana/edit"
RAIZ = Path(__file__).resolve().parents[2]


def leer_key() -> str:
    env = RAIZ / ".env"
    if not env.exists():
        sys.exit(f"No encuentro {env}. Ahí va la línea FAL_KEY=…")
    for linea in env.read_text().splitlines():
        if linea.startswith("FAL_KEY="):
            k = linea.split("=", 1)[1].strip().strip('"').strip("'")
            if k:
                return k
    sys.exit("No hay FAL_KEY en .env (pedísela a Luciano; no va al repo).")


def data_uri(path: Path, maxpx: int = 1600) -> str:
    """Foto real -> data URI. Se achica: subir 4000px tarda y no mejora nada."""
    if not path.exists():
        sys.exit(f"No existe la foto de referencia: {path}")
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    im.thumbnail((maxpx, maxpx))
    import io

    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=92)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def generar(dest: Path, refs: list[Path], prompt: str, ratio: str, variantes: int) -> None:
    cuerpo = json.dumps(
        {
            "prompt": prompt,
            "image_urls": [data_uri(r) for r in refs],
            "num_images": variantes,
            "output_format": "jpeg",
            "aspect_ratio": ratio,
        }
    ).encode()
    req = urllib.request.Request(
        MODELO,
        data=cuerpo,
        headers={"Authorization": f"Key {leer_key()}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=240) as r:
            res = json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"fal.ai respondió HTTP {e.code}: {e.read().decode()[:600]}")
    except urllib.error.URLError as e:
        sys.exit(f"No pude llegar a fal.ai: {e.reason}")

    imgs = res.get("images") or []
    if not imgs:
        sys.exit(f"fal.ai no devolvió imágenes. Respuesta: {json.dumps(res)[:400]}")

    dest.parent.mkdir(parents=True, exist_ok=True)
    for i, img in enumerate(imgs):
        salida = dest if i == 0 else dest.with_name(f"{dest.stem}-{i + 1}{dest.suffix}")
        urllib.request.urlretrieve(img["url"], salida)
        print(f"hero -> {salida}  {Image.open(salida).size}")
    print(f"(~US$0,04 por variante · {len(imgs)} generada/s)")


def recortar(src: Path, dest: Path) -> None:
    """Recorte local con rembg + trim al bbox. Gratis, no usa la API."""
    try:
        from rembg import remove
    except ImportError:
        sys.exit("Falta rembg. Instalalo con:  pip3 install rembg")

    if not src.exists():
        sys.exit(f"No existe: {src}")
    salida = remove(Image.open(src).convert("RGBA"))
    caja = salida.split()[3].getbbox()
    if caja is None:
        sys.exit("El recorte quedó vacío — probá con otra imagen.")
    salida = salida.crop(caja)
    dest.parent.mkdir(parents=True, exist_ok=True)
    salida.save(dest)

    # Miniatura aplanada sobre cobalto: el lector de imágenes rechaza los PNG
    # grandes con transparencia, así que sin esto no se puede revisar a ojo.
    prev = salida.copy()
    prev.thumbnail((700, 700))
    hoja = Image.new("RGB", (prev.width + 160, prev.height + 160), (53, 89, 224))
    hoja.paste(prev, (80, 80), prev)
    ruta_prev = dest.with_name(dest.stem + "-preview.jpg")
    hoja.save(ruta_prev, quality=90)
    print(f"recorte -> {dest}  {salida.size}")
    print(f"           preview -> {ruta_prev}")


def main() -> None:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    sub = ap.add_subparsers(dest="paso", required=True)

    g = sub.add_parser("generar", help="fotos reales + prompt -> hero por IA (fal.ai)")
    g.add_argument("dest", type=Path)
    g.add_argument(
        "--ref",
        type=Path,
        action="append",
        required=True,
        dest="refs",
        help="foto REAL de referencia (repetir para varias: producto + packaging)",
    )
    g.add_argument("--prompt", help="prompt en inglés")
    g.add_argument("--prompt-file", type=Path, help="archivo con el prompt")
    g.add_argument("--ratio", default="16:9")
    g.add_argument("--variantes", type=int, default=1, help="1-4 (cada una cuesta)")

    r = sub.add_parser("recortar", help="hero -> PNG con alfa (rembg local, gratis)")
    r.add_argument("src", type=Path)
    r.add_argument("dest", type=Path)

    a = ap.parse_args()
    if a.paso == "generar":
        if a.prompt_file:
            prompt = a.prompt_file.read_text().strip()
        elif a.prompt:
            prompt = a.prompt
        else:
            sys.exit("Falta --prompt o --prompt-file")
        generar(a.dest, a.refs, prompt, a.ratio, max(1, min(4, a.variantes)))
    else:
        recortar(a.src, a.dest)


if __name__ == "__main__":
    main()
