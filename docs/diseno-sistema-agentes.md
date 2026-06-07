# Diseño del sistema de agentes — Agencia Dimanche

> **Fase 1: definición.** Este doc define TODOS los agentes y la infra compartida, para después armar la infra (Fase 2) y probarlos en conjunto (Fase 3). Mapa de prioridades en `ROADMAP.md`; estado fino en `ESTADO.md`.
> Criterio rector: **el brand book + contexto son la base y el filtro de todos los agentes** (ver `brand/`). Todo nace **Propuesto** (gate humano). Toda campaña aprobada **baja a un canal** (mostrador y/o digital). T2: bajo volumen / alta calidad.

> ### ⏱️ Actualización 2026-06-03 (build autónomo)
> - **Mateo (observatorio) ✅ CONSTRUIDO, PROBADO Y ACTIVO** (workflow `YaFi1SWoL0KX4fPt`, corre miércoles 9am). Replica el patrón de Lola con brand book embebido; en la prueba dio 3 ideas profundas y on-brand (feed personalizado→guardados, humor self-aware como *validación* del tono, sourdough como "volver al origen"). Fuentes: ICYMI + Taste Tomorrow vía `/web`. (Social Media Today se descartó: homepage con mucho menú/cookies.) Tendencias Globales quedó **fusionado** acá.
> - **🔴 BLOQUEO de scraping social:** `/ig` ya **no devuelve seguidores** (IG sirve muro de login). `/gmaps` anda (rating) pero lento (~73s) y sin conteo de reseñas. → **Numa, Vera y Rocco** (que dependían de IG) quedan limitados. **Decisión de Luciano pendiente:** Apify/scraper logueado, Meta Graph API (para Numa), o pivotear a `/gmaps`+`/web`. Ver memoria `scraping-ig-muerto`. Los editoriales (Lola, Mateo) NO se ven afectados.

## 1. Arquitectura (3 capas + interfaz, todo sobre Notion)

```
                          ┌── INTELIGENCIA (cron → escriben en "Inteligencia & Ideas") ──┐
  Lola (tendencias) · Tendencias Globales · Mateo (observatorio) · Vera (competencia) · Numa (performance) · Rocco (cazador)
                          └───────────────────────────┬─────────────────────────────────┘
                                                       ▼
   DIRECCIÓN:  Amadeo (briefing) ── lee Inteligencia & Ideas + Calendario + Objetivos → briefing + propone campañas (Propuesto)
                                                       │
   OPERACIONES: Cata (coordinador) ── lee Calendario + Activos + Objetivos → parte operativo a Anto (que nada se caiga)
                                                       │
   INTERFAZ:   Luti (bot Telegram) ── cara reactiva: consultás a cualquiera por chat; lee Inteligencia & Ideas
                                                       │
   CONTROL:    Brand-check (subworkflow reusable) ── corre en cada salida antes de "Propuesto" (+ check liviano de ángulo a la entrada)
                                                       │
   BAJADA:     al aprobar una campaña →  dimanche-local (MOSTRADOR)  +  dimanche-digital (IG/Uber/PedidosYa)  → material Propuesto
```

## 2. Infra compartida (los ladrillos que reusan todos)

1. **Bloque "Criterio Dimanche"** — brand book (MAN-019) + contexto de negocio completos, embebidos como systemMessage base de TODO agente generativo. Ya construido y probado en Lola. **Una sola fuente de criterio.** (Cuando cambie la marca en Notion → re-exportar `brand/*.md` y re-embeber.)
2. **Patrón de ESCRITURA a *Inteligencia & Ideas*** — agente con output parser JSON `{ideas:[...]}` → Split Out → nodo Notion `create` (page-id `f8f5e2fb…`, cred `notionApi`). Probado.
3. **Patrón de LECTURA de *Inteligencia & Ideas*** — nodo HTTP a la API clásica de Notion (`POST /v1/databases/{id}/query`, `Notion-Version 2022-06-28`, cred pegada a mano en UI). El nodo nativo `getAll` **se cuelga** con esa DB. Ver memoria `n8n-notion-getall-hang`.
4. **Scrapling (Railway)** — `/web?url=` (lector universal anti-bot, fuentes editoriales) · `/ig/{user}` (perfiles IG) · `/gmaps?url=` (rating/reseñas).
5. **Brand-check subworkflow** — recibe una idea/pieza, devuelve `{pasa, fallas[], corrección}` con los 5 filtros POL-010 + REF-029 + términos prohibidos + regla visual. Invocable por cualquier agente/skill. (A construir.)
6. **Footguns n8n ya resueltos** — `Limit 1`/`executeOnce` (un nodo corre 1 vez por item); `maxIterations: 2` (evita loop de tokens); `Partir mensaje` (Telegram >4096); `executionTimeout`/`retryOnFail` se setean por **UI**, no por MCP; credencial Notion al nodo HTTP se pega por **UI**.

