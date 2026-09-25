"""Contact sheets para TRIAR piles de fotos.

Genera láminas numeradas (índice global bajo cada miniatura) + un mapping.txt
(índice -> nombre de archivo) para después copiar las elegidas por índice.

Uso:
    python contacto.py "<carpeta_fotos>" "<carpeta_salida>" [--per 49] [--cols 7]

Pensado para triar el banco crudo (Sesion-principal, el dump, etc.) sin abrir
50 fotos a mano: mirás la lámina, anotás los índices buenos, copiás por índice.
"""
from __future__ import annotations

import argparse
import math
import os

from PIL import Image, ImageDraw, ImageFont

EXTS = (".jpg", ".jpeg", ".png")
CREMA = (233, 227, 217)
COBALTO = (53, 89, 224)


def _font(size: int):
    for p in (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ):
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def contact_sheets(src: str, out: str, per: int = 49, cols: int = 7,
                   tw: int = 150, th: int = 190) -> int:
    os.makedirs(out, exist_ok=True)
    imgs = sorted(f for f in os.listdir(src) if f.lower().endswith(EXTS))
    with open(os.path.join(out, "mapping.txt"), "w", encoding="utf-8") as m:
        m.write("\n".join(f"{i:03d}\t{f}" for i, f in enumerate(imgs)))

    pad, lbl = 10, 18
    font = _font(13)
    sheets = 0
    for s in range(0, len(imgs), per):
        batch = imgs[s:s + per]
        rows = math.ceil(len(batch) / cols)
        W = cols * (tw + pad) + pad
        H = rows * (th + lbl + pad) + pad
        sheet = Image.new("RGB", (W, H), CREMA)
        d = ImageDraw.Draw(sheet)
        for j, f in enumerate(batch):
            gi = s + j
            try:
                im = Image.open(os.path.join(src, f)).convert("RGB")
                im.thumbnail((tw, th))
            except Exception:
                im = Image.new("RGB", (tw, th), (200, 200, 200))
            r, c = divmod(j, cols)
            x = pad + c * (tw + pad)
            y = pad + r * (th + lbl + pad)
            sheet.paste(im, (x + (tw - im.width) // 2, y + (th - im.height) // 2))
            d.text((x + 2, y + th + 2), f"{gi:03d}", fill=COBALTO, font=font)
        sheets += 1
        p = os.path.join(out, f"sheet-{sheets:02d}.png")
        sheet.save(p)
        print(f"[ok] {p}  ({len(batch)} fotos)")
    print(f"[done] {len(imgs)} imgs · {sheets} láminas · mapping en {out}/mapping.txt")
    return len(imgs)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--per", type=int, default=49)
    ap.add_argument("--cols", type=int, default=7)
    args = ap.parse_args()
    contact_sheets(args.src, args.out, per=args.per, cols=args.cols)


if __name__ == "__main__":
    main()
