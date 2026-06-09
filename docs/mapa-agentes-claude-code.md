# Mapa de agentes n8n ↔ Claude Code — la inteligencia que se deposita en Notion

> **Para qué es este doc.** Cuando se produce en **Claude Code** (campañas, calendario, media, guiones), las skills tienen que **leer lo que los agentes autónomos de n8n ya descubrieron** y dejaron en Notion. Sin esto, el taller produce a ciegas — ignora tendencias, performance, competencia, virales y clima que el sistema YA juntó. Este doc dice **qué hace cada agente, QUÉ deposita y DÓNDE**, con los IDs exactos de Notion para que el orquestador (`dimanche-mkt`) los consulte al arrancar cualquier producción.
>
> **Fuente de los IDs:** `ESTADO.md` (sección "IDs clave") + `agentes-autonomos/README.md`. **No inventar IDs** — si falta uno, buscarlo ahí o con `notion-search`.

---

## 1. El circuito en una frase

Los **6 agentes de inteligencia** corren solos (cron, lunes temprano escalonado) y **depositan hallazgos en la DB `Inteligencia & Ideas`** (estado `Nuevo`). **Amadeo** (briefing) y **Cata** (parte diario) consolidan; **Luti** (bot Telegram) los lee a demanda. **Claude Code NO estaba enganchado a ese depósito** — este doc cierra ese hueco: el orquestador consulta `Inteligencia & Ideas` + `Calendario` antes de producir.

```
Lola · Mateo · Numa · Vera · Rocco · (Clima)  ──cron──►  DB Inteligencia & Ideas (Estado=Nuevo)
                                                                    │
                       Amadeo (briefing lunes) ──► grupo Telegram   │
                       Cata (parte diario)      ──► grupo Telegram   ├──►  Claude Code (skills) lo lee
                       Luti (bot)               ──► chat            │      como insumo del brief
                                                                    │
                       (Calendario de contenido: piezas próximas) ──┘
```

---

## 2. Los agentes — qué deposita cada uno y DÓNDE

> **Cadencia real (post-sesión 8):** los de inteligencia reagrupados al **lunes temprano, escalonados** (instancia n8n en UTC): Numa 05:00 · Vera 06:00 (quincenal) · Mateo 07:00 · Lola 08:00 · Rocco 09:00 (diario). El **briefing de Amadeo** corre lunes 11:00 UTC (=8am ART) y los consolida frescos. **Cata** diario 12:00 UTC (9am ART). **Clima** diario 09:00 UTC (6am ART). Ver `ESTADO.md` para los workflow-IDs vivos.

| Agente | Rol (1 frase) | Cadencia | QUÉ deposita | DÓNDE (DB) | Cómo lo distingo al leer |
|---|---|---|---|---|---|
| **Amadeo** (briefing/estratega) | Propuesta de foco del período; consolida la semana | Lunes 8am ART + día 1 del mes | NO escribe en Inteligencia & Ideas. **Briefing → grupo Telegram**; campañas nuevas → **Objetivos & Campañas** (Propuesto) | Telegram + `Objetivos & Campañas` | — (lee, no deposita ideas) |
| **Lola** (radar tendencias) | Tendencias de contenido + pulso local Córdoba × clima × agenda | Lunes ~08:00 UTC | ideas accionables (oportunidad + acción sugerida + pilar) | `Inteligencia & Ideas` | `Tipo = Tendencia` |
| **Mateo** (observatorio + tendencias globales) | Qué contenido funciona (formatos/algoritmo/food) + referentes mundiales (Taste Tomorrow) | Lunes ~07:00 UTC | accionable de formato/global; mantiene la base de `dimanche-formatos` | `Inteligencia & Ideas` | `Tipo = Tendencia` |
| **Numa** (performance) | Números vs KPIs (POL-016): qué funcionó, qué cortar, qué probar | Lunes ~05:00 UTC | digest de performance + recomendaciones | `Inteligencia & Ideas` | `Tipo = Performance` |
| **Vera** (competencia) | Panaderías Córdoba en clave marca/alcance (no calidad); defiende Villa Allende | Lunes ~06:00 UTC (quincenal) | lectura de competencia + oportunidad para Dimanche | `Inteligencia & Ideas` | `Tipo = Competencia` |
| **Rocco** (cazador de virales) | Oportunidades calientes con ventana abierta (newsjacking, tipo Tim Payne) | Diario ~09:00 UTC | viral emergente + ventana + ángulo on-brand; **+ push al grupo** si Prioridad Alta | `Inteligencia & Ideas` | `Tipo = Tendencia`, `Prioridad = Alta` |
| **Cata** (coordinador) | Que nada se caiga: piezas a tiempo, aprobaciones, tomas, cadencia | Diario 9am ART + lunes | NO escribe ideas. **Parte operativo → grupo Telegram**; marca trabados en Notion | Telegram + (marca en Calendario) | — (lee, no deposita ideas) |
| **Clima** (Open-Meteo, no es agente Claude) | Pronóstico de los 3 locales con ángulo "clima → calentito"; **anti-spam** (solo si hay algo accionable) | Diario 6am ART | aviso al grupo (NO escribe en Notion hoy) | Telegram | — (no deposita en Notion) |
| **Luti** (bot Telegram) | Cara reactiva; consultás a cualquiera por chat | Reactivo | responde en el grupo; aprueba/archiva ideas y agrega al Calendario (gate) | lee/escribe Inteligencia & Ideas + Calendario | — |

