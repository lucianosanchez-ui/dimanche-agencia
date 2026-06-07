# ROADMAP — Agencia de Marketing Dimanche

> La foto grande: qué funciona y qué falta, en orden. El detalle técnico fino (workflow ids, números de prueba, fixes) vive en `ESTADO.md`.
> Última actualización: 2026-06-04.

## ✅ Lo que ya funciona (en vivo)

**El equipo — 6 agentes que investigan solos y dejan todo en la pizarra *Inteligencia & Ideas* (Notion):**
- **Lola** — radar de tendencias on-brand (con clima Córdoba + fuentes locales) · martes
- **Mateo** — observatorio + tendencias globales · miércoles
- **Numa** — performance de nuestro Instagram · lunes
- **Vera** — competencia (3 panaderías) · quincenal
- **Rocco** — cazador de virales (Google Trends + X/Twitter) · viernes
- **Cata** — coordinador: parte operativo del día · diario 8am

**Cómo te llega la información (3 canales, nada más):**
1. **Briefing (Amadeo)** — lunes 8am: el resumen de la semana, "a qué nos subimos".
2. **Parte de Cata** — diario 8am: qué sale hoy, qué espera tu OK, alertas de cadencia.
3. **Luti (el bot)** — cuando vos querés: le preguntás, o le pedís aprobar/archivar ideas.

> El resto de los agentes trabajan **callados**: no te escriben, solo llenan la pizarra. Vos no le seguís el rastro a ninguno.

**Herramientas listas (se usan cuando pidas contenido):**
- **Brand-check** — revisa cualquier pieza contra la marca (POL-010 / REF-029 / prohibidos / regla visual) y la reescribe si hace falta.
- **Bajada a canales** — convierte una campaña en piezas de mostrador + IG / Uber / PedidosYa.
- **Gate desde el chat** — aprobás / archivás / mandás a revisión ideas hablándole a Luti.
- **Base:** lector `/web` (sortea anti-bot) + Apify (datos sociales) + Notion como backend.

## 🔜 Lo que falta (en orden sugerido)

