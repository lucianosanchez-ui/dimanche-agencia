"""Brand Kit en código — Dimanche Panificados.

Fuente única de verdad VISUAL para producir piezas por código (Pillow).
Encapsula lo que define "cómo se ve Dimanche": paleta, tipografía Niveau,
íconos/wordmark/sello reales del Drive, y los helpers de composición.

La ONDA DIMANCHE (cerrada 2026-06-09):
  - El PRODUCTO a COLOR es el héroe (apetitoso, vivo). La foto SIEMPRE a color;
    el cobalto NO tiñe la foto: vive en la capa gráfica / props / packaging real.
  - La identidad entra como TOQUE: cobalto #3559E0 + crema #E9E3D9 + monograma D
    + sello "con olorcito a domingo" (cápsula DIRECTA, sin recuadro blanco) +
    titular Niveau con filo deadpan + line-art cuando suma.
  - Versátil: lifestyle / solo-producto / placa. Sin naranja, sin emojis.

Escala tipográfica y grilla: ver
  .claude/skills/dimanche-media/references/foundations.md
(medidas sobre un lienzo de referencia de 1080 px de ancho; escalan proporcional).

Regla visual de oro: la IA SIEMPRE parte de algo REAL. Este módulo NO fabrica
producto — compone la capa de marca sobre una foto real (el hero).

Uso típico:
    from brand_kit import (
        COBALTO, CREMA, drive_base, font, icono, wordmark, sello,
        cover, scrim_abajo, poner_titular, poner_sello, poner_monograma,
    )
    base = Image.open(foto_real).convert("RGBA")
    lienzo = cover(base, 1080, 1350)            # 4:5 feed
    scrim_abajo(lienzo, frac=0.42, strength=170)
    poner_titular(ImageDraw.Draw(lienzo), "no es de ayer", y=1040)
    poner_sello(lienzo, escala=0.34)
    poner_monograma(lienzo, color="crema", caja=120)
"""

from __future__ import annotations

import glob
import os
from functools import lru_cache
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------
# 1. Paleta
# ---------------------------------------------------------------------------
# Disciplina de color estricta (foundations.md §3). Cero naranja.
COBALTO = (53, 89, 224)      # #3559E0 — primario: badge, bloques, íconos, capa gráfica
CREMA = (233, 227, 217)      # #E9E3D9 — soporte cálido / fondos suaves
BLANCO = (255, 255, 255)     # #FFFFFF — fondo principal / texto-íconos sobre foto
NEGRO = (0, 0, 0)            # #000000 — texto / monocromo

# Tints/shades del cobalto (profundidad / estados)
COBALTO_OSCURO = (40, 67, 168)   # #2843A8
COBALTO_CLARO = (214, 222, 251)  # #D6DEFB

PALETA = {
    "cobalto": COBALTO,
    "crema": CREMA,
    "blanco": BLANCO,
    "negro": NEGRO,
    "cobalto_oscuro": COBALTO_OSCURO,
    "cobalto_claro": COBALTO_CLARO,
}


def _rgb(color) -> tuple[int, int, int]:
    """Acepta nombre de paleta ('cobalto'), '#3559E0' o tupla RGB → devuelve RGB."""
    if isinstance(color, str):
        if color in PALETA:
            return PALETA[color]
        s = color.lstrip("#")
        if len(s) == 6:
            return tuple(int(s[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]
        raise ValueError(f"Color no reconocido: {color!r}")
    return tuple(color[:3])  # type: ignore[return-value]


# ---------------------------------------------------------------------------
# 2. Escala tipográfica y grilla (foundations.md §1 y §2)
# ---------------------------------------------------------------------------
# Lienzo de referencia: 1080 px de ancho. Para otros tamaños usar escala().
LIENZO_REF = 1080

# Nivel -> (tamaño px @1080, peso Niveau, interlineado, tracking %)
ESCALA_TIPO = {
    "display":    {"size": 120, "weight": "black",   "leading": 1.00, "tracking": -0.01, "upper": True},
    "titular":    {"size": 80,  "weight": "bold",    "leading": 1.10, "tracking": 0.0,   "upper": False},
    "subtitulo":  {"size": 52,  "weight": "medium",  "leading": 1.15, "tracking": 0.0,   "upper": False},
    "cuerpo":     {"size": 32,  "weight": "regular", "leading": 1.35, "tracking": 0.0,   "upper": False},
    "epigrafe":   {"size": 24,  "weight": "light",   "leading": 1.30, "tracking": 0.0,   "upper": False},
    "antetitulo": {"size": 20,  "weight": "medium",  "leading": 1.20, "tracking": 0.08,  "upper": True},
}

# Grilla / espaciado (múltiplos de 8 sobre 1080)
UNIDAD = 8
ESPACIADO = (8, 16, 24, 32, 48, 64, 96)
MARGEN = 80                  # margen exterior (~7.5% del ancho)
SAFE_STORY = 250             # safe area arriba/abajo en story 9:16


def escala(valor_ref: float, ancho_lienzo: int) -> int:
    """Escala una medida pensada @1080 px al ancho real del lienzo."""
    return round(valor_ref * ancho_lienzo / LIENZO_REF)


# ---------------------------------------------------------------------------
# 3. Resolver del Drive (por glob, agnóstico de la cuenta)
# ---------------------------------------------------------------------------
_DRIVE_GLOB = os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-*/Mi unidad/06_Marketing/00_Marca"
)
_FOTOS_GLOB = os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-*/Mi unidad/06_Marketing/01_Fotos"
)


