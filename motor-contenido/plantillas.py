"""Plantillas de estáticas — Dimanche Panificados.

Funciones por formato que aplican LA ONDA DIMANCHE (cerrada 2026-06-09) sobre
una foto REAL del producto. Construidas sobre `brand_kit.py` (paleta, Niveau,
assets reales del Drive, helpers de composición).

LA ONDA (qué hace cada pieza):
  - Producto a COLOR full-bleed = HÉROE (apetito, energía Cinnamood). NUNCA duotono.
  - Identidad como TOQUE: cobalto #3559E0 en la capa GRÁFICA (no tiñe la foto),
    crema, monograma D, sello "con olorcito a domingo" (cápsula DIRECTA, sin
    recuadro blanco), titular Niveau con FILO deadpan, line-art cuando suma.
  - Scrim solo donde va el texto (no tapa el producto).
  - Versátil: lifestyle / solo-producto / placa. Sin naranja, sin emojis.

Tres registros (mínimo pedido):
  - pieza_lifestyle(foto, titular, sello=True)  → vida/mano/café, marca como toque.
  - pieza_solo_producto(foto, titular)           → macro del antojo, toque mínimo arriba.
  - placa(titular, ...)                          → sin foto: crema/cobalto + texto + monograma.

Cada formato sale en 4:5 feed (1080x1350). Con `ratio="9:16"` salen en
story/reel (1080x1920). El registro PLANTILLAS mapea nombre -> función.

Uso:
    from plantillas import pieza_lifestyle, pieza_solo_producto, placa, PLANTILLAS
    img = pieza_lifestyle("/ruta/foto.jpg", "no es de ayer")
    img.save("/tmp/pieza.png")
    # o por registro:
    img = PLANTILLAS["solo_producto"]("/ruta/foto.jpg", "medialuna de manteca")

Test:  python plantillas.py   (genera /tmp/test_plantilla_*.png con fotos reales)
"""

from __future__ import annotations

from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw, ImageFont

import brand_kit as bk
from brand_kit import (
    COBALTO, CREMA, BLANCO, NEGRO,
    _rgb, escala, MARGEN, LIENZO_REF,
    font, font_nivel, ESCALA_TIPO,
    icono, monograma,
    cover, scrim_abajo, _wrap, _pos,
    poner_monograma,
)

# ---------------------------------------------------------------------------
# Tamaños canónicos
# ---------------------------------------------------------------------------
FEED = (1080, 1350)    # 4:5 vertical (gana grilla en IG)
STORY = (1080, 1920)   # 9:16 story / reel

RATIOS = {"4:5": FEED, "feed": FEED, "9:16": STORY, "story": STORY, "reel": STORY}


def _dims(ratio: str) -> tuple[int, int]:
    if ratio not in RATIOS:
        raise ValueError(f"Ratio desconocido: {ratio!r}. Opciones: {sorted(RATIOS)}")
    return RATIOS[ratio]


