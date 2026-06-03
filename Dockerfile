# Servicio Scrapling del Radar para Railway.
# Base con navegadores ya instalados (Playwright) para que Scrapling pueda scrapear IG/TikTok/Maps.
FROM mcr.microsoft.com/playwright/python:v1.59.0-jammy

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Navegadores de Scrapling (camoufox/stealth). Si falla, DynamicFetcher usa el Chromium de la imagen base.
RUN python -m scrapling install || true

COPY . .

ENV PORT=8000
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}"]
