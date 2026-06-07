# ESTADO — Agencia de Marketing Dimanche (punto de retomada)

## 🟢 2026-06-07 — Estado actual (LEER ESTO PRIMERO)

### ⏭️ PRÓXIMA SESIÓN — frente grande: el BOT-PRODUCTOR (agente de contenido EN Telegram)
Decisión de Luciano (07/06 PM): **TODO por Telegram** (Anto NO usa el Claude Code de Luciano). Luti pasa a ser el **jefe que además produce**: repregunta/refina → genera (incl. **imágenes**) → **devuelve por Telegram**. Sub-puntos:
- **Imágenes por Telegram:** idea de Luciano → conectar un **Drive** y que el bot pase **links de Drive** (en vez de adjuntar el archivo). Generación con Higgsfield disparada desde n8n.
- **Remotion** (video por código/React — **NO está dentro de Higgsfield**, es otra cosa): sumarlo para **slides/loops de TV y reels templatizados** con data real (combos, precios). Complementa Higgsfield (heroes IA).
- **Experto por formato** (TV ≠ post IG ≠ story WhatsApp ≠ folleto ≠ reel). El "refinar antes de producir" ya quedó en el prompt de Luti (hecho hoy); falta profundizar por formato.
- Es **sesión dedicada**. Ver memoria `agente-contenido-frente` + skill `dimanche-media`.

### Checklist "full listo" para Anto (al 07/06 PM)
**Anto YA está en el grupo y puede chatear con Luti:** pedir ideas/copys/hooks, tendencias, **aprobar/archivar ideas**, mandar links/audios/fotos. Luti habla **como jefe** (delega/comunica) y **repregunta antes de producir**.
**Falta para que PRODUZCA en serio por Telegram (= "full listo"):** (1) **bot-productor** [arriba]; (2) ✅ HECHO: el **Calendario de Notion ya está vacío** (Luciano lo vació desde la UI; verificado 07/06 vía MCP — 0 entradas); (3) ✅ HECHO (07/06): regla de oro sincronizada — Notion **MAN-021** (v1.1) + `brand/20-brand-visual-kit.md`; **REF-030** ya la tenía y **REF-002** es solo paleta/logo (no aplicaba). CLAUDE.md y la skill `dimanche-media` ya estaban; (4) menor (DIFERIDO por Luciano el 07/06, NO bloquea): las ~36 entradas de Competencia **NO son duplicados** — fue 1 corrida de Vera (04/06) que sobre-produjo (12 La Celeste · 9 Lo Más Rico · 6 Armando · 6 Perdu · 3 Perikos, todos con título único). No es dedup mecánico sino **curación** (quedarse con 2-3 por competidor, archivar el resto). → **Infra cerrada (2 y 3 hechos, 4 diferido); el único bloqueo real para lanzar a Anto a producir es el bot-productor (1).**

### Hecho hoy PM
Luti = jefe + refina + regla de oro nueva (publicado, versión `89609f5b`). *Memoria & Aprendizajes* limpia (3 tests archivados). *Inteligencia & Ideas* (53) y *Calendario* (24) = reales/intactas (Calendario: Luciano avisó que era de prueba → archivar pendiente). Skill `dimanche-media` + referencias (Levain/Donutelier/Cinnamood) + playbook TV. `agente-contenido-frente` guardado.

---

**Sistema VIVO.** Luciano recargó crédito de Anthropic → el bloqueo del 05/06 está RESUELTO. Conviene que Luciano ponga un **tope mensual** en la consola de Anthropic para no repetir el susto.

