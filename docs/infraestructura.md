# Infraestructura de la agencia (no GitHub Actions)

## Decisión (Luciano)
GitHub Actions no. Queremos algo **managed y pago que funcione siempre 24/7**, sin mantener servidores ni que dependa de que la Mac esté prendida.

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

## Lo único manual (Luciano)
- Crear cuenta + plan en **n8n Cloud** y **Railway** (son pagos, necesitan tu tarjeta/login).
- Pegar las **API keys** (Anthropic, Notion, Apify) en n8n.
- **Todo lo demás lo armo yo:** los workflows de n8n, el servicio Scrapling en Railway, las conexiones y las notificaciones a Anto.