@lru_cache(maxsize=1)
def drive_base() -> Path:
    """Devuelve la carpeta 00_Marca del Drive (primer match del glob).

    No hardcodea la cuenta: resuelve GoogleDrive-<lo-que-sea>.
    """
    matches = sorted(glob.glob(_DRIVE_GLOB))
    if not matches:
        raise FileNotFoundError(
            "No se encontró el Drive (00_Marca). Glob probado:\n  " + _DRIVE_GLOB +
            "\nVerificá que Google Drive esté montado en ~/Library/CloudStorage/."
        )
    return Path(matches[0])


@lru_cache(maxsize=1)
def fotos_base() -> Path:
    """Carpeta 01_Fotos del Drive (banco real de fotos)."""
    matches = sorted(glob.glob(_FOTOS_GLOB))
    if not matches:
        raise FileNotFoundError("No se encontró 01_Fotos en el Drive. Glob: " + _FOTOS_GLOB)
    return Path(matches[0])


def fotos_sesion_principal() -> list[Path]:
    """Las fotos buenas (Sesion_Principal) — usar para PRODUCTO, nunca Editadas.

    Devuelve la lista ordenada de .JPG. El fondo lo pone el prompt, no la foto
    (el banco es mayormente azul/madera; copiar su fondo devuelve al azul-base).
    """
    carpeta = fotos_base() / "Sesiones" / "Sesion_Principal" / "Fotos"
    return sorted(carpeta.glob("*.JPG"))


# Sub-rutas dentro de 00_Marca
_FONT_DIR = "Tipografias/Niveau_Grotesk"
_ICON_DIR = "Elementos_Graficos/Blue"          # íconos cobalto con alpha
_ICON_DIR_CREMA = "Elementos_Graficos/Off_white"  # variante crema (solo D)
_LOGO_DIR = "Logos"

# Niveau por peso -> nombre de archivo .otf
_FONT_FILES = {
    "black":      "HVD Fonts - NiveauGroteskBlack.otf",
    "bold":       "HVD Fonts - NiveauGroteskBold.otf",
    "medium":     "HVD Fonts - NiveauGroteskMedium.otf",
    "regular":    "HVD Fonts - NiveauGroteskRegular.otf",
    "light":      "HVD Fonts - NiveauGroteskLight.otf",
    "extralight": "HVD Fonts - NiveauGroteskExtraLight.otf",
}

# Íconos del set real (cobalto, carpeta Blue). Clave corta -> archivo PNG.
_ICONOS = {
    "croissant": "blue croissant.png",
    "sun":       "blue sun.png",
    "bread1":    "blue bread1.png",
    "bread2":    "blue bread2.png",
    "cake":      "blue cake.png",
    "cookie":    "blue cookie.png",
    "d":         "blue d.png",       # monograma D (variante ícono)
    "sign1":     "blue sign1.png",   # sello "con olorcito a domingo"
}

WORDMARK_FILE = "Perfil-13.png"   # wordmark Dimanche
SELLO_FILE = "blue sign1.png"     # lockup "con olorcito a domingo" (carpeta Blue)


def _drive_path(rel: str) -> Path:
    p = drive_base() / rel
    if not p.exists():
        raise FileNotFoundError(f"Asset no encontrado en el Drive: {p}")
    return p


