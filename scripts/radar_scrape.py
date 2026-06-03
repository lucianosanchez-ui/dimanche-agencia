#!/usr/bin/env python3
"""
radar_scrape.py — Extractor del Radar (motor: Scrapling, sin Apify).

Releva señales públicas para el diagnóstico y los agentes Radar:
- Perfil de Instagram (seguidores / siguiendo / posts) — fetch estático.
- Rating de Google Maps de un lugar — navegador headless (DynamicFetcher).

Reutilizable por los agentes Tendencias/Competencia/Performance: corré esto
periódicamente para medir evolución vs los KPIs (POL-016).

Uso:
    uv run --python 3.12 python scripts/radar_scrape.py
    # requiere: uv pip install "scrapling[fetchers]" && scrapling install

Notas:
- Instagram sin login expone el resumen del perfil (no el engagement por post;
  para eso hace falta sesión o un actor dedicado).
- Google Maps: el rating sale del header del place. El nº de reseñas y el texto
  requieren abrir el panel de reseñas y scrollear (TODO: page_action).
"""
from __future__ import annotations

import json
import re
import sys

from scrapling.fetchers import Fetcher, DynamicFetcher, StealthyFetcher

# --- Cuentas / lugares Dimanche -------------------------------------------
IG_DIMANCHE = "dimanchepanaderia"
GMAPS_LOCALES = {
    "Boulevares": "https://www.google.com/maps/search/Dimanche+panaderia+Bv+los+Alemanes+4848+Cordoba/?hl=es-AR",
    "Gauss": "https://www.google.com/maps/search/Dimanche+panaderia+Av+Carlos+Gauss+5331+Cordoba/?hl=es-AR",
    "Villa Allende": "https://www.google.com/maps/search/Dimanche+panaderia+Rio+de+Janeiro+137+Villa+Allende+Cordoba/?hl=es-AR",
}


def ig_profile(username: str) -> dict:
    """Resumen de un perfil público de Instagram (seguidores/siguiendo/posts)."""
    url = f"https://www.instagram.com/{username}/"
    out = {"username": username, "url": url}
    try:
        p = Fetcher.get(url, timeout=30)
        html = p.html_content or ""
        m = re.search(
            r'([\d.,]+)\s*Followers,\s*([\d.,]+)\s*Following,\s*([\d.,]+)\s*Posts',
            html,
        )
        if m:
            out["followers"] = m.group(1)
            out["following"] = m.group(2)
            out["posts"] = m.group(3)
        bio = re.search(r'<meta name="description" content="([^"]*)"', html)
        out["bio_meta"] = bio.group(1) if bio else None
    except Exception as e:  # noqa: BLE001
        out["error"] = repr(e)
    return out


def gmaps_rating(url: str) -> dict:
    """Rating de un lugar de Google Maps (navegador headless)."""
    out = {"url": url}
    try:
        p = DynamicFetcher.fetch(url, headless=True, network_idle=True, timeout=70000)
        html = p.html_content or ""
        m = re.search(r'(\d[.,]\d)\s*estrellas', html)
        out["rating"] = m.group(1).replace(",", ".") if m else None
        c = re.search(r'([\d][\d.\,]*)\s*rese[nñ]as', html)
        out["reviews"] = c.group(1) if c else None
    except Exception as e:  # noqa: BLE001
        out["error"] = repr(e)
    return out


def web_text(url: str, max_chars: int = 12000) -> dict:
    """Texto limpio de cualquier pagina, sorteando anti-bot (Cloudflare).

    Lector universal del Radar: lo usan los agentes (Tendencias, Observatorio,
    Tendencias-globales) para leer fuentes editoriales (ICYMI, InfoNegocios,
    Punto a Punto, Taste Tomorrow) sin pelear con cada muro.
    """
    out = {"url": url}
    try:
        page = StealthyFetcher.fetch(
            url,
            headless=True,
            solve_cloudflare=True,
            network_idle=True,
            timeout=90000,
        )
        text = page.get_all_text() or ""
        out["text"] = " ".join(text.split())[:max_chars]
        out["chars"] = len(out["text"])
    except Exception as e:  # noqa: BLE001
        out["error"] = repr(e)
    return out


def run() -> dict:
    report = {"instagram": ig_profile(IG_DIMANCHE), "google_maps": {}}
    for name, url in GMAPS_LOCALES.items():
        report["google_maps"][name] = gmaps_rating(url)
    return report


if __name__ == "__main__":
    print(json.dumps(run(), ensure_ascii=False, indent=2))
    sys.exit(0)
