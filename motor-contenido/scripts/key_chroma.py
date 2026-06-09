#!/usr/bin/env python3
"""
key_chroma.py — recorta (chroma key) productos generados sobre fondo VERDE
a PNG con transparencia, recortados al borde. Reutilizable para sprites de
placas (lluvia de criollos, medialunas, etc.).

Uso:
    python3 key_chroma.py salida_dir img1.png [img2.png ...]

Genera <salida_dir>/<nombre>-cut.png (RGBA, recortado) + un qa-cutout.png
con los recortes sobre cobalto real (#3559E0) para revisar bordes/halo.
"""
import sys, os
import numpy as np
from PIL import Image

COBALTO = (53, 89, 224)
LOW, HIGH = 22, 60          # rampa de "verdosidad" para el alpha
PAD = 10                    # margen al recortar al bounding box


def key_one(path):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    greenness = g - np.maximum(r, b)

    # Alpha: 1 donde NO es verde, 0 donde es verde pleno, rampa suave en el borde.
    alpha = np.clip((HIGH - greenness) / (HIGH - LOW), 0.0, 1.0)

    # Despill: bajar el verde sobrante (tinte en los bordes) a un valor neutro.
    spill = g > np.maximum(r, b)
    g2 = np.where(spill, np.maximum(r, b), g)
    out = np.stack([r, g2, b, alpha * 255.0], axis=-1).astype(np.uint8)
    rgba = Image.fromarray(out, "RGBA")

    # Recorte al bounding box del producto (alpha > 25).
    mask = (out[..., 3] > 25)
    ys, xs = np.where(mask)
    if len(xs) and len(ys):
        x0, x1 = max(0, xs.min() - PAD), min(rgba.width, xs.max() + PAD)
        y0, y1 = max(0, ys.min() - PAD), min(rgba.height, ys.max() + PAD)
        rgba = rgba.crop((x0, y0, x1, y1))
    return rgba


def main():
    out_dir = sys.argv[1]
    os.makedirs(out_dir, exist_ok=True)
    cuts = []
    for p in sys.argv[2:]:
        rgba = key_one(p)
        name = os.path.splitext(os.path.basename(p))[0].replace("-green", "")
        dst = os.path.join(out_dir, f"{name}-cut.png")
        rgba.save(dst)
        cuts.append(rgba)
        print("cut:", dst, rgba.size)

    # QA: los recortes sobre cobalto real.
    if cuts:
        W, H = 1920, 1080
        qa = Image.new("RGB", (W, H), COBALTO)
        n = len(cuts)
        for i, c in enumerate(cuts):
            target_h = 460
            scale = target_h / c.height
            cw, ch = int(c.width * scale), int(c.height * scale)
            cs = c.resize((cw, ch), Image.LANCZOS)
            x = int((i + 0.5) * W / n - cw / 2)
            y = int(H / 2 - ch / 2)
            qa.paste(cs, (x, y), cs)
        qa_path = os.path.join(out_dir, "qa-cutout.png")
        qa.save(qa_path)
        print("qa:", qa_path)


if __name__ == "__main__":
    main()