**1 · Cierres rápidos** — lo que quedó a medio enganchar
- ✅ Brand-check **dentro** de la bajada — hecho + probado (#79): la campaña del Día del Padre pasó por la bajada y el brand-check la validó sola (96/100, aprobado). La salida trae las piezas + el veredicto juntos.
- ✅ Gate *"→ calendario"* — hecho + probado (#82): le decís a Luti "agendá X para tal día" y crea la pieza en el Calendario (Estado **Propuesto**, respeta el gate). De paso le sumé conciencia de fecha al bot (ponía el año equivocado).
- ✅ **Vera** ahora rota los 6 competidores: 3 por corrida, alternando set A (La Celeste / Lo Más Rico / Perikos) y set B (Perdu / Armando / Lugones) cada quincena → cubre los 6 en un mes, sin pasarse del límite de Apify. Publicada.
- ⏸️ **TikTok en Rocco** — pendiente: el actor necesita proxy residencial **pago** de Apify. Decisión tuya (gasto extra); por ahora Rocco va con Google Trends + X.

**2 · Bot más vivo**
- Que entienda **fotos, audios y links** de IG/TikTok.
- Que **distinga quién le habla** (vos / Anto) y no salude cada vez.
- El **brand book completo** metido adentro del bot (hoy lleva un resumen).

**3 · Conectar Meta (Instagram Graph API)**
- Desbloquea: **métricas reales** de IG para Numa (alcance, guardados, impresiones) + a futuro **publicar directo a IG**.
- Necesita setup tuyo: cuenta IG **profesional** + **app de Meta** + token en n8n.
- No bloquea el contenido (se puede postear a mano); es para **medir** y **automatizar**.

**4 · Contenido — cuando des la luz verde**
- **Fotos on-brand**: mood con IA (Higgsfield) + foto real de Drive. Regla visual de oro.
- **Los copys**: que el sistema escriba las piezas reales (pasando por brand-check + bajada).
- ⭐ **Agente de contenido (PRIORITARIO para Luciano) — sesión dedicada aparte.** Es la cara pública: cómo se ve el laburo ante clientes potenciales, "bien picante". Requiere: **expertos por formato** (TV/IG/story de WhatsApp/folleto/reel — cada uno con su playbook, ya existe el de TV), **referencias de marca** (Levain, Donutelier… en `dimanche-media/references/marcas-referencia.md`), **archivos nuestros** (Drive), **do's/don'ts** por formato. Se arma cuando la infra esté lista (crédito ✅ · audio · Meta). Ver memoria `agente-contenido-frente` + skill `dimanche-media`.

**5 · Afinado**
- Clima sumado al briefing · modelos / costos (lo mecánico a un modelo más barato) · housekeeping (timeouts, ordenar Notion, velocidad del bot).

## 🎨 Capa creativa / producción (stack disponible)

Herramientas conectadas y su rol. Todo pasa por **brand-check + gate** y respeta la **regla visual de oro** (nada identificable de Dimanche con IA → foto/video real).

| Herramienta | Estado (05/06) | Rol en Dimanche |
|---|---|---|
| **Canva** | Conectada · brand kit **"Dimanche"** ✅ · **sin templates autollenables** ❌ | Piezas on-brand con **foto real**: carteles de mostrador, posts/stories IG, menús. Alto leverage: crear **brand templates con autofill**. |
| **Higgsfield** | Conectada · **836 créditos** (plus) ✅ | Imagen/video: mejora/ambienta sobre **foto real** (nuestra o del celu) o genera **genérico/mood** (b-roll, ambiente); nunca un producto/local inventado. Skill `dimanche-media`. Edición: reframe 9:16, clipper, upscale. |
| **Adobe** | Conectada | Retoque y resize de **fotos reales** por plataforma. |
| **Gamma** | Conectada | Decks/docs internos (brand book, pitch). |
| **Claude design** (canvas-design) | Skill | Arte/posters a medida para piezas especiales. |

**Flujo tipo:** foto real (Drive/Luciano) → Adobe (retoque) → Canva (template + autofill) → brand-check → Propuesto. Genérico/mood → Higgsfield. Video → edición de material real o mood gen.

**Cómo encaja con el bot (frente nuevo, con OK de Luciano):** pedirle a Luti "hacé el cartel de X" → Canva autofill con foto real → brand-check → Propuesto. Hoy estas tools se usan por skill/MCP (Claude/Anto), todavía no desde el bot.

**Gap accionable:** faltan templates autollenables en Canva. Crear 3-4 (cartel mostrador, post IG, story) destraba producción rápida y consistente.

## 🧭 Reglas que no se rompen
- **Brand book + contexto** = criterio primario de todos los agentes.
- **Gate humano**: nada se publica sin tu aprobación. Todo nace Propuesto.
- **Regla visual de oro**: la IA siempre parte de algo real (foto nuestra o del celu) y mejora sobre esa base; nunca inventa el producto/local.
- **Notion = fuente de verdad.** Tono POL-010: sin marketinería, sin emojis.
- **T2**: bajo volumen / alta calidad hasta emparejar la experiencia en mostrador.

## 🔧 Índice técnico (workflows en n8n)
- Bot Luti `YeDLHszeKM9Q7rMx` · Briefing `RoOUx0xyt2AI29St` · Lola/Radar `5rUIYl3AFqrrYYf1`
- Rocco `0PqQtLMQHI3DliI9` · Cata `Fpebc3vpPgI0vv54` · Brand-check `5h3oRNnbl5r7eo02` · Bajada `KuNrE4j7ea9A3pK0`
- Mateo / Numa / Vera: ver `ESTADO.md`. Detalle fino, fixes y aprendizajes: `ESTADO.md` + `docs/diseno-sistema-agentes.md`.
