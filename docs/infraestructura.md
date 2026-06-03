# Infraestructura de la agencia (no GitHub Actions)

## Decisión (Luciano)
GitHub Actions no. Algo **managed y pago que funcione siempre 24/7**, sin mantener servidores ni depender de que la Mac esté prendida.

**ELEGIDO (2026-06-02): n8n Cloud (orquestador) + Railway corriendo Scrapling (scraping).** Luciano crea/paga las cuentas; Claude arma y mantiene todo lo técnico.

### Plan de deploy (lo hace Claude apenas existan las cuentas)
- El servicio Scrapling ya está pre-armado en el repo: `server.py` (API HTTP), `requirements.txt`, `Dockerfile`. n8n le pega por HTTP (`/ig/{usuario}`, `/gmaps?url=...`) y recibe JSON.
- En Railway: conectar el repo `dimanche-agencia`, deploy con el Dockerfile. Variables: `NOTION_TOKEN` si hace falta.
- En n8n Cloud: importar los workflows de cada agente (Schedule → HTTP al servicio Railway → Claude API → escribir Notion → avisar a Anto).

## Recomendación
| Pieza | Herramienta | Costo aprox | Para qué |
|---|---|---|---|
| **Orquestador / scheduler** | **n8n Cloud** | ~USD 24/mo | Corre los agentes (cron), conecta Notion + Apify + Claude/Gemini, **notifica a Anto** (WhatsApp/email/Telegram). Managed y **visual** — vos y Anto lo ven. |
| **Runtime de scraping** | **Railway** | ~USD 5-10/mo | Servicio always-on con **Scrapling** (Python + browser) para IG/TikTok/web, que n8n no corre nativo. Acá se migra `radar-dimanche`. |

**Total ~USD 30-40/mo.** Siempre encendido, sin GitHub Actions.

## Cómo encaja
1. **n8n Cloud** dispara cada agente (Briefing, Tendencias, Competencia, Performance, Cazador de virales) en su horario.
2. Para scrapear, n8n llama al servicio **Scrapling en Railway** → datos.
3. n8n manda los datos + la base (cacheada) a **Claude (API)** → análisis.
4. n8n escribe el resultado en **Notion** (Inteligencia & Ideas) y **avisa a Anto** (canal a definir: WhatsApp/email).

## Alternativas (si querés más simple o más barato)
- **Solo n8n Cloud + Apify** (sin Railway): Apify hace el scraping (pago, con tope mensual). Menos control, una herramienta menos.
- **Modal** en vez de Railway: serverless Python, pagás por uso (bueno si los agentes corren pocas veces al día).

## Interfaz: grupo de Telegram con memoria (decisión 2026-06-02)
La agencia se opera desde un **grupo de Telegram**, NO desde chats aislados de Claude. Flujo: mensaje en el grupo → **n8n** → **Claude** (con la base de marca + el historial de la conversación guardado en **Notion**) → responde en el grupo. **La continuidad es real**: la memoria vive en Notion, no en el chat. Los agentes autónomos (Briefing, Cazador de virales, Performance) postean en ese mismo grupo. Es el "Hermes" pero sobre la infra que ya tenemos.

## Estado y lo que falta
- ✅ **n8n Cloud** creado · ✅ **Railway** creado y conectado a GitHub.
- **Falta (Luciano, mínimo):**
  1. Disparar el **deploy** del repo en Railway (New Project → GitHub → `dimanche-agencia`) y pasarme la URL.
  2. Darme una **API key de n8n Cloud** (Settings → n8n API) para armar los workflows.
  3. Crear el **bot de Telegram** con @BotFather (2 min) y pasarme el token.
  4. Tener a mano las API keys (Anthropic, Notion, Apify) que yo cargo en n8n.
- **Todo lo demás lo armo yo:** servicio Scrapling en Railway, los workflows de los agentes, el bot de Telegram con memoria, y el reporte a Anto.
