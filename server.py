"""
Servicio HTTP del Radar (Scrapling) para Railway.
n8n lo consume por HTTP: dispara un agente, este servicio scrapea y devuelve JSON.

Endpoints:
  GET /health                      -> {"ok": true}
  GET /ig/{username}               -> perfil de Instagram (seguidores/posts/bio)
  GET /gmaps?url=<maps_url>         -> rating de un lugar de Google Maps

Deploy: Railway con el Dockerfile del repo. Local: uvicorn server:app --reload
"""
from __future__ import annotations

import os
import sys

from fastapi import FastAPI

# radar_scrape.py vive en scripts/
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "scripts"))
from radar_scrape import ig_profile, gmaps_rating, web_text  # noqa: E402

app = FastAPI(title="Dimanche Radar — Scrapling service", version="0.1.0")


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "dimanche-radar-scrapling"}


@app.get("/ig/{username}")
def ig(username: str) -> dict:
    """Resumen del perfil público de Instagram."""
    return ig_profile(username)


@app.get("/gmaps")
def gmaps(url: str) -> dict:
    """Rating de un lugar de Google Maps (pasar la URL del place/search)."""
    return gmaps_rating(url)


@app.get("/web")
def web(url: str, max_chars: int = 12000) -> dict:
    """Lector universal: texto limpio de cualquier pagina, sorteando anti-bot.

    Para el Radar: /web?url=https://liahaberman.substack.com/feed (ICYMI),
    InfoNegocios, Punto a Punto, Taste Tomorrow, etc.
    """
    return web_text(url, max_chars)
