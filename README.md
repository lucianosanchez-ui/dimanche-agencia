# Agencia de Marketing Dimanche (semiautomática)

Sistema para que Dimanche tenga una **agencia de marketing propia, proactiva, operada por Anto + IA**, fiel al brand foundation cerrado en Notion. La IA hace el laburo pesado (investigar, proponer, producir); **Luciano y Anto dirigen y aprueban**. Eso es el "semi".

## Cómo está organizada (como una agencia)

**Anto es la dueña del área. La IA es su equipo.** Organigrama completo en `ROLES.md`.

- **Director de Marketing** (estrategia) — mano derecha de Anto: propone foco, campañas, promos, pauta, ideas. → `agentes-autonomos/briefing/`
- **Equipo operativo** (ejecución del día a día):
  - **Productor** — copy, guiones, hooks, naming, media. → `agentes-ondemand/`
  - **Coordinador / traffic** — que nada se caiga (parte diario/semanal). → `agentes-autonomos/coordinacion/`
  - **Publicación** — deja cada pieza aprobada lista para publicar. → `agentes-ondemand/recetas/publicacion.md`
  - **Pauta** — plan de Meta/Google Ads, gate de Luciano antes de gastar. → `agentes-ondemand/recetas/pauta.md`
- **Radar** (inteligencia, corre solo) — tendencias, competencia, performance. → `agentes-autonomos/`
- **Activables** (community, encargos, email/CRM, prensa, SEO, marca personal) — listos para sumar cuando haga falta. Ver `ROLES.md`.

## Mapa de carpetas

- **`brand/`** — kit de marca derivado de Notion (Brand Book + contexto). Fuente única para los agentes y NotebookLM. No editar a mano.
- **`scripts/export_brand.py`** — refresca `brand/` desde Notion.
- **`agentes-autonomos/`** — prompts + diseño n8n de los agentes que corren solos.
- **`agentes-ondemand/`** — instrucciones + recetas del proyecto Claude Teams.
- **`media/recetario.md`** — qué herramienta para qué formato + brand kit Canva.

## La mesa de trabajo (Notion)

Página madre: **Agencia de Marketing Dimanche** → https://www.notion.so/3735616e313d8180a8b4ebab3c762635

| Base | Para qué |
|---|---|
| [Objetivos & Campañas](https://www.notion.so/19d1c9a7cc15451ea3ed4e3943689ee1) | el plan por período (con las 6 campañas anuales ya cargadas) |
| [Calendario de contenido](https://www.notion.so/e8e77d3788414db6811a9c77e463bff1) | las piezas, de la idea al publicado (gate Propuesto→Aprobado) |
| [Inteligencia & Ideas](https://www.notion.so/f8f5e2fb4359435e922c1f8d401625fe) | lo que trae el Radar + ideas del Estratega |
| [Activos a producir](https://www.notion.so/4716cbfe3f814f1daec2e45a37847508) | fotos/videos reales que el sistema pide al equipo |

## Cómo opera el equipo (flujo MAN-018)

1. El **Estratega** propone el plan del período (campañas/promos) → quedan **Propuesto**.
2. **Luciano aprueba o ajusta** (el gate).
3. **Productor** (Claude Teams) baja el plan a piezas: copy, guiones, hooks, media. Pide tomas reales si hacen falta.
4. Cada pieza entra al **Calendario** como **Propuesto** → Luciano/Anto aprueban → **Aprobado**.
5. **Anto** programa y publica lo aprobado (Meta Business Suite / Metricool).
6. Fin de mes: el agente **Performance** reporta vs KPIs → alimenta el próximo Briefing.

> **Regla T2:** mientras la experiencia en mostrador sea despareja, **bajo volumen / alta calidad**. No escalar comunicación masiva todavía.

## Estado

**✅ Hecho (por Claude, vía MCP):**
- Las 4 bases de Notion creadas, con campañas anuales y opciones (pilares, personas) pre-cargadas.
- `brand/` con Brand Book + contexto + exportador.
- Recetas on-demand + instrucciones del proyecto Claude Teams.
- Prompts de los 4 agentes autónomos + diseño de los workflows n8n.
- Recetario de media.

**🔧 Pendiente (tuyo — requiere apps / no hay API):** ver `SETUP.md`.
