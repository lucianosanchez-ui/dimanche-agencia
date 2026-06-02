# Stack de herramientas de la agencia

## Qué usamos y para qué
| Herramienta | Rol | Estado |
|---|---|---|
| **Claude** (Teams para Anto · Code para Luciano) | Cerebro + interfaz conversacional (el orquestador y las skills); produce copy/guion/estrategia; lee Notion por MCP | Pago ✓ |
| **Notion** | Fuente de verdad + memoria + mesa de trabajo + gate de aprobación | Pago ✓ |
| **Higgsfield** | Imagen/video con IA, `virality_predictor`, `reframe` a 9:16/1:1 | Pago ✓ (907 créditos) |
| **Gemini** | Imagen (Nano Banana/Imagen) y video (Veo); variantes; complemento de Higgsfield | Pago ✓ |
| **Scrapling** | Scraping del Radar (IG, TikTok, web), libre, corre en tu infra | Instalado ✓ |
| **Canva** | Layout final con brand kit (Niveau Grotesk, paleta) | — |
| **NotebookLM** | Q&A de la base para el equipo (read-only) — ahorro de tokens del lado humano | A crear |
| **GitHub** | Backup y versionado (repo privado `dimanche-agencia` + `radar-dimanche`) | ✓ |
| **Apify** | Fallback de scraping cuando Scrapling no alcance | Disponible (con tope mensual) |

## ¿ChatGPT?
**No es necesario.** Claude (texto/estrategia) + Gemini (imagen/video) + Higgsfield ya cubren todo. Si lo tenés, sirve como segunda opinión puntual, pero el sistema **no depende de él**. No lo conectamos.

## Qué conectar (orden)
1. **Notion**: la integración del radar conectada a las 4 DBs nuevas (para que los agentes escriban).
2. **Claude**: proyecto Teams (Anto) + Claude Code (Luciano) apuntando al repo `dimanche-agencia` (toma las skills).
3. **Higgsfield**: ya por MCP.
4. **Gemini**: API key cuando se use para imagen/video.
5. **GitHub Actions**: para correr los agentes autónomos 24/7 (patrón radar).

## Tokens y NotebookLM (la pregunta de Luciano)
El ahorro de tokens viene de dos lados distintos:
- **Para los AGENTES** (Claude): de **prompt caching** del brand kit (como hace el radar) + brand kit conciso + que cada skill cargue solo lo que necesita. NotebookLM **no** ayuda acá (no tiene API para que los agentes lo consulten).
- **Para el EQUIPO** (Anto/Luciano): **NotebookLM sí ahorra** — preguntás a la base ahí ("¿cuál es el tono?", "¿qué dijimos de X?") en vez de gastar tokens de Claude. Es Q&A read-only, alimentado por export (`scripts/export_brand.py`).

**Regla:** la fuente de verdad operativa es **Notion** (los agentes leen/escriben ahí). NotebookLM es una **copia para consultar**, no el almacén.

## Motor de los agentes autónomos
Patrón `radar-dimanche` (Python + GitHub Actions + Scrapling) — probado, gratis, 24/7. n8n queda opcional para prototipar visual. Make, descartado.