# ---------------------------------------------------------------------------
# 4. Loaders de fuente
# ---------------------------------------------------------------------------
@lru_cache(maxsize=64)
def font_path(weight: str = "regular") -> Path:
    """Ruta al .otf de Niveau para un peso (black/bold/medium/regular/light/extralight)."""
    weight = weight.lower()
    if weight not in _FONT_FILES:
        raise ValueError(
            f"Peso Niveau desconocido: {weight!r}. Opciones: {sorted(_FONT_FILES)}"
        )
    return _drive_path(f"{_FONT_DIR}/{_FONT_FILES[weight]}")


@lru_cache(maxsize=256)
def font(weight: str = "regular", size: int = 32) -> ImageFont.FreeTypeFont:
    """Carga Niveau Grotesk por peso + tamaño (px). Cacheada."""
    return ImageFont.truetype(str(font_path(weight)), size)


def font_nivel(nivel: str, ancho_lienzo: int = LIENZO_REF) -> ImageFont.FreeTypeFont:
    """Carga un nivel de la escala tipográfica (display/titular/...) escalado al lienzo."""
    if nivel not in ESCALA_TIPO:
        raise ValueError(f"Nivel desconocido: {nivel!r}. Opciones: {sorted(ESCALA_TIPO)}")
    spec = ESCALA_TIPO[nivel]
    size = escala(spec["size"], ancho_lienzo)
    return font(spec["weight"], size)


# ---------------------------------------------------------------------------
# 5. Loaders de assets (íconos / wordmark / sello) con recolor manteniendo alpha
# ---------------------------------------------------------------------------
def _recolor_alpha(im: Image.Image, color) -> Image.Image:
    """Tiñe una imagen RGBA con un color sólido, MANTENIENDO el canal alpha.

    Los íconos del set vienen en cobalto plano con alpha. Para pasarlos a crema
    (sobre foto) o reafirmar el cobalto, pintamos RGB con el color y conservamos
    la silueta (alpha) original.
    """
    im = im.convert("RGBA")
    r, g, b = _rgb(color)
    solido = Image.new("RGBA", im.size, (r, g, b, 0))
    alpha = im.getchannel("A")
    solido.putalpha(alpha)
    return solido


def _scaled(im: Image.Image, *, alto: int | None = None, ancho: int | None = None,
            caja: int | None = None) -> Image.Image:
    """Escala manteniendo proporción. `caja` = ajustar al cuadrado máximo (contain)."""
    w, h = im.size
    if caja is not None:
        f = caja / max(w, h)
    elif alto is not None:
        f = alto / h
    elif ancho is not None:
        f = ancho / w
    else:
        return im
    return im.resize((max(1, round(w * f)), max(1, round(h * f))), Image.LANCZOS)


def icono(nombre: str, *, color: str | tuple | None = None, caja: int | None = None,
          alto: int | None = None, ancho: int | None = None) -> Image.Image:
    """Carga un ícono del set real (Blue) como RGBA.

    nombre: croissant | sun | bread1 | bread2 | cake | cookie | d | sign1
    color : None = cobalto original; 'crema'/'cobalto'/'blanco'/'#hex'/RGB para
            recolorear manteniendo el alpha (p. ej. crema para ir sobre foto).
    caja/alto/ancho: tamaño objetivo (px). 'caja' = lado máximo (contain).
    """
    if nombre not in _ICONOS:
        raise ValueError(f"Ícono desconocido: {nombre!r}. Opciones: {sorted(_ICONOS)}")
    im = Image.open(_drive_path(f"{_ICON_DIR}/{_ICONOS[nombre]}")).convert("RGBA")
    if color is not None:
        im = _recolor_alpha(im, color)
    return _scaled(im, alto=alto, ancho=ancho, caja=caja)


def wordmark(*, color: str | tuple | None = None, ancho: int | None = None,
             alto: int | None = None, caja: int | None = None) -> Image.Image:
    """Carga el wordmark Dimanche (Logos/Perfil-13.png) como RGBA.

    color: None = original; o recolor manteniendo alpha (crema sobre foto, etc.).
    """
    im = Image.open(_drive_path(f"{_LOGO_DIR}/{WORDMARK_FILE}")).convert("RGBA")
    if color is not None:
        im = _recolor_alpha(im, color)
    return _scaled(im, alto=alto, ancho=ancho, caja=caja)