## 3. Definición de los agentes

| # | Agente | Rol (1 frase) | Fuentes / herramientas | Output → dónde | Cadencia | Estado |
|---|---|---|---|---|---|---|
| 1 | **Amadeo** (briefing/estratega) | Briefing proactivo: foco, campañas y promos ligados a KPI + fechas | Notion (Inteligencia & Ideas + Calendario + Objetivos), clima (pend.) | Briefing → grupo Telegram; campañas → *Objetivos* (Propuesto) | Lunes + día 1 del mes | ✅ activo |
| 2 | **Lola** (radar tendencias) | Tendencias redes + pulso local Córdoba cruzado con clima y agenda propia | `/web` (ICYMI, Punto a Punto, Circuito Gastro) + clima + Notion (calendario/objetivos) | ideas Tipo=`Tendencia` → *Inteligencia & Ideas* | Martes 9am | ✅ activo (profundo) |
| 3 | **Tendencias Globales** | Qué hacen las panaderías/cafés/marcas grandes del mundo; trae ideas a adaptar | `/web` (Taste Tomorrow + referentes globales) | ideas Tipo=`Tendencia` → *Inteligencia & Ideas*; mantiene pág. "Drivers" | Mensual + pre-fecha | 🔨 a desplegar |
| 4 | **Mateo** (observatorio) | Mantiene fresca la base de "qué contenido funciona" (aprendizaje sostenido) | `/web` sobre `fuentes.md` (Link in Bio, Geekout, Mosseri, etc.) | actualiza skill `dimanche-formatos`; reporta accionable Tipo=`Tendencia` | Semanal | 🔨 a desplegar |
| 5 | **Vera** (competencia) | Vigila panaderías Córdoba en clave marca/alcance (no calidad); defiende Villa Allende | `/ig/{user}` + `/gmaps?url=`; base REF-005 | ideas Tipo=`Competencia` → *Inteligencia & Ideas* | Quincenal | 🔨 a desplegar |
| 6 | **Numa** (performance) | Números vs KPIs (POL-016): qué funcionó, qué cortar, qué probar | métricas IG (CSV que pega Anto → fase 2 Meta API) + `/gmaps`; Notion (Calendario) | digest Tipo=`Performance` → *Inteligencia & Ideas* | Semanal | 🔨 a desplegar (dep. métricas) |
| 7 | **Rocco** (cazador de virales) | Caza lo que está POR explotar (tipo Tim Payne) antes del pico, con ventana | `/web` (señales) + Google Trends; criterio de 4 condiciones | ideas Tipo=`Tendencia` Prioridad Alta + **push al grupo** | Diario (2x) + push | 🔨 a desplegar |
| 8 | **Cata** (coordinador) | Que nada se caiga: piezas a tiempo, aprobaciones, tomas, cadencia (MAN-018) | Notion (Calendario + Activos + Objetivos) | parte operativo → Anto; marca trabados en Notion | Diario am + lunes | 🔨 a desplegar |
| — | **Luti** (bot Telegram) | Cara reactiva de toda la agencia; consultás a cualquiera por chat | Notion (busca/lee/registra/radar vía HTTP) | responde en el grupo | reactivo | ✅ activo |

**Patrón de despliegue (replica de Lola) para los 6 que faltan:** `Schedule → reunir señales (/web · /ig · /gmaps · Notion) → Claude (Criterio Dimanche + PROMPT del agente + agenda propia) → output parser JSON → Split Out → Notion create`. Rocco suma un nodo de **alerta al grupo**. Cata **no escribe ideas**: arma un parte y lo postea/avisa.

