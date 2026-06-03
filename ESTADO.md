# ESTADO — Agencia de Marketing Dimanche (punto de retomada)

> Leé este archivo primero para retomar el proyecto en una sesión nueva. Última actualización: 2026-06-03 (briefing FUNCIONA end-to-end: 5 bugs arreglados, posteó al grupo; falta solo activarlo).

## Qué es
Agencia de marketing semiautomática de Dimanche Panificados. Operada por Anto + IA, dirigida y aprobada por Luciano. Objetivo: posicionar la marca, salir del secreto, in-house. Fuente de verdad: **Notion**. Interfaz: **bot de Telegram con memoria** (vía n8n + Claude). Repo: este.

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

## Estado actual (✅ hecho)
- **Notion** — mesa operativa creada (página madre + 5 DBs) + 2 manuales aprobados (Vigentes).
- **Brand kit + skills** — `brand/` (Brand Book, contexto, visual kit) + 8 skills Dimanche en `.claude/skills/` (orquestador `dimanche-mkt`, brand-check, copy, media, calendario, guion, campana, formatos).
- **Agentes** (prompts en `agentes-autonomos/`): briefing, cazador-virales, observatorio, tendencias, tendencias-globales, competencia, performance, coordinacion.
- **Calendarios junio y julio** cargados en Notion (estado Propuesto).
- **Infra activa:** n8n Cloud + Railway/Scrapling **deployado y vivo** (`/health` responde 200). URL: `https://dimanche-agencia-production.up.railway.app`.
- **Bot de Telegram v1 ACTIVO y probado** (7 conversaciones OK, 02/06). Solo texto, memoria + marca. Workflow `YeDLHszeKM9Q7rMx`.
- **Bot v2 (Notion) — ✅ FUNCIONANDO (probado 02/06):** el agente busca, lee y registra en Notion (learning loop completo verificado). 3 herramientas: Buscar / Leer página / Registrar aprendizaje (en *Memoria & Aprendizajes*). Integración Notion "Agencia" conectada. Modelo **Claude Sonnet 4.6**; cuenta Anthropic en **tier 2** (subido 03/06 por rate limit). Optimizado: memoria 10 mensajes, "Leer pagina" tope 50 bloques. + indicador **"escribiendo…"** + filtro IF que ignora updates sin texto (altas/fotos/stickers). Lectura del mensaje vía `$('Mensaje Telegram').first()`. En grupo **"Agencia Mkt"**. Respuestas con Notion: 13-21s.
- **Learning loop:** base "Memoria & Aprendizajes" creada en Notion (el bot v2 escribe ahí).

## Lo que falta (próximos pasos)
**De Luciano (manual):** ✅ TODO HECHO — integración Notion "Agencia" creada y conectada a la base (Documentos, Productos, Agencia de Marketing, Memoria & Aprendizajes); credencial "Notion account" en n8n; v2 publicada y probada. (También ✅: bot v1, deploy Railway, tope de gasto en Anthropic.)

**De Claude — próximos frentes:**
- **v2 del bot:** ✅ HECHO Y PROBADO (Notion + learning loop + "escribiendo…").
- **Criterio de modelos (decidido 03/06):** por agente según tarea — **Haiku 4.5** para mecánicos (scraping, rutear, clasificar, registrar), **Sonnet 4.6** para creativos/estratégicos (copys, briefing, guiones), **Opus** solo para análisis pesado puntual. Rate limits de Anthropic son **por modelo** (cuotas separadas) y los tokens cacheados no cuentan al límite.
- **Pulir lentitud (opcional):** respuestas con Notion tardan 13-21s; el "escribiendo…" dura 5s. Pendiente menor: hacerlo "latir" (renovar cada 5s) para respuestas largas.
- **Fotos en el bot:** conectar Higgsfield (mood/escena) + Drive (foto real de producto/local). Regla: NADA real inventado con IA.
- **Briefing Semanal ✅ FUNCIONA (probado 03/06, posteó al grupo)** (`RoOUx0xyt2AI29St`): Schedule **lunes 11:00 UTC (=8am ART)** → Calendario+Objetivos → `Una sola corrida` → Estratega (Sonnet) → `Partir mensaje` → postea al grupo. Ver la sección "Briefing — FUNCIONA END-TO-END" arriba para los 5 fixes. **✅ ACTIVO (03/06)** — corre solo los lunes; ya no requiere disparo manual.
  - Cuando existan agentes de scraping, sumar lectura de *Inteligencia & Ideas* (ya en su PROMPT).
- **Mejoras del bot pedidas (03/06), para la próxima:**
  - **Dinámica de grupo:** que distinga quién habla (Luciano vs Anto), **no salude cada vez**, siga el hilo de la conversación en contexto, y **cite el mensaje** (reply) cuando responde algo atrasado o ambiguo.
  - **Recibir y analizar multimedia:** fotos (visión de Claude), audios (transcripción), videos, y **links de IG/TW/TikTok** (vía Scrapling/Railway). El bot hoy solo procesa texto.
  - **Tono:** ya ajustado a argentino/cordobés natural sin exagerar (03/06).
- **Agentes autónomos que faltan:** cazador de virales, performance, competencia, observatorio, tendencias (varios necesitan Scrapling).
- **Conectar Scrapling de Railway** a los workflows.
- **Ordenar Notion** (tarea pendiente): diagnóstico/competencia/drivers → docs `ref__` formales (notion-dimanche).

## IDs clave
- **Repo:** github.com/lucianosanchez-ui/dimanche-agencia · local: `~/Desktop/dimanche-agencia`
- **n8n:** panaderiadimanche.app.n8n.cloud · bot workflow: `YeDLHszeKM9Q7rMx` · briefing semanal: `RoOUx0xyt2AI29St`
- **Telegram:** bot **@Dimanchemkt_bot** ("Luti") · grupo **"Agencia Mkt"** (supergrupo) chat **`-1003806297005`** (el viejo `-5107497568` quedó obsoleto cuando el grupo pasó a supergrupo) · privado Luciano `8702546300`. Pendiente: desactivar *privacy mode* en BotFather (para que el bot reciba todos los mensajes del grupo) — modo elegido: "responde a todo".
- **Railway:** project `f6a8eb56-85a9-4174-8add-b092c25a8744` · URL pública: `https://dimanche-agencia-production.up.railway.app` (vivo, `/health`→200)
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