def sello(*, color: str | tuple | None = None, ancho: int | None = None,
          alto: int | None = None, caja: int | None = None) -> Image.Image:
    """Carga el sello "con olorcito a domingo" (Elementos_Graficos/Blue/blue sign1.png).

    DIRECTO, sin recuadro blanco atrás (regla de la onda). Es una cápsula con alpha;
    pegalo tal cual sobre la pieza. color: None = cobalto original; o recolor
    (p. ej. 'crema' para ir sobre foto oscura) manteniendo alpha.
    """
    im = Image.open(_drive_path(f"{_ICON_DIR}/{SELLO_FILE}")).convert("RGBA")
    if color is not None:
        im = _recolor_alpha(im, color)
    return _scaled(im, alto=alto, ancho=ancho, caja=caja)


def monograma(*, color: str | tuple | None = None, caja: int | None = None) -> Image.Image:
    """Carga el monograma D. color='crema' usa la variante real Off_white (D CRUDO);
    cualquier otro color recolorea el D cobalto manteniendo alpha."""
    if isinstance(color, str) and color == "crema":
        im = Image.open(_drive_path(f"{_ICON_DIR_CREMA}/D CRUDO.png")).convert("RGBA")
    else:
        im = Image.open(_drive_path(f"{_ICON_DIR}/D BLUE.png")).convert("RGBA")
        if color is not None:
            im = _recolor_alpha(im, color)
    return _scaled(im, caja=caja)