**Lectura para el taller:** lo que importa para Claude Code está en **`Inteligencia & Ideas`** (lo que depositan Lola, Mateo, Numa, Vera, Rocco) y en **`Calendario de contenido`** (lo planificado para los próximos días). Amadeo/Cata/Clima salen por Telegram y NO hace falta leerlos por API.

**Campos de `Inteligencia & Ideas`** (para parsear al leer): `Título`(title) · **`Tipo`**(select: Tendencia/Competencia/Performance/Idea) · `Oportunidad`(text) · `Acción sugerida`(text) · `Pilar`(select: los 6 de POL-015) · **`Prioridad`**(select: Alta/Media/Baja) · `Buyer persona`(select: Juan Pablo/Cande/Analía/Todos) · **`Estado`**(select: Nuevo/En revisión/Accionado/Archivado) · `Fuente`(url) · `Fecha`(date).

---

## 3. Mapa de IDs de Notion (verificado)

> ⚠️ **Dos IDs por DB.** En Notion cada base tiene **(a) data-source / collection id** y **(b) page-id**. El nodo Notion de n8n usa el **page-id** (la API REST rechaza el collection-id con 404). El **MCP Notion** (`notion-fetch`/`notion-search`) acepta el page-id directo, o el data-source vía prefijo `collection://<data-source-id>`. Por eso conviene tener los dos a mano.

| Base | Data-source (collection) | Page-id (lo usa n8n y sirve para `notion-fetch`) |
|---|---|---|
| **Inteligencia & Ideas** | `2a3d57ca-7585-4e85-ab2e-eb0f4225790f` | `f8f5e2fb4359435e922c1f8d401625fe` |
| **Calendario de contenido** | `3d326521-b346-46ab-9bfd-141475b44fd5` | `e8e77d3788414db6811a9c77e463bff1` |
| **Objetivos & Campañas** | `9603f67e-0647-49d3-85e9-eda7454cf6d5` | `19d1c9a7cc15451ea3ed4e3943689ee1` |
| **Activos a producir** | `b032f2bc-0864-4d55-837b-81b8bb10eea4` | `4716cbfe3f814f1daec2e45a37847508` |
| **Memoria & Aprendizajes** | `63e720f6-4942-48c2-965b-f5df8e08d93f` | `937b1f75-812b-4252-b24f-405e8e976271` |
| **Documentos (fuente marca)** | `d508a305-c1d5-4c27-901c-38903c2e8ff8` | `dfa48c46-1027-4b84-84aa-72f86dc4892c` |
| **Productos** | `ef5aaa1f-f186-4cc8-94c5-0730df86bb44` | — (ver `ESTADO.md`) |

**Teamspace Dimanche:** `3655616e-313d-8127-89a6-004279baed6c`.

