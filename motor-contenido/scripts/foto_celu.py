#!/usr/bin/env python3
"""Preparar fotos de CELU para placas de TV — los dos pasos deterministas.

El camino completo de una placa de producto (act. 2026-08-29) es:

    foto de celu REAL  →  [base]  →  IA que cambia SOLO el entorno
                                  →  remove_background
                                  →  [trim]  →  montaje por código en Remotion

Los pasos de IA van por el MCP de Higgsfield (`generate_image` con
`nano_banana_2` + `remove_background`) y no se pueden scriptear desde acá. Lo que
sí se repite igual todas las veces son los dos extremos, y son justo los que se
hacen mal a mano:

  base  — recorta la foto vertical/apaisada del celu a 16:9 y la baja a un tamaño
          razonable para subir. Sin esto el modelo recompone el encuadre solo.
  trim  — recorta el PNG que devuelve remove_background al bbox del alfa (viene
          con metros de transparencia alrededor, que arruinan el escalado en la
          placa) y deja una miniatura APLANADA sobre cobalto para poder mirarla:
          el lector de imágenes rechaza los PNG grandes con alfa.

Uso:
    python3 foto_celu.py base "referencias.../chipa 3.jpeg" out/base-chipa.jpg
    python3 foto_celu.py base foto.jpeg out/base.jpg --centro 0.62
    python3 foto_celu.py trim descargado.png ../remotion/public/media/tv/chipa/chipa-cut.png

El prompt de la IA tiene que pedir cambiar SOLO el entorno y conservar el
producto idéntico (grietas, manchas, silueta, mismo ángulo). Y el color de fondo
lo pone el CÓDIGO, no el modelo: el cobalto que genera la IA sale violáceo.
Detalle y prompt de referencia en `docs/placas-tv.md`.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

COBALTO = (53, 89, 224)


def base(src: Path, dest: Path, centro: float, ancho: int) -> None:
    """Recorta a 16:9 alrededor de `centro` (0=arriba, 1=abajo) y redimensiona."""
    im = Image.open(src).convert("RGB")
    w, h = im.size
    alto = int(w * 9 / 16)
    if alto > h:  # foto muy apaisada: recorto por los lados
        w = int(h * 16 / 9)
        x0 = (im.size[0] - w) // 2
        caja = (x0, 0, x0 + w, h)
    else:
        top = int(h * centro) - alto // 2
        top = max(0, min(top, h - alto))
        caja = (0, top, w, top + alto)
    im.crop(caja).resize((ancho, round(ancho * 9 / 16)), Image.LANCZOS).save(
        dest, quality=94
    )
    print(f"base → {dest}  {Image.open(dest).size}")


def trim(src: Path, dest: Path) -> None:
    """Recorta al bbox del alfa y deja una miniatura aplanada al lado."""
    im = Image.open(src).convert("RGBA")
    caja = im.split()[3].getbbox()
    if caja is None:
        sys.exit(f"{src}: el PNG no tiene nada opaco (¿falló el recorte?)")
    recortado = im.crop(caja)
    dest.parent.mkdir(parents=True, exist_ok=True)
    recortado.save(dest)

    prev = recortado.copy()
    prev.thumbnail((700, 700))
    hoja = Image.new("RGB", (prev.width + 160, prev.height + 160), COBALTO)
    hoja.paste(prev, (80, 80), prev)
    ruta_prev = dest.with_name(dest.stem + "-preview.jpg")
    hoja.save(ruta_prev, quality=90)
    print(f"trim → {dest}  {recortado.size}   (de {im.size})")
    print(f"       preview aplanada → {ruta_prev}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="paso", required=True)

    b = sub.add_parser("base", help="foto de celu → base 16:9 para subir a la IA")
    b.add_argument("src", type=Path)
    b.add_argument("dest", type=Path)
    b.add_argument(
        "--centro",
        type=float,
        default=0.5,
        help="dónde está el producto en la altura de la foto (0 arriba, 1 abajo). Default 0.5",
    )
    b.add_argument("--ancho", type=int, default=2400, help="ancho de salida (default 2400)")

    t = sub.add_parser("trim", help="PNG de remove_background → recortado al bbox + preview")
    t.add_argument("src", type=Path)
    t.add_argument("dest", type=Path)

    a = ap.parse_args()
    if a.paso == "base":
        base(a.src, a.dest, a.centro, a.ancho)
    else:
        trim(a.src, a.dest)


if __name__ == "__main__":
    main()
