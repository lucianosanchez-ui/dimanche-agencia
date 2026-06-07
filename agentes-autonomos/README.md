# Agentes autónomos — diseño e implementación (n8n)

Los agentes que **corren solos y reportan**. Cada uno escribe en la base Notion **Inteligencia & Ideas** (y el Briefing también propone en **Objetivos & Campañas**). Siguen el patrón probado del proyecto `radar-dimanche`.

## Patrón común (4 nodos)

> ⚠️ **NOTA (2026-06-05):** lo realmente construido en n8n NO usa HTTP a Anthropic ni caché. Usa el nodo nativo `lmChatAnthropic` (que **no** soporta `cache_control`) con un prompt de rol corto — el brand book **no** viaja embebido. La caché y el "brand kit cacheado" descritos abajo son **diseño aspiracional, no real**. Para tener caché habría que migrar a un nodo HTTP→`/v1/messages`. Ver memoria `n8n-caching-brand-book-no-reales`.

```
[Schedule Trigger]  →  [Gather]  →  [Analizar con Claude]  →  [Escribir en Notion]
   cron semanal/        Apify /       HTTP → Anthropic API       Notion node (create
   mensual              HTTP /        (system = brand kit         page en la DB
                        Notion        cacheado + PROMPT.md)       Inteligencia & Ideas)
```

1. **Schedule Trigger** — cron. Tendencias/Performance: semanal. Competencia: quincenal. Briefing: lunes + día 1 del mes.
2. **Gather** — junta el input:
   - Tendencias/Competencia → **Apify** (scrapers de Instagram/TikTok por hashtag o cuenta).
   - Performance → CSV de Metricool/Meta (Fase 1) o Meta Graph API (Fase 2).
   - Briefing → lee de Notion las DBs (Inteligencia & Ideas, Objetivos & Campañas, Calendario).
3. **Analizar con Claude** — HTTP Request a la API de Anthropic. **System prompt** = contenido de `brand/00-brand-book.md` + `brand/10-contexto-negocio.md` (cacheado con `cache_control`) + el `PROMPT.md` del agente. **User** = el input juntado. Pedí salida JSON con los campos de la DB.
4. **Escribir en Notion** — nodo Notion "Create Database Page" en la base correspondiente.

## IDs de las bases (Notion)

| Base | Data source (collection) | Página |
|---|---|---|
| Inteligencia & Ideas | `2a3d57ca-7585-4e85-ab2e-eb0f4225790f` | f8f5e2fb4359435e922c1f8d401625fe |
| Objetivos & Campañas | `9603f67e-0647-49d3-85e9-eda7454cf6d5` | 19d1c9a7cc15451ea3ed4e3943689ee1 |
| Calendario de contenido | `3d326521-b346-46ab-9bfd-141475b44fd5` | e8e77d3788414db6811a9c77e463bff1 |
| Activos a producir | `b032f2bc-0864-4d55-837b-81b8bb10eea4` | 4716cbfe3f814f1daec2e45a37847508 |
| 📚 Documentos (fuente marca) | `d508a305-c1d5-4c27-901c-38903c2e8ff8` | dfa48c46-1027-4b84-84aa-72f86dc4892c |

Campos a escribir en **Inteligencia & Ideas**: `Título`, `Tipo` (Tendencia/Competencia/Performance/Idea), `Oportunidad`, `Acción sugerida`, `Pilar`, `Prioridad`, `Buyer persona`, `Fuente`, `Estado`=Nuevo, `Fecha`.

## Credenciales a cargar en n8n
- **Anthropic API key** (`sk-ant-...`) — para el nodo de análisis.
- **Apify token** (`apify_api_...`) — para los scrapers.
- **Notion integration token** (`ntn_...`) — la misma integración del radar, ya conectada al teamspace. **Importante:** compartir las 4 DBs nuevas con esa integración (menú `...` → Connections) para que pueda escribir.

## Construcción (3 opciones)
1. **n8n local (elegido para prototipar):** instalá n8n (`npx n8n` o Docker), armá el workflow visualmente siguiendo el patrón de arriba y pegá el `PROMPT.md` en el nodo de Claude. Empezá por **Tendencias** (el más representativo).
2. **Con el MCP de n8n:** se puede generar el workflow programáticamente (pedímelo cuando tengas la instancia que vas a usar y lo construyo).
3. **Patrón Python (radar) para always-on:** si un agente tiene que correr 24/7 sí o sí, conviene clonar el enfoque de `radar-dimanche` (script + GitHub Actions) en vez de depender de la Mac prendida.

## Nota de hosting
n8n local **no corre con la Mac apagada**. Para prototipar está perfecto; cuando un agente esté validado y deba ser always-on, migralo a n8n Cloud / VPS, o reimplementalo en el patrón radar (GitHub Actions).

## Prompts
- `briefing/PROMPT.md` — Estratega (propone foco + campañas).
- `tendencias/PROMPT.md` — a qué subirse.
- `competencia/PROMPT.md` — La Celeste y otras; huecos.
- `performance/PROMPT.md` — números vs KPIs POL-016.