# ---------------------------------------------------------------------------
# Helpers de capa gráfica (la ONDA: identidad como toque)
# ---------------------------------------------------------------------------
def _trim(im: Image.Image) -> Image.Image:
    """Recorta el padding transparente de un PNG con alpha (assets del Drive)."""
    im = im.convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def _titular_filo(
    c: Image.Image,
    texto: str,
    *,
    y: int,
    x: int | None = None,
    nivel: str = "display",
    color="blanco",
    filo_color="cobalto",
    filo_px: int | None = None,
    max_w: int | None = None,
    align: str = "left",
    anchor_bottom: bool = True,
) -> int:
    """Titular Niveau con FILO deadpan (keyline / contorno) — firma de la onda.

    El "filo" es un contorno fino alrededor del glifo: da carácter editorial sin
    el "texto gigante plano genérico". Por defecto contorno cobalto sobre relleno
    crema/blanco — el cobalto entra en la CAPA GRÁFICA, no en la foto.

    Devuelve la Y del borde inferior del bloque dibujado.
    """
    d = ImageDraw.Draw(c)
    W, _ = c.size
    spec = ESCALA_TIPO.get(nivel, ESCALA_TIPO["titular"])
    fnt = font_nivel(nivel, W)
    margen = escala(MARGEN, W)
    x = margen if x is None else x
    max_w = (W - 2 * margen) if max_w is None else max_w
    fill = _rgb(color)
    stroke = _rgb(filo_color)
    fpx = filo_px if filo_px is not None else max(2, round(fnt.size * 0.045))

    if spec.get("upper"):
        texto = texto.upper()

    lineas = _wrap(d, texto, fnt, max_w)
    asc, desc = fnt.getmetrics()
    line_h = round((asc + desc) * spec["leading"])
    total_h = line_h * len(lineas)
    y0 = (y - total_h) if anchor_bottom else y

    cy = y0
    for linea in lineas:
        lw = d.textlength(linea, font=fnt)
        lx = x + (max_w - lw) / 2 if align == "center" else x
        d.text((lx, cy), linea, font=fnt, fill=fill,
                stroke_width=fpx, stroke_fill=stroke)
        cy += line_h
    return cy


def _sello_capsula(
    c: Image.Image,
    *,
    texto: str = "con olorcito a domingo",
    escala_w: float = 0.46,
    pos: str | tuple = "bc",
    fill="cobalto",
    text_color="crema",
    margen: int | None = None,
) -> Image.Image:
    """Sello "con olorcito a domingo" como CÁPSULA DIRECTA dibujada en código.

    Faithful a la onda: cobalto sólido + texto Niveau, SIN recuadro/box blanco
    atrás (el asset del Drive trae un stroke blanco; acá lo dibujamos limpio).
    Es una pastilla redondeada con padding, pegada como toque de marca.
    """
    c = c if c.mode == "RGBA" else c.convert("RGBA")
    W, _ = c.size
    target_w = round(W * escala_w)

    # Tipo del sello: Niveau Bold, en mayúsculas con tracking (lockup-style)
    txt = texto.upper()
    f_size = max(14, round(W * 0.028))
    fnt = font("bold", f_size)
    tmp = Image.new("RGBA", (10, 10))
    td = ImageDraw.Draw(tmp)
    tracking = round(f_size * 0.06)
    text_w = sum(td.textlength(ch, font=fnt) + tracking for ch in txt) - tracking
    asc, desc = fnt.getmetrics()
    text_h = asc + desc

    pad_x = round(f_size * 1.15)
    pad_y = round(f_size * 0.62)
    cap_w = round(text_w) + 2 * pad_x
    cap_h = text_h + 2 * pad_y
    radius = cap_h // 2

    cap = Image.new("RGBA", (cap_w, cap_h), (0, 0, 0, 0))
    cd = ImageDraw.Draw(cap)
    cd.rounded_rectangle([0, 0, cap_w - 1, cap_h - 1], radius=radius, fill=_rgb(fill))
    # texto con tracking, centrado
    cx = pad_x
    cy = (cap_h - text_h) // 2
    tcol = _rgb(text_color)
    for ch in txt:
        cd.text((cx, cy), ch, font=fnt, fill=tcol)
        cx += cd.textlength(ch, font=fnt) + tracking

    # escalar al ancho objetivo manteniendo proporción
    if cap_w != target_w:
        f = target_w / cap_w
        cap = cap.resize((target_w, max(1, round(cap_h * f))), Image.LANCZOS)

    m = escala(MARGEN, W) if margen is None else margen
    px, py = _pos(c, cap, pos, m)
    c.alpha_composite(cap, (int(px), int(py)))
    return c