**Decisión abierta — Tendencias Globales:** hoy no tiene nombre propio y solapa con Mateo (ambos leen fuentes editoriales). Opciones: (a) fusionarlo dentro de Mateo (observatorio cubre formato + tendencia global de producto), o (b) mantenerlo separado y nombrarlo. *Recomendación: fusionar en Mateo* para no inflar el roster (queda: Amadeo, Lola, Mateo, Vera, Numa, Rocco, Cata + Luti).

## 4. Brand-check constante

Subworkflow **reutilizable** (`Brand-check`) que cualquier flujo invoca. Revisa: 5 filtros POL-010 · mensaje maestro REF-029 (a qué persona apunta) · términos prohibidos (marketinería, jerga foodie, etc.) · regla visual de oro (nada identificable con IA) · ¿posiciona o solo vende? Devuelve `{pasa, fallas, versión corregida}`; si toca zona sensible no definida → **escala a humano**, no inventa.

Corre en **dos puntos**:
- **Gate de salida (obligatorio):** antes de marcar cualquier pieza como Propuesto en Notion.
- **Check de ángulo (entrada, liviano):** sobre la idea/ángulo antes de producir, para no gastar generación en algo que ya nace off-brand.

> En los agentes de **inteligencia**, el Criterio Dimanche embebido YA es brand-check en la generación. El subworkflow formaliza el gate cuando algo va a **producirse/publicarse**.

## 5. Bajada a canales de venta (al aprobar una campaña)

**Regla:** ninguna campaña aprobada queda sin bajar a al menos un canal. Se dispara cuando una campaña pasa a **Aprobada** en Notion.

- **Mostrador (existe: `dimanche-local`)** — cartelería + foco de vitrina/exhibición + comunicado/argumentario al equipo de los 3 locales (Boulevares, Gauss, Villa Allende).
- **Digital (NUEVO: `dimanche-digital`)** — bajar la misma campaña a: **Instagram** (post/reel/story listos, con la pieza de calendario), **Uber** y **PedidosYa** (descripción/foto/promo de la ficha — Uber hoy sub-comunicado = oportunidad). Respeta regla visual (foto real) y T2.

Ambas bajadas pasan por brand-check y nacen Propuesto.

## 6. Gate humano

Todo nace **Propuesto**. Aprueban Luciano/Anto. **Objetivo:** que se apruebe/archive/mande-a-calendario **desde el chat** (decirle a Luti "aprobá la #2") — pieza de gobernanza pendiente, alta prioridad.

## 7. Plan de construcción (Fase 2) y prueba conjunta (Fase 3)

**Orden sugerido (de menor a mayor dependencia):**
1. **Brand-check subworkflow** (ladrillo que usan los demás).
2. **Editoriales que replican a Lola limpio:** Mateo (observatorio, `/web`) + Tendencias Globales (o fusionado) + Rocco (cazador, `/web` + Trends).
3. **Con Scrapling social:** Vera (competencia, `/ig`+`/gmaps`) + Numa (performance, `/gmaps` + CSV de métricas).
4. **Cata** (coordinador, solo Notion).
5. **Bajada:** `dimanche-digital` (nuevo) + cablear `dimanche-local`.
6. **Gate desde el chat** + **Lola/bot profundo** (brand book en el bot).
7. Sumar clima a Amadeo (⑤).

**Prueba conjunta (Fase 3):** correr todos (manual/pin), verificar que *Inteligencia & Ideas* se llene con Tipos variados (Tendencia/Competencia/Performance), que Amadeo los consuma en el briefing, que Luti los lea por chat, que brand-check gatee, que Cata arme el parte, y que una campaña aprobada baje a mostrador + digital. Medir tiempos y costo (modelos: mecánico→Haiku/Gemini, creativo/estratégico→Sonnet).

**Dependencias / riesgos conocidos:** Numa necesita acceso a métricas (CSV manual al inicio); Rocco depende de la calidad de las señales vía `/web` (sin Apify); `executionTimeout` y credenciales HTTP se setean por UI; respetar T2 (no proponer volumen masivo).
