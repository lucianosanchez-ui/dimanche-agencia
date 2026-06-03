# CLAUDE.md — Agencia de Marketing Dimanche

Este repo es el sistema de la **agencia de marketing semiautomática de Dimanche Panificados**.

## Al empezar, leé:
1. **`ESTADO.md`** — dónde quedamos y los próximos pasos (lo más importante para retomar).
2. **`brand/00-brand-book.md`** y **`brand/10-contexto-negocio.md`** — la marca y el negocio.
3. **`ROLES.md`** — el organigrama de la agencia (qué hace cada agente/skill).

## Reglas que no se rompen
- **Fuente de verdad: Notion.** La marca ya está cerrada ahí (no la redefinas).
- **Sistema documental:** usar la skill **notion-dimanche** para crear/editar docs en Notion (códigos, Borrador + aprobación de Luciano).
- **Gate humano:** nada que se publique sale sin aprobación de Luciano/Anto. Todo nace "Propuesto".
- **Regla visual de oro:** nada identificable de Dimanche (local, productos, equipo) se genera con IA. Foto real de Drive o pedida a Luciano. IA solo para genérico/mood.
- **Tono POL-010 + mensajes maestros REF-029.** Sin marketinería, sin emojis. Objetivo de fondo: posicionar la marca.
- **Secretos:** nunca en el repo. Tokens/API keys van en n8n o en `.env` (gitignored).

## Skills propias (en `.claude/skills/`)
Orquestador `dimanche-mkt` (puerta única) + brand-check, copy, media, calendario, guion, campana, formatos, local.

## Interfaz y motor
Bot de Telegram (n8n + Claude + memoria Notion) · agentes autónomos en n8n Cloud + Scrapling en Railway. Ver `docs/infraestructura.md`.