def _scrim_arriba(im: Image.Image, frac: float = 0.30, strength: int = 150) -> Image.Image:
    """Scrim de arriba hacia abajo (para toque de marca en la zona superior)."""
    im_rgba = im if im.mode == "RGBA" else im.convert("RGBA")
    w, h = im_rgba.size
    band = max(1, round(h * frac))
    grad = Image.new("L", (1, band), 0)
    px = grad.load()
    for y in range(band):
        px[0, y] = int(strength * (1 - y / max(1, band - 1)))
    grad = grad.resize((w, band))
    mask = Image.new("L", (w, h), 0)
    mask.paste(grad, (0, 0))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    overlay.putalpha(mask)
    im_rgba.alpha_composite(overlay)
    return im_rgba


def _abrir_foto(foto: str | Path | Image.Image) -> Image.Image:
    """Acepta ruta o Image; devuelve RGBA a color (NUNCA duotono)."""
    if isinstance(foto, Image.Image):
        return foto.convert("RGBA")
    return Image.open(foto).convert("RGBA")


# ---------------------------------------------------------------------------
# FORMATO 1 — LIFESTYLE (vida/mano/café; marca como toque, sello directo)
# ---------------------------------------------------------------------------
def pieza_lifestyle(
    foto: str | Path | Image.Image,
    titular: str,
    *,
    sello: bool = True,
    ratio: str = "4:5",
    icono_nombre: str | None = "croissant",
    mono: bool = True,
) -> Image.Image:
    """Registro LIFESTYLE: foto a color full-bleed (producto en uso/mesa) + toque de marca.

    - Foto full-bleed a color (cover) = héroe.
    - Scrim suave abajo donde va el texto (no tapa el producto).
    - Titular Niveau con FILO deadpan, anclado abajo.
    - Sello "con olorcito a domingo" (cápsula directa) si sello=True.
    - Monograma D crema arriba-derecha + un ícono cobalto-crema arriba-izquierda (toque).
    """
    W, H = _dims(ratio)
    c = cover(_abrir_foto(foto), W, H)

    # scrim solo abajo (texto) + un toque arriba para el monograma/ícono
    scrim_abajo(c, frac=0.46 if ratio in ("9:16", "story", "reel") else 0.40, strength=175)
    _scrim_arriba(c, frac=0.22, strength=120)

    margen = escala(MARGEN, W)
    safe_bottom = bk.SAFE_STORY if ratio in ("9:16", "story", "reel") else 0

    # toque de marca arriba: ícono line-art (crema) izq + monograma D crema der
    if icono_nombre:
        ic = icono(icono_nombre, color="crema", caja=escala(96, W))
        c.alpha_composite(ic, (margen, margen + (safe_bottom // 2 if safe_bottom else 0)))
    if mono:
        mono_im = monograma(color="crema", caja=escala(110, W))
        c.alpha_composite(mono_im, (W - mono_im.size[0] - margen,
                                    margen + (safe_bottom // 2 if safe_bottom else 0)))

    # zona de texto abajo: sello pegado al piso (sobre la safe area), titular arriba de él
    sello_w = 0.50 if ratio == "4:5" else 0.60
    sello_alto_est = escala(76, W)  # alto aproximado de la cápsula a ese ancho
    y_piso = H - safe_bottom - margen
    if sello:
        _sello_capsula(c, escala_w=sello_w,
                       pos=(margen, y_piso - sello_alto_est),
                       fill="cobalto", text_color="crema")
        y_titular = y_piso - sello_alto_est - escala(28, W)
    else:
        y_titular = y_piso

    _titular_filo(c, titular, y=y_titular, nivel="display",
                  color="crema", filo_color="cobalto", align="left",
                  anchor_bottom=True)
    return c


# ---------------------------------------------------------------------------
# FORMATO 2 — SOLO PRODUCTO (macro del antojo; toque mínimo)
# ---------------------------------------------------------------------------
def pieza_solo_producto(
    foto: str | Path | Image.Image,
    titular: str,
    *,
    ratio: str = "4:5",
    mono: bool = True,
) -> Image.Image:
    """Registro SOLO-PRODUCTO: macro a color full-bleed (el antojo puro), toque mínimo.

    El producto manda. Identidad casi invisible: titular Niveau con filo abajo +
    monograma D crema chico arriba-derecha. Sin sello (no compite con el macro)
    salvo que se quiera; sin ícono (la textura del producto es el protagonista).
    """
    W, H = _dims(ratio)
    c = cover(_abrir_foto(foto), W, H)

    # scrim mínimo: solo una franja angosta abajo para el titular
    scrim_abajo(c, frac=0.30, strength=160)

    margen = escala(MARGEN, W)
    safe_bottom = bk.SAFE_STORY if ratio in ("9:16", "story", "reel") else 0

    if mono:
        mono_im = monograma(color="crema", caja=escala(96, W))
        _scrim_arriba(c, frac=0.16, strength=90)
        c.alpha_composite(mono_im, (W - mono_im.size[0] - margen,
                                    margen + (safe_bottom // 2 if safe_bottom else 0)))

    y_titular = H - margen - safe_bottom
    _titular_filo(c, titular, y=y_titular, nivel="titular",
                  color="crema", filo_color="cobalto", align="left",
                  anchor_bottom=True)
    return c


# ---------------------------------------------------------------------------
# FORMATO 3 — PLACA (sin foto: capa gráfica pura)
# ---------------------------------------------------------------------------
def placa(
    titular: str,
    *,
    bajada: str | None = None,
    ratio: str = "4:5",
    fondo="crema",
    color_titular="cobalto",
    filo: bool = False,
    icono_nombre: str | None = "sun",
    sello: bool = True,
    mono: bool = True,
) -> Image.Image:
    """Registro PLACA: sin foto. Fondo crema (o cobalto) + texto + monograma + sello.

    La capa gráfica pura de la marca. Por defecto crema con titular cobalto,
    ícono line-art cobalto arriba, monograma D y sello directo.
    """
    W, H = _dims(ratio)
    fcol = _rgb(fondo)
    c = Image.new("RGBA", (W, H), (fcol[0], fcol[1], fcol[2], 255))

    margen = escala(MARGEN, W)
    safe = bk.SAFE_STORY if ratio in ("9:16", "story", "reel") else margen

    # color de los toques según el fondo (contraste)
    sobre_oscuro = fondo in ("cobalto", "negro", "cobalto_oscuro")
    toque_color = "crema" if sobre_oscuro else "cobalto"

    # ícono arriba (centrado)
    y = safe
    if icono_nombre:
        ic = icono(icono_nombre, color=toque_color, caja=escala(150, W))
        c.alpha_composite(ic, ((W - ic.size[0]) // 2, y))
        y += ic.size[1] + escala(48, W)

    # titular centrado vertical en el bloque medio
    d = ImageDraw.Draw(c)
    fnt = font_nivel("display", W)
    lineas = _wrap(d, titular.upper(), fnt, W - 2 * margen)
    asc, desc = fnt.getmetrics()
    line_h = round((asc + desc) * ESCALA_TIPO["display"]["leading"])
    block_h = line_h * len(lineas)
    cy = (H - block_h) // 2

    if filo:
        _titular_filo(c, titular, y=cy, nivel="display",
                      color=fondo if not sobre_oscuro else "crema",
                      filo_color=color_titular, align="center", anchor_bottom=False)
        cy_end = cy + block_h
    else:
        tcol = _rgb(color_titular)
        for linea in lineas:
            lw = d.textlength(linea, font=fnt)
            d.text(((W - lw) / 2, cy), linea, font=fnt, fill=tcol)
            cy += line_h
        cy_end = cy

    # bajada opcional (subtitulo)
    if bajada:
        fnt_b = font_nivel("subtitulo", W)
        lineas_b = _wrap(d, bajada, fnt_b, W - 2 * margen)
        bc = _rgb(toque_color)
        ab, db = fnt_b.getmetrics()
        lh_b = round((ab + db) * ESCALA_TIPO["subtitulo"]["leading"])
        yb = cy_end + escala(24, W)
        for linea in lineas_b:
            lw = d.textlength(linea, font=fnt_b)
            d.text(((W - lw) / 2, yb), linea, font=fnt_b, fill=bc)
            yb += lh_b

    # monograma chico arriba-derecha (toque)
    if mono:
        mono_im = monograma(color=toque_color, caja=escala(90, W))
        c.alpha_composite(mono_im, (W - mono_im.size[0] - margen, safe // 2 if safe > margen else margen))

    # sello abajo, directo
    if sello:
        sello_fill = "crema" if sobre_oscuro else "cobalto"
        sello_text = "cobalto" if sobre_oscuro else "crema"
        _sello_capsula(c, escala_w=0.52, pos=(("bc")),
                       fill=sello_fill, text_color=sello_text,
                       margen=safe if ratio in ("9:16", "story", "reel") else margen)
    return c


# ---------------------------------------------------------------------------
# Registro de plantillas (nombre -> función)
# ---------------------------------------------------------------------------
PLANTILLAS: dict[str, Callable[..., Image.Image]] = {
    "lifestyle": pieza_lifestyle,
    "solo_producto": pieza_solo_producto,
    "placa": placa,
}


def render(nombre: str, *args, **kwargs) -> Image.Image:
    """Render por nombre de registro: render('lifestyle', foto, titular)."""
    if nombre not in PLANTILLAS:
        raise ValueError(f"Plantilla desconocida: {nombre!r}. Opciones: {sorted(PLANTILLAS)}")
    return PLANTILLAS[nombre](*args, **kwargs)


# ---------------------------------------------------------------------------
# Test real
# ---------------------------------------------------------------------------
def _guardar(im: Image.Image, ruta: str) -> str:
    im.convert("RGB").save(ruta, "PNG")
    return ruta


def _test() -> list[str]:
    """Corre las funciones con fotos reales y genera PNGs en /tmp."""
    salidas: list[str] = []

    cinna = "/Users/luciano/Downloads/dimanche-slides/cinna-escena.png"
    sesion = bk.fotos_sesion_principal()
    foto_real = str(sesion[0]) if sesion else cinna

    # 1. lifestyle 4:5 con cinna
    salidas.append(_guardar(
        pieza_lifestyle(cinna, "no es de ayer"),
        "/tmp/test_plantilla_lifestyle_45.png"))
    # 2. lifestyle 9:16 con foto real
    salidas.append(_guardar(
        pieza_lifestyle(foto_real, "domingo todos los días", ratio="9:16"),
        "/tmp/test_plantilla_lifestyle_916.png"))
    # 3. solo-producto 4:5 con cinna
    salidas.append(_guardar(
        pieza_solo_producto(cinna, "medialuna de manteca"),
        "/tmp/test_plantilla_solo_producto_45.png"))
    # 4. solo-producto 9:16 con foto real
    salidas.append(_guardar(
        pieza_solo_producto(foto_real, "recién salido", ratio="9:16"),
        "/tmp/test_plantilla_solo_producto_916.png"))
    # 5. placa 4:5 crema
    salidas.append(_guardar(
        placa("abrimos\ntodos los\ndomingos", bajada="Villa Allende · Gauss · Boulevares"),
        "/tmp/test_plantilla_placa_45.png"))
    # 6. placa 9:16 cobalto con filo
    salidas.append(_guardar(
        placa("con olorcito\na domingo", ratio="9:16", fondo="cobalto",
              color_titular="crema", filo=False, icono_nombre="croissant"),
        "/tmp/test_plantilla_placa_916.png"))
    return salidas


if __name__ == "__main__":
    print("[*] Generando piezas de prueba con fotos reales...")
    for ruta in _test():
        print(f"[ok] {ruta}")
    print("[done]")
