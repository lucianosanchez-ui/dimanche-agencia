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
- **Regla visual de oro (act. 2026-06-05):** la IA SIEMPRE parte de algo REAL — nunca inventa de cero. Para cualquier pieza con producto/local/identificable, tomá de BASE una referencia real: foto nuestra (Drive) o una **foto rápida del celu** que saque el equipo. La IA mejora/ambienta/extiende sobre esa base (estilo, fondo, luz, composición, movimiento); NO fabrica un producto que no existe. Logo y texto a mano. Sin emojis, sin naranja.
- **Tono POL-010 + mensajes maestros REF-029.** Sin marketinería, sin emojis. Objetivo de fondo: posicionar la marca.
- **Secretos:** nunca en el repo. Tokens/API keys van en n8n o en `.env` (gitignored).

## Skills propias (en `.claude/skills/`)
Orquestador `dimanche-mkt` (puerta única) + brand-check, copy, media, calendario, guion, campana, formatos, local.

## Cómo se usa — CARRILES (act. 2026-06-17; no confundir)
- **Luti (bot de Telegram) = asistente y DIRECTOR del día.** Anto/Luciano le hablan por el grupo "Agencia Mkt". Hace: copys/ideas/hooks a mano alzada, responde sobre marca (lee Notion), tendencias (lo que carga Lola), **aprobar/archivar ideas (gate)**, **agregar al calendario**, leer links, transcribir audios, analizar fotos, y **DIRIGIR la producción visual** (refina el brief, elige la foto base real del Drive y escribe el prompt on-brand listo para el bot de Higgsfield). **NO** hace: brand-check formal, calendario del mes, campañas estructuradas + bajada, **generar él mismo las imágenes/video** (eso lo ejecuta el bot de Higgsfield con el prompt de Luti), guion largo.
- **Bot de Higgsfield (nativo, en el mismo grupo) = el MOTOR visual.** Conectado a Drive + Notion; genera imagen/video con sus agentes/elements nativos (sin MCP). Recibe el prompt + la foto base que arma Luti. **Los bots no se hablan entre sí en Telegram: el puente lo hacen Anto/Luciano** (Luti escribe, ellos pegan). Lo que salga vuelve al gate → Propuesto.
- **Claude Code (skills, orquestadas por `dimanche-mkt`) = taller de producción PESADA/FINA.** Acá se hace: campañas (`campana`→`local`), calendario del mes (`calendario`), piezas por código (placas con texto exacto, TV, video data-driven; `media`), guiones (`guion`), brand-check formal (`brand-check`). Todo nace **Propuesto** (gate humano).
- **Regla simple:** ajuste rápido → Luti. Producir una campaña/pieza en serio → Claude Code.
- **Flujo de campaña (ej. Día del Padre / Mundial):** `dimanche-mkt` → `dimanche-campana` (objetivo + piezas) → `dimanche-calendario` (grilla) → `dimanche-media` (visuales sobre foto real) → `dimanche-local` (cartelería + comunicado) → `dimanche-brand-check` (valida) → **Propuesto** en Notion → aprueban → ejecuta.
- **Proceso de producción de una pieza (paso a paso, para NO trabarse): `docs/proceso-contenido.md`.** El método visual ya está definido en las skills — seguirlo, no reinventarlo.
- **Producción visual — DOS VÍAS (act. 2026-06-17):** rápida/conversacional = **Telegram** (Luti dirige el prompt → el bot de Higgsfield ejecuta sobre foto real → gate); fina/por código (placas con texto, TV, video data-driven) = **Claude Code**. Lo que se descartó el 08/06 fue el **bot-productor PROPIO (fal.ai): motor flojo + a ciegas** — NO "producir por Telegram" como canal. El nativo de Higgsfield trae el motor bueno; la dirección la pone Luti. Ver memoria `luti-director-higgsfield-telegram`.

## Interfaz y motor
Bot de Telegram (n8n + Claude + memoria Notion) · agentes autónomos en n8n Cloud + Scrapling en Railway. Ver `docs/infraestructura.md`.