### ✅ El "conflicto" de IDs del Calendario está RESUELTO (no era bug)
`ESTADO.md` (sesión 9, auditoría) anotó: *"este ESTADO lista Calendario `3d326521…` pero el tool live de Luti usaría `e8e77d37…` → verificar cuál es el real"*. **Verificado contra `agentes-autonomos/README.md` (línea 30): NO es un conflicto — son las dos caras de la MISMA base:**
- `3d326521-b346-46ab-9bfd-141475b44fd5` = **data-source / collection** del Calendario.
- `e8e77d3788414db6811a9c77e463bff1` = **page-id** del Calendario (el que usa el nodo Notion de n8n y el tool de Luti, y el que va en `notion-fetch`).

Es exactamente el mismo patrón documentado para Inteligencia & Ideas (`2a3d57ca…` data-source / `f8f5e2fb…` page-id) y en la nota de `ESTADO.md` línea 251 ("los nodos Notion usan el page-id de la base, NO el collection-id"). **Regla para Claude Code:** para `notion-fetch` usá el **page-id** (`e8e77d37…`); si pasás data-source a `notion-search`, usá `collection://3d326521…`.

---

## 4. Cómo lo consume Claude Code (el enganche que faltaba)

Al arrancar **cualquier producción** (campaña, calendario, media, guion), el orquestador `dimanche-mkt` debe, **antes de armar el brief**:

1. **Leer `Inteligencia & Ideas` filtrando `Estado` ∈ {Nuevo, En revisión}** (vía MCP Notion):
   - `notion-fetch` con `id: f8f5e2fb4359435e922c1f8d401625fe` (page-id) para ver el contenido reciente, **o**
   - `notion-search` con `data_source_url: collection://2a3d57ca-7585-4e85-ab2e-eb0f4225790f` + `query` del tema/fecha que se va a producir.
   - Separar por `Tipo`: Tendencia (Lola/Mateo/Rocco) · Performance (Numa) · Competencia (Vera). Priorizar `Prioridad = Alta` y lo más reciente por `Fecha`.
2. **Leer el `Calendario` de los próximos días** para no pisar lo ya planificado/publicado:
   - `notion-fetch` con `id: e8e77d3788414db6811a9c77e463bff1` (page-id del Calendario).
3. **Usar esa inteligencia como insumo del brief**: tendencias a las que subirse, qué performó (replicar/cortar), qué hace la competencia (diferenciarse), virales con ventana abierta, y el clima si vino por el grupo. **No reemplaza** la base de marca (`brand/` + Notion POL/REF) — la complementa.

**Importante (gate y costos):** leer es seguro. Lo producido sigue naciendo **Propuesto** (gate humano). No volcar el JSON crudo de Notion al razonamiento — quedarse con `Título`/`Tipo`/`Oportunidad`/`Acción sugerida`/`Prioridad`/`Fecha` de las entradas relevantes (mismo criterio anti-quema de tokens que rige a los agentes n8n).

---

## 5. Notas / pendientes

- **`Estado` que se lee:** los agentes depositan en `Nuevo`. Cuando algo se trabaja, pasa a `En revisión` y luego `Accionado`/`Archivado` (Luti lo mueve desde el chat). El taller lee **Nuevo + En revisión** (lo accionado/archivado ya se usó o se descartó).
- **Cata/Amadeo/Clima salen por Telegram**, no por Notion → no son lectura de API para el taller. Si hiciera falta el briefing en texto, vive en el grupo "Agencia Mkt".
- **Handoff Telegram → taller (hueco abierto, ESTADO sesión 9):** Luti deriva "al taller" pero no deja brief anotado en Notion. Cuando se cablee el tool de Luti que persiste el pedido+brief, conviene que escriba en `Inteligencia & Ideas` (`Tipo = Idea`) o en `Calendario` para que Claude Code lo levante igual que el resto.
- **Si el `getAll` nativo de n8n se cuelga** con estas DBs (memoria `n8n-notion-getall-hang`), eso es de n8n; el **MCP Notion en Claude Code es otra vía** (`notion-fetch`/`notion-search`) y no tiene ese problema.
</content>
</invoke>