# ---------------------------------------------------------------------------
# 6. Helpers de composición
# ---------------------------------------------------------------------------
def cover(im: Image.Image, w: int, h: int) -> Image.Image:
    """Recorta y escala `im` para llenar exactamente w×h (object-fit: cover, centrado).

    La foto NO se deforma: se escala al máximo y se recorta el sobrante centrado.
    Devuelve RGBA.
    """
    im = im.convert("RGBA")
    src_w, src_h = im.size
    f = max(w / src_w, h / src_h)
    nw, nh = round(src_w * f), round(src_h * f)
    im = im.resize((nw, nh), Image.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return im.crop((left, top, left + w, top + h))


def scrim_abajo(im: Image.Image, frac: float = 0.42, strength: int = 170) -> Image.Image:
    """Degradado negro de abajo hacia arriba para legibilidad del texto (in-place).

    foundations.md §3: texto sobre foto SIEMPRE con scrim. NO tiñe el producto:
    es un gradiente negro que sube desde el borde inferior y se desvanece.

    frac     : fracción de alto que cubre el scrim (0–1).
    strength : opacidad máxima del negro en el borde (0–255).
    Devuelve la misma imagen (modificada) por comodidad.
    """
    im_rgba = im if im.mode == "RGBA" else im.convert("RGBA")
    w, h = im_rgba.size
    band = max(1, round(h * frac))
    grad = Image.new("L", (1, band), 0)
    px = grad.load()
    for y in range(band):
        # 0 arriba (transparente) -> strength abajo (más oscuro)
        px[0, y] = int(strength * (y / max(1, band - 1)))
    grad = grad.resize((w, band))
    mask = Image.new("L", (w, h), 0)
    mask.paste(grad, (0, h - band))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    overlay.putalpha(mask)
    im_rgba.alpha_composite(overlay)
    if im is not im_rgba:
        im.paste(im_rgba)
    return im_rgba


def _wrap(draw: ImageDraw.ImageDraw, texto: str, fnt: ImageFont.FreeTypeFont,
          max_w: int) -> list[str]:
    """Word-wrap por ancho máximo en px."""
    lineas: list[str] = []
    for parrafo in texto.split("\n"):
        palabras = parrafo.split(" ")
        actual = ""
        for p in palabras:
            prueba = (actual + " " + p).strip()
            if draw.textlength(prueba, font=fnt) <= max_w or not actual:
                actual = prueba
            else:
                lineas.append(actual)
                actual = p
        lineas.append(actual)
    return lineas


def poner_titular(d: ImageDraw.ImageDraw, texto: str, *, y: int | None = None,
                  x: int | None = None, nivel: str = "titular", color="blanco",
                  ancho_lienzo: int | None = None, max_w: int | None = None,
                  align: str = "left", anchor_bottom: bool = False) -> int:
    """Dibuja un titular Niveau con la escala/leading/tracking del nivel.

    d           : ImageDraw sobre el lienzo.
    nivel       : display | titular | subtitulo | cuerpo | epigrafe | antetitulo.
    color       : nombre de paleta / #hex / RGB.
    x,y         : posición del bloque; por defecto x=MARGEN, y=MARGEN (escalados).
    max_w       : ancho máximo de línea (px); por defecto ancho - 2*margen.
    align       : 'left' | 'center'.
    anchor_bottom: si True, `y` es el borde INFERIOR del bloque (crece hacia arriba).
    Devuelve la coordenada Y del borde inferior del bloque dibujado.
    """
    canvas_w = ancho_lienzo or d.im.size[0]  # type: ignore[attr-defined]
    spec = ESCALA_TIPO.get(nivel, ESCALA_TIPO["titular"])
    fnt = font_nivel(nivel, canvas_w)
    margen = escala(MARGEN, canvas_w)
    x = margen if x is None else x
    y = margen if y is None else y
    max_w = (canvas_w - 2 * margen) if max_w is None else max_w
    col = _rgb(color)

    if spec.get("upper"):
        texto = texto.upper()

    lineas = _wrap(d, texto, fnt, max_w)
    asc, desc = fnt.getmetrics()
    line_h = round((asc + desc) * spec["leading"])
    tracking_px = round(spec["tracking"] * fnt.size)

    total_h = line_h * len(lineas)
    y0 = (y - total_h) if anchor_bottom else y

    cy = y0
    for linea in lineas:
        if tracking_px == 0:
            lw = d.textlength(linea, font=fnt)
            lx = x + (max_w - lw) / 2 if align == "center" else x
            d.text((lx, cy), linea, font=fnt, fill=col)
        else:
            # tracking manual: dibujar glifo a glifo
            lw = sum(d.textlength(ch, font=fnt) + tracking_px for ch in linea) - tracking_px
            cx = x + (max_w - lw) / 2 if align == "center" else x
            for ch in linea:
                d.text((cx, cy), ch, font=fnt, fill=col)
                cx += d.textlength(ch, font=fnt) + tracking_px
        cy += line_h
    return cy


def _pos(canvas, im, pos, margen):
    """Resuelve un anchor textual a (x, y) en píxeles para pegar `im` en `canvas`."""
    W, H = canvas.size
    w, h = im.size
    centros = {
        "tl": (margen, margen),
        "tc": ((W - w) // 2, margen),
        "tr": (W - w - margen, margen),
        "cl": (margen, (H - h) // 2),
        "cc": ((W - w) // 2, (H - h) // 2),
        "cr": (W - w - margen, (H - h) // 2),
        "bl": (margen, H - h - margen),
        "bc": ((W - w) // 2, H - h - margen),
        "br": (W - w - margen, H - h - margen),
    }
    if isinstance(pos, str):
        return centros[pos]
    return pos  # ya es (x, y)


def poner_sello(c: Image.Image, *, escala_w: float = 0.34, color: str | tuple | None = None,
                pos: str | tuple = "bc", margen: int | None = None,
                pad_extra: int = 0) -> Image.Image:
    """Pega el sello "con olorcito a domingo" DIRECTO (sin recuadro) sobre la pieza.

    c        : lienzo RGBA destino (modificado in-place).
    escala_w : ancho del sello como fracción del ancho del lienzo (0–1).
    color    : None = cobalto original; 'crema'/'blanco' para ir sobre foto oscura.
    pos      : anchor ('bc','bl','br','tc',...) o (x, y) en px.
    """
    c = c if c.mode == "RGBA" else c.convert("RGBA")
    W, _ = c.size
    s = sello(color=color, ancho=round(W * escala_w))
    m = (escala(MARGEN, W) + pad_extra) if margen is None else margen
    x, y = _pos(c, s, pos, m)
    c.alpha_composite(s, (int(x), int(y)))
    return c


def poner_monograma(c: Image.Image, *, caja: int = 120, color: str | tuple = "crema",
                    pos: str | tuple = "tr", margen: int | None = None) -> Image.Image:
    """Pega el monograma D como toque de marca.

    c     : lienzo RGBA destino (modificado in-place).
    caja  : lado máximo del monograma en px (@ancho real; pasá ya escalado si querés).
    color : 'crema' (variante real Off_white) / 'cobalto' / 'blanco' / #hex / RGB.
    pos   : anchor o (x, y).
    """
    c = c if c.mode == "RGBA" else c.convert("RGBA")
    W, _ = c.size
    m = escala(MARGEN, W) if margen is None else margen
    mono = monograma(color=color, caja=caja)
    x, y = _pos(c, mono, pos, m)
    c.alpha_composite(mono, (int(x), int(y)))
    return c


def poner_icono(c: Image.Image, nombre: str, *, caja: int = 120, color: str | tuple = "crema",
                pos: str | tuple = "tc", margen: int | None = None) -> Image.Image:
    """Pega un ícono del set (1 por pieza, arriba) como toque de marca.

    color: 'crema'/'blanco' sobre foto, 'cobalto' sobre fondo claro.
    """
    c = c if c.mode == "RGBA" else c.convert("RGBA")
    W, _ = c.size
    m = escala(MARGEN, W) if margen is None else margen
    ic = icono(nombre, color=color, caja=caja)
    x, y = _pos(c, ic, pos, m)
    c.alpha_composite(ic, (int(x), int(y)))
    return c


def poner_wordmark(c: Image.Image, *, ancho_frac: float = 0.30, color: str | tuple | None = "crema",
                   pos: str | tuple = "bc", margen: int | None = None) -> Image.Image:
    """Pega el wordmark Dimanche. ancho_frac = ancho como fracción del lienzo."""
    c = c if c.mode == "RGBA" else c.convert("RGBA")
    W, _ = c.size
    m = escala(MARGEN, W) if margen is None else margen
    wm = wordmark(color=color, ancho=round(W * ancho_frac))
    x, y = _pos(c, wm, pos, m)
    c.alpha_composite(wm, (int(x), int(y)))
    return c


def lienzo(w: int = 1080, h: int = 1350, fill="blanco") -> Image.Image:
    """Crea un lienzo RGBA liso (para placas). Default 4:5 (feed)."""
    r, g, b = _rgb(fill)
    return Image.new("RGBA", (w, h), (r, g, b, 255))


# ---------------------------------------------------------------------------
# 7. Smoke test / swatch
# ---------------------------------------------------------------------------
def _swatch(salida: str = "/tmp/test_brandkit.png") -> str:
    """Genera un swatch que ejercita paleta, tipografía, ícono, sello y monograma.

    Devuelve la ruta de salida. Usado por `python brand_kit.py`.
    """
    W, H = 1080, 1350
    c = lienzo(W, H, fill="crema")
    d = ImageDraw.Draw(c)

    # Banda de paleta arriba
    swatches = [("cobalto", COBALTO), ("crema", CREMA), ("blanco", BLANCO),
                ("negro", NEGRO), ("cob.osc", COBALTO_OSCURO), ("cob.claro", COBALTO_CLARO)]
    bw = W // len(swatches)
    for i, (nombre, col) in enumerate(swatches):
        d.rectangle([i * bw, 0, (i + 1) * bw, 160], fill=col)
        tcol = "blanco" if nombre in ("cobalto", "negro", "cob.osc") else "negro"
        d.text((i * bw + 12, 130), nombre, font=font("medium", 22), fill=_rgb(tcol))

    # Tipografía: un nivel de cada peso
    y = 220
    for nivel in ("display", "titular", "subtitulo", "cuerpo", "epigrafe", "antetitulo"):
        f = font_nivel(nivel, W)
        muestra = "Dimanche" if nivel in ("display", "titular") else f"{nivel} · Niveau"
        d.text((escala(MARGEN, W), y), muestra, font=f, fill=COBALTO)
        y += int(f.size * 1.25) + 12

    # Ícono cobalto (croissant) + monograma D crema sobre banda cobalto
    d.rectangle([0, 880, W, 1180], fill=COBALTO)
    ic = icono("croissant", caja=200)            # cobalto original sobre crema arriba
    c.alpha_composite(ic, (escala(MARGEN, W), 700 - 0))
    ic_crema = icono("croissant", color="crema", caja=180)
    c.alpha_composite(ic_crema, (escala(MARGEN, W), 940))
    mono = monograma(color="crema", caja=160)
    c.alpha_composite(mono, (W - 160 - escala(MARGEN, W), 930))

    # Sello directo (sin recuadro) abajo
    poner_sello(c, escala_w=0.5, pos="bc")

    c.convert("RGB").save(salida, "PNG")
    return salida


if __name__ == "__main__":
    base = drive_base()
    print(f"[ok] Drive resuelto: {base}")
    print(f"[ok] Niveau black: {font_path('black').name}")
    out = _swatch()
    print(f"[ok] Swatch generado: {out}")