### Hecho esta sesión
- **Tokens (Wave 1, en vivo):** bot memoria 40→16 + `maxIterations:3`; **Cata → Haiku 4.5** + fix de duplicación (las campañas venían ×24, ~7K tokens/corrida de más); **Rocco** estaba SIN tope y disparó **21 llamadas a Claude en una corrida** (loop) → capeado. Aprendizaje clave: la **caché y el "brand-book embebido" que dicen los docs NO existen** (el nodo nativo de Anthropic en n8n no cachea) → memoria `n8n-caching-brand-book-no-reales`. **Wave 2** (caché real vía nodo HTTP a `/v1/messages`) = opcional, pendiente.
- **Bot más vivo (ROADMAP pt 2) = COMPLETO y probado:** distingue quién habla y no saluda (lee `message.from`), lee **links** (tool `/web`), entiende **fotos** (trigger `download:true` + filtro ampliado + reruteo del binario), **transcribe audios** (rama: *Es voz? → Bajar audio → Renombrar audio [.oga→.ogg, si no Groq lo rechaza] → Transcribir (Groq Whisper) → Audio a texto → agente*). Cred Groq = "Header Auth account" (`0ZgIYgKG8D7Pqr55`). Probado (corrida #94): transcribió voseo perfecto y respondió on-brand. Decisión: el brand book NO se inlinea en el bot (queda lean + busca en Notion a demanda). Opcional pendiente menor: pasarle la HORA al prompt (hoy solo lleva la fecha). TTS (que el bot conteste por voz) = futuro, con ElevenLabs.
- **Regla visual de oro ACTUALIZADA (en CLAUDE.md):** la IA SIEMPRE parte de algo REAL (foto nuestra de Drive o **foto rápida del celu**), nunca inventa de cero. ⚠️ **Pendiente: bajar este cambio a Notion (REF-002/030) y a `brand/20-brand-visual-kit.md`** (Notion = fuente de verdad).
- **Skill `dimanche-media` RECONSTRUIDA** como el sistema completo del PDF *Branded AI Guide*: `SKILL.md` + `references/` (framework-6-capas · recetas-de-toma · herramientas · postproduccion-y-realismo · vocabulario-y-readiness · **pantallas-tv-local** [playbook QSR: Starbucks/McD/Mostaza] · **marcas-referencia** [Levain/Donutelier/Cinnamood]). Flujo probado: **fotos reales de Drive como referencia de estilo** → hero premium on-brand (Higgsfield `nano_banana`, 2k) → composición con logo real (Niveau Grotesk) + texto → **movimiento** (Seedance image→video). Salidas en `~/Downloads/dimanche-slides/`. (Luciano: las fotos viejas de `Editadas` no le gustan; las slides compuestas le parecieron "básicas, les falta amor" → eso lo levanta el agente de contenido.)
  - **Assets reales (Drive local montado):** `…/GoogleDrive-lucianosanchez@panaderiadimanche.ar/Mi unidad/06_Marketing/` → fotos `01_Fotos/Editadas` (+ `Sesiones/Sesion_Principal/Fotos`, 197), logos `00_Marca/Logos` (Perfil-13 = wordmark negro transparente → recolorear a blanco para el azul), packaging `04_Packaging`. Fuente **Niveau Grotesk** (OTF) en `…/Otros ordenadores/Mi Mac/Downloads/Niveau_Grotesk/`. Paleta: azul `#3559E0` + crema `#E9E3D9`, **sin naranja** (retirado).

### ⭐ Frente PRIORITARIO de Luciano — AGENTE DE CONTENIDO (sesión dedicada aparte)
La cara pública ante clientes potenciales, "bien picante". **Expertos por tipo de contenido** (TV ≠ post IG ≠ story de WhatsApp ≠ folleto del local ≠ reel), cada uno con su playbook. Requiere: referencias de marca + archivos nuestros + do's/don'ts + **definir materiales/iluminación/tomas específicos de Dimanche** (6 niveles del framework aplicados a NUESTRA marca, no genéricos). Memoria `agente-contenido-frente`. **NO arrancar hasta cerrar la infra.**

### 🔜 PRÓXIMO PASO (acordado): META / INSTAGRAM — con Claude in Chrome
Último frente de infra. Desbloquea **métricas reales** de IG (Numa) + a futuro **publicar directo**. **Luciano puede adelantar solo:** (1) poner la cuenta de IG en modo **Business/Profesional**, (2) vincularla a una **Página de Facebook**. Lo técnico (app en *Meta for Developers* + token de larga duración + cablearlo en n8n) se hace **juntos con Claude in Chrome** en sesión fresca (es un quilombo; guiarlo clic por clic).

### Workflows n8n tocados esta sesión
Bot `YeDLHszeKM9Q7rMx` (vivo, multimodal — varias versiones publicadas) · Cata `Fpebc3vpPgI0vv54` (Haiku + dedup) · Rocco `0PqQtLMQHI3DliI9` (capeado). El resto (Briefing/Lola/Mateo/Numa/Vera) ya tenían `maxIterations:2`.

---

## ⚠️ 2026-06-05 — CRÉDITO ANTHROPIC AGOTADO (bloqueante) + optimización de tokens

**Estado:** la cuenta de Anthropic se quedó **SIN CRÉDITO** → el bot y los 6 agentes fallan con `400 "credit balance too low"`. Todo el sistema está **caído** hasta que Luciano cargue saldo (+ conviene poner un tope mensual). El gasto (~US$50) fue el motor viejo: bot en Sonnet respondiendo a todo sin caché + un loop de Rocco + testeo intensivo del 3–4/06.

**Hecho hoy (sin gastar crédito; publicado en n8n):**
- **Bot Luti:** memoria 40→16, `maxIterations:3`; **distingue quién habla y no saluda cada vez**; **lee links** (tool `/web`); **entiende fotos** (trigger `download:true` + filtro ampliado + reruteo del binario, esquivando el nodo "escribiendo…"); **distingue y declina audio/video/archivo** con aviso claro (sin inventar, sin gastar al pedo); límites de capacidad en el system prompt. Sigue en **Sonnet** (el A/B a Haiku se hace con Luciano para juzgar la voz).
- **Cata → Haiku 4.5** + corregido bug de **duplicación ×24** de campañas (~7K tokens/corrida menos).
- **Rocco:** el agente estaba **SIN tope** → en la corrida #88 disparó **21 llamadas a Claude** (loop de tokens). Capeado a `maxIterations:3`. (Lola/Mateo/Numa/Vera/Briefing ya estaban en 2.)
- **`/web`** verificado: lee páginas normales; IG/TikTok caen en muro de login (el bot lo detecta y avisa, no resume la pantalla de login).
- **Aprendizaje clave:** la caché y el "brand-book embebido" que dicen los docs **NO existen** (el nodo nativo de Anthropic en n8n no cachea). Ver memoria `n8n-caching-brand-book-no-reales`.

**Depende de Luciano:**
1. **Anthropic → Billing:** cargar saldo (US$5 alcanza para la prueba) + poner **tope mensual** (ej. US$15) para que no se repita.
2. **Groq API key** (gratis, console.groq.com) para sumar **transcripción de audio** al bot (Whisper large-v3-turbo, mejor relación calidad/precio).
3. Con crédito: **prueba final** (mandar al bot texto/foto/link) + decidir **bot → Haiku** (4× más barato).
4. Decisión nueva: **generar/editar video** en el bot (vía Higgsfield; gasta créditos aparte; regla visual de oro: IA solo genérico/mood, nunca producto/local real). Es un frente nuevo.

**Pendiente Claude (no bloqueante):** armar audio (tras la key de Groq); revisar `retryOnFail` de los nodos IA por UI; limpiar el `(cacheado)` de los PROMPT.md.

---


> Leé este archivo primero para retomar el proyecto en una sesión nueva. Última actualización: 2026-06-04 (**EQUIPO DE AGENTES COMPLETO**). Resumen: el **core** (briefing lunes 8am + bot Luti) sigue ACTIVO y el lector `/web` anti-bot vivo. **Los 6 agentes están construidos** y escriben a *Inteligencia & Ideas* (Tipos variados): **Lola (radar)** martes 9am · **Mateo (observatorio+global)** miércoles 9am · **Numa (performance)** lunes 10 UTC · **Vera (competencia)** quincenal — **los 4 ACTIVOS**; **Rocco (cazador, viernes) ACTIVO** y **Cata (coordinador) ACTIVA** (parte operativo diario 8am al grupo), ambos publicados 04/06. **MODELO DE COMUNICACIÓN (decidido 04/06):** los 5 agentes de research trabajan CALLADOS (depositan en *Inteligencia & Ideas*, no pingean); a Luciano le llegan por Telegram SOLO: el **briefing** (lunes 8am, consolida la semana), el **parte de Cata** (diario 8am, operativo) y el **bot Luti** (on-demand, le hablás). (Rocco podría avisar suelto solo si algo viral urgente — no implementado.) **Bloqueo de datos sociales RESUELTO:** se pagó **Apify** — Numa/Vera/Rocco bajan IG/Google-Trends/X por HTTP (ver [[scraping-ig-muerto]]; ojo el tope de 32GB concurrente de Apify → los crons quedaron escalonados por día para no pisarse). Las lecturas de Notion van por **HTTP a la API clásica** porque el `getAll` nativo se cuelga ([[n8n-notion-getall-hang]]). Todos los agentes llevan el **brand book + contexto completos** como criterio primario ([[brand-book-criterio-agentes]]) + conciencia temporal (saben la fecha, descartan lo efímero). **INFRA + GATE (hecho 04/06, probado y EN VIVO):** brand-check (`5h3oRNnbl5r7eo02`, #72) + bajada a canales (`KuNrE4j7ea9A3pK0`, #73) + brand-check **enganchado DENTRO de la bajada** (#79, determinístico: bajada→armar copy→brand-check→combinar) + **gate desde el chat** en el bot (tools HTTP: cambiar Estado de ideas #75 + **agregar al Calendario** #82, ambos en Propuesto/gate humano) + **Vera rota los 6 competidores** (3 por corrida alternando set A/B, expresión en el body de Apify). Bot con **memoria 40 mensajes** + **conciencia de fecha** ({{now}} en el prompt) + guarda lo importante en Notion proactivamente. **Cata** posteando parte diario 8am al grupo (cred Telegram enganchada). Fase 3 (equipo junto) corrida OK. **PRÓXIMO FRENTE = punto 2 del `ROADMAP.md`: bot más vivo** (entender fotos/audios/links de IG-TikTok + distinguir quién habla y no saludar cada vez + brand book completo dentro de Luti). Luego punto 3 **Meta** (métricas reales de IG + publicar directo a IG — requiere setup de Luciano: IG profesional + app Meta), punto 4 **contenido/copys** (con tu OK; embeber ahí la regla de productos autorizados [[producto-autorizacion-contenido]]), punto 5 afinado. **TikTok en Rocco: pendiente (necesita proxy residencial pago de Apify — decisión de Luciano).** **HIGIENE DE PRUEBAS: borrar el dato de prueba de las bases reales apenas se verifica (pedido de Luciano) — ver [[n8n-mcp-quirks]] para el cómo.** **Comunicación con Luciano: UNA cosa clara por vez, al final** ([[comunicacion-luciano]]). **Mapa vivo de prioridades: ver `ROADMAP.md`.**)

## Qué es
Agencia de marketing semiautomática de Dimanche Panificados. Operada por Anto + IA, dirigida y aprobada por Luciano. Objetivo: posicionar la marca, salir del secreto, in-house. Fuente de verdad: **Notion**. Interfaz: **bot de Telegram con memoria** (vía n8n + Claude). Repo: este.

## 🎯 Visión de producto (clave, definida 03/06)
La **interfaz principal es el CHAT de Telegram** — Anto y Luciano viven a mil y casi no abren Notion. Por eso:
- Los agentes son **asistentes con nombre** a los que se les **habla por chat** (consultás a cualquiera: *"Lola, ¿qué tendencias hay?"*) y que **además avisan solos** (proactivos).
- **Cada agente vive en 2 modos** con las mismas herramientas detrás: **reactivo** (le hablás → responde) y **proactivo** (cron → te avisa).
- Implementación práctica: **un solo bot (Luti) que "es" toda la agencia** y adopta el rol que le pidas con sus herramientas (no 8 bots). Los crons usan las mismas herramientas.
- **Notion = memoria/backend, NO interfaz.** Los agentes guardan ahí lo que descubren para tenerlo a mano cuando se les pregunta.
- **Nombres SIEMPRE con referencia** (ej. "Mateo (observatorio)", "Lola (radar)") — nadie tiene que acordarse qué hace cada uno.
- **Equipo:** Amadeo (briefing/estratega) · Lola (radar de tendencias) · Numa (performance) · Vera (competencia) · Mateo (observatorio) · Rocco (cazador de virales) · Cata (coordinación) · Luti (bot del grupo).

## ✅ Briefing — FUNCIONA END-TO-END (probado 03/06: posteó al grupo)
El briefing **nunca** había logrado postear. El 03/06 se arreglaron **5 bugs encadenados** y posteó OK al grupo (mensaje real, corrida #38, `message_id 10`, chat "Agencia Mkt"). **✅ ACTIVADO el 03/06** — corre solo los lunes 11:00 UTC (=8am ART).

**Los 5 bugs (todos arreglados vía MCP de n8n, workflow `RoOUx0xyt2AI29St`):**
1. **Loop de tokens** (los ~10,7M tokens / $35): el Estratega llamaba a Claude **22 veces/corrida** — agente con `maxIterations` default 10 + reintentos del SDK ante 429, sin timeout → corridas de 40-50 min. **Fix:** `maxIterations: 2`. (El diagnóstico viejo de "saturación de n8n" era falso: el runData pesaba 4,7M chars = el loop materializado.)
2. **Multi-corrida**: el nodo Estratega corría **1 vez por cada campaña** de entrada (footgun de n8n: un nodo se ejecuta 1 vez por item). **Fix:** nodo **`Una sola corrida`** (Limit 1) antes del Estratega; lee igual todo con `.all()`.
3. **Prompt sin foco**: mandaba las 24 piezas de junio+julio. **Fix:** filtro en el prompt → piezas de los **próximos 21 días** + campañas **vigentes** (fin ≥ hoy). ~27K→~12K tokens.
4. **chatId viejo**: el grupo se convirtió en **supergrupo** y el id cambió; el viejo `-5107497568` daba `400 group chat was upgraded to a supergroup`. **Fix:** id nuevo **`-1003806297005`**.
5. **Mensaje >4096 chars** (límite Telegram): el briefing es largo. **Fix:** nodo **`Partir mensaje`** (Code) que lo corta en trozos ≤3800 y los manda numerados (1/2…).

- `executionTimeout 120s` **confirmado activo** (la corrida trabada #31 se cortó exacto a los 120s).
- Las pruebas del 03/06 costaron centavos (~$0,30). El gasto grande fue solo el loop (muerto). Para probar gratis de acá en más: **pin data** (clavar datos de mentira a un nodo, sin llamar a Claude).
- **✅ CORE ACTIVO (03/06):** briefing publicado (corre lunes 11:00 UTC) y bot publicado (`YeDLHszeKM9Q7rMx`). El bot **responde a todo** en el grupo (privacy mode off, decisión de Luciano; reversible a "solo menciones" con un filtro). Crédito Anthropic restante: ~$19.

## ✅ Radar de Tendencias + lector universal `/web` (03/06)
- **Lector universal `/web` (Scrapling/Railway) — DEPLOYADO Y ANDANDO.** `GET /web?url=...` trae **texto limpio de cualquier página sorteando anti-bot** (StealthyFetcher + `solve_cloudflare`). Probado: pasa el Cloudflare de ICYMI (Substack) y Circuito Gastronómico. Código en `server.py` + `scripts/radar_scrape.py` (commiteado + deployado).
- **Radar de Tendencias — FUNCIONA (probado #45, success).** Workflow `5rUIYl3AFqrrYYf1`. Flujo: Schedule → **Clima Córdoba** (Open-Meteo, API gratis sin key) → **ICYMI** (vía `/web` al feed) → **Claude** (cruza clima+tendencias, `executeOnce`+`maxIterations 2`) → `Partir mensaje` → grupo. Generó 2 ideas on-brand con el clima real + tendencias reales y descartó con criterio. **DESACTIVADO** hasta coordinarlo con el briefing (ver pendientes).
- **Fuentes (en `agentes-autonomos/fuentes.md`):** Global → ICYMI (redes), Taste Tomorrow (pan/food). Local Córdoba → InfoNegocios, Punto a Punto, Circuito Gastronómico. Todas vía `/web`. (Hoy el Radar usa solo ICYMI+clima; faltan las locales.)
- **Clima de Córdoba (Open-Meteo)** = señal transversal "siempre presente": ya en el Radar; falta sumarla al briefing.
- **Decisión clave:** NADA de Apify ni scraping de IG/TikTok. Las tendencias salen de **fuentes editoriales curadas** leídas con `/web`. Más barato, más rico, sin pelear con el scraping.

## Estado actual (✅ hecho)
- **Notion** — mesa operativa creada (página madre + 5 DBs) + 2 manuales aprobados (Vigentes).
- **Brand kit + skills** — `brand/` (Brand Book, contexto, visual kit) + 8 skills Dimanche en `.claude/skills/` (orquestador `dimanche-mkt`, brand-check, copy, media, calendario, guion, campana, formatos).
- **Agentes** (prompts en `agentes-autonomos/`): briefing, cazador-virales, observatorio, tendencias, tendencias-globales, competencia, performance, coordinacion.
- **Calendarios junio y julio** cargados en Notion (estado Propuesto).
- **Infra activa:** n8n Cloud + Railway/Scrapling **deployado y vivo** (`/health` responde 200). URL: `https://dimanche-agencia-production.up.railway.app`.
- **Bot de Telegram v1 ACTIVO y probado** (7 conversaciones OK, 02/06). Solo texto, memoria + marca. Workflow `YeDLHszeKM9Q7rMx`.
- **Bot v2 (Notion) — ✅ FUNCIONANDO (probado 02/06):** el agente busca, lee y registra en Notion (learning loop completo verificado). 3 herramientas: Buscar / Leer página / Registrar aprendizaje (en *Memoria & Aprendizajes*). Integración Notion "Agencia" conectada. Modelo **Claude Sonnet 4.6**; cuenta Anthropic en **tier 2** (subido 03/06 por rate limit). Optimizado: memoria **40 mensajes** (subida 04/06 de 10; + instrucción de guardar proactivamente lo importante en Notion para memoria permanente), "Leer pagina" tope 50 bloques. + indicador **"escribiendo…"** + filtro IF que ignora updates sin texto (altas/fotos/stickers). Lectura del mensaje vía `$('Mensaje Telegram').first()`. En grupo **"Agencia Mkt"**. Respuestas con Notion: 13-21s.
- **Learning loop:** base "Memoria & Aprendizajes" creada en Notion (el bot v2 escribe ahí).

## Lo que falta (próximos pasos)
**De Luciano (manual):** ✅ TODO HECHO — integración Notion "Agencia" creada y conectada a la base (Documentos, Productos, Agencia de Marketing, Memoria & Aprendizajes); credencial "Notion account" en n8n; v2 publicada y probada. (También ✅: bot v1, deploy Railway, tope de gasto en Anthropic.)

**De Claude — PENDIENTES (post 03/06), por frente:**

*Radar (en curso):*
- **① Lola (radar) en los 2 modos — corazón de la visión chat.** Diseño: **Lola (cron) guarda tendencias en *Inteligencia & Ideas*** y de ahí **leen los dos**: el **bot** (consultás "Lola, ¿qué viste?") y **Amadeo (briefing)** el lunes. Un solo trabajo alimenta ambos. **3 piezas (de menor a mayor riesgo):**
  - **(1) ✅ HECHA Y PROBADA (03/06, corrida #46).** El Radar `5rUIYl3AFqrrYYf1` se reestructuró: agente con **output parser** (JSON `{ideas:[...]}`) → **Split Out** → nodo **Notion create** (una página por idea en *Inteligencia & Ideas*, `Tipo=Tendencia`, `Estado=Nuevo`, `Fecha=hoy`). Se quitaron los nodos `Partir mensaje`+`Postear al grupo`: **Lola ya NO postea a Telegram, solo escribe en Notion.** Probado end-to-end: cruzó clima+ICYMI y creó 2 ideas on-brand con selects exactos (acentos incluidos). Credencial Notion en n8n: `mXTOBH9wxuToScsy`. **✅ CRON ACTIVADO (03/06): corre martes 9am ART** (ya no choca con el briefing porque no postea). Pendiente menor: `executionTimeout` por UI (⑩) — aunque `maxIterations:2` + timeouts HTTP ya acotan el riesgo.
  - **(2) ✅ HECHA Y PROBADA EN VIVO (03/06, corrida #55, ~18s).** El bot lee el radar con una **herramienta HTTP** (`httpRequestTool`) a la API de Notion (endpoint **clásico** `POST /v1/databases/f8f5e2fb…/query`, `Notion-Version 2022-06-28`, `optimizeResponse`→`results`). Probado: "Lola, ¿qué viste?" devolvió 3 ideas reales con pilar y prioridad, on-brand (citó textual la acción guardada). **NO usa el nodo Notion `getAll` (cuelga).** La credencial del nodo HTTP se pega a mano en la UI (el MCP no puede).
  - **(3) ✅ HECHA Y PROBADA (03/06, corrida #53).** El briefing tiene un nodo HTTP **`Leer Radar`** (mismo endpoint clásico) antes del Estratega; el prompt parsea `results[].properties.*` y la sección 4 ("A qué nos subimos") prioriza ideas Nuevo/Alta del radar. Probado: cruzó calendario+objetivos+radar impecable. **Publicado → corre el lunes con el radar integrado.**
  - **DB *Inteligencia & Ideas*** (page-id `f8f5e2fb4359435e922c1f8d401625fe`): campos → **Título**(title) · **Tipo**(select: Tendencia/Competencia/Performance/Idea) · **Oportunidad**(text) · **Acción sugerida**(text) · **Pilar**(select: los 6 de POL-015) · **Prioridad**(select: Alta/Media/Baja) · **Buyer persona**(select: Juan Pablo/Cande/Analía/Todos) · **Estado**(select: Nuevo/En revisión/Accionado/Archivado) · **Fuente**(url) · **Fecha**(date).
- **② Fuentes locales al Radar — ✅ HECHO PARCIAL (03/06, corrida #47).** Sumadas **Punto a Punto** (negocios) y **Circuito Gastronómico** (gastro) como nodos HTTP encadenados antes del agente; mejoraron mucho la salida (ideas con gancho local cordobés). **InfoNegocios quedó afuera**: su homepage no responde por `/web` dentro del timeout (cortó a 70s). Revisitar con una URL de sección liviana. Prompt endurecido: `fuente` usa solo la URL del sitio (no inventa slugs).
- **③ ✅ HECHO (04/06) — equipo completo.** Todos replican el patrón de Lola (agente con brand book embebido → output parser → Split Out → Notion create). **Numa (performance)** y **Vera (competencia)** terminaron yendo por **Apify** (no `/ig`, que murió por el muro de login). **Mateo** fusiona Observatorio + Tendencias Globales (`/web`). **Rocco (cazador)** cruza Google Trends + X/Twitter vía Apify con las 4 condiciones del cazador (validado #71). **Cata (coordinador)** arma el parte para Anto. Activos: Lola/Mateo/Numa/Vera. Inactivos (tu OK): Cata, Rocco. Detalle por agente en `ROADMAP.md` + `docs/diseno-sistema-agentes.md`.

*Gobernanza:*
- **④ Flujo de estados de campaña** (Propuesta→Aprobada): el briefing distingue propuesto vs aprobado; `dimanche-local` solo baja lo aprobado; aprobar = cambiar estado en Notion (o vía el bot).

*Clima:*
- **⑤ Sumar el clima (Open-Meteo)** al briefing (hoy solo en el Radar) — "siempre presente".

*Bot (mejoras):*
- **⑥ Multimedia:** fotos (visión), audios (transcripción), links IG/TikTok (vía `/web`).
- **⑦ Fotos on-brand:** Higgsfield (mood) + Drive (foto real). Regla visual de oro.
- **⑧ Dinámica de grupo:** que no salude cada vez, distinga Luciano/Anto, cite el mensaje (relevante porque hoy **responde a todo**).

*Optimización (al final):*
- **⑨ Test Gemini** (A/B vs Sonnet en el briefing) → si el tono sirve, migrar lo mecánico/bot a **Gemini Flash** (casi gratis). + prompt caching. Criterio de modelos ya decidido: Haiku/Gemini Flash mecánico, Sonnet creativo/estratégico.

*Housekeeping:*
- **⑩** `executionTimeout` (manual, UI de n8n) a los workflows nuevos (Radar) por las dudas.
- **⑪ Ordenar Notion** (diagnóstico/competencia → docs `ref__`).
- **⑫ NotebookLM para el equipo** (subir `brand/`, Q&A humano — tarea del SETUP). Ojo: NotebookLM es para el **equipo**, NO para los agentes (no tiene API útil; la enterprise es de pago).
- **⑬ Pulir lentitud del bot** (menor): "escribiendo…" que lata cada 5s.

## IDs clave
- **Repo:** github.com/lucianosanchez-ui/dimanche-agencia · local: `~/Desktop/dimanche-agencia`
- **n8n:** panaderiadimanche.app.n8n.cloud · bot: `YeDLHszeKM9Q7rMx` (activo) · briefing semanal: `RoOUx0xyt2AI29St` (activo, lunes) · Radar Tendencias: `5rUIYl3AFqrrYYf1` (**ACTIVO** desde 03/06; escribe en *Inteligencia & Ideas*, no postea a Telegram. Schedule: martes 12:00 UTC = 9am ART. Fuentes: ICYMI + clima + Punto a Punto + Circuito Gastronómico)
- **Telegram:** bot **@Dimanchemkt_bot** ("Luti") · grupo **"Agencia Mkt"** (supergrupo) chat **`-1003806297005`** (el viejo `-5107497568` quedó obsoleto cuando el grupo pasó a supergrupo) · privado Luciano `8702546300`. Pendiente: desactivar *privacy mode* en BotFather (para que el bot reciba todos los mensajes del grupo) — modo elegido: "responde a todo".
- **Railway:** project `f6a8eb56-85a9-4174-8add-b092c25a8744` · URL: `https://dimanche-agencia-production.up.railway.app` · endpoints: `/health` · `/ig/{user}` (perfil IG) · `/gmaps?url=` (rating) · **`/web?url=`** (lector universal anti-bot, texto limpio de cualquier página). Redeploy = push a `main` (auto).
- **Notion teamspace:** `3655616e-313d-8127-89a6-004279baed6c`
  - Página madre "Agencia de Marketing": `3735616e-313d-8180-a8b4-ebab3c762635`
  - DBs: Objetivos&Campañas `9603f67e-0647-49d3-85e9-eda7454cf6d5` · Calendario `3d326521-b346-46ab-9bfd-141475b44fd5` · Inteligencia&Ideas `2a3d57ca-7585-4e85-ab2e-eb0f4225790f` · Activos `b032f2bc-0864-4d55-837b-81b8bb10eea4` · Memoria&Aprendizajes `63e720f6-4942-48c2-965b-f5df8e08d93f`
  - DB Documentos (marca): `d508a305-c1d5-4c27-901c-38903c2e8ff8` · DB Productos: `ef5aaa1f-f186-4cc8-94c5-0730df86bb44`
  - ⚠️ **Notion en n8n:** los nodos Notion usan el *page-id* de la base, NO el collection-id de arriba (la API REST lo rechaza con 404). Ej.: Memoria&Aprendizajes page-id = `937b1f75-812b-4252-b24f-405e8e976271` (el `63e720f6…` es el data-source). Para Buscar/Leer alcanza con `$fromAI` (el agente pasa el id de los resultados).
- **Drive:** 06_Marketing `1XmTlskZNjzWjMNSz2bXset8uC422jJIB` · MKT-Dimanche `1Nr8iiUwmdPwEsKYvoUt54CFnMCiGjb--`
- **Higgsfield:** workspace plus (créditos disponibles).

## Cómo retomar en una sesión nueva
1. Abrí **Claude Code en `~/Desktop/dimanche-agencia`** (o Claude con acceso a este repo).
2. Decile: **"Leé ESTADO.md y CLAUDE.md, y seguimos con [el próximo paso]"**.
3. El sistema documental de Notion se gestiona con la skill **notion-dimanche** (respetarla).
4. Nada de secretos en el repo: las API keys/tokens van en n8n y en `.env` local (gitignored).
