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

from scrapling.fetchers import Fetcher, DynamicFetcher

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


def run() -> dict:
    report = {"instagram": ig_profile(IG_DIMANCHE), "google_maps": {}}
    for name, url in GMAPS_LOCALES.items():
        report["google_maps"][name] = gmaps_rating(url)
    return report


if __name__ == "__main__":
    print(json.dumps(run(), ensure_ascii=False, indent=2))
    sys.exit(0)
