# Organigrama de la agencia Dimanche

La agencia es **Anto (dueña del área) + un equipo de IA**. El equipo tiene un Director (estrategia) y un equipo operativo (ejecución). Todos los roles leen el mismo brand kit (`brand/`) y respetan el gate humano.

Estados: ✅ hecho · 🔨 armado ahora · ⚪ activable cuando haga falta.

## Dirección
| Rol | Qué hace | Estado | Dónde vive |
|---|---|---|---|
| **Director de Marketing** (Estratega) | Mano derecha estratégica de Anto. Propone foco, campañas, promos, ideas por período. Briefing semanal/mensual. | ✅ | `agentes-autonomos/briefing/` |

## Inteligencia (Radar — corre solo)
| Rol | Qué hace | Estado | Dónde vive |
|---|---|---|---|
| **Cazador de Virales** | Lo que está POR explotar (tipo Tim Payne); alerta urgente con ventana. | ✅ | `agentes-autonomos/cazador-virales/` |
| **Observatorio de contenido** | Investigación CONSTANTE: vigila fuentes marketineras (formatos, viralidad, algoritmo, food) y mantiene fresca la base. | ✅ | `agentes-autonomos/observatorio/` (+ `fuentes.md`) |
| **Tendencias (redes)** | A qué formatos/temas locales subirse. | ✅ | `agentes-autonomos/tendencias/` |
| **Tendencias Globales** | Referentes mundiales + Taste Tomorrow + fechas/drivers; mantiene la página Drivers. | ✅ | `agentes-autonomos/tendencias-globales/` |
| **Competencia** | Posicionamiento de marca vs el set local (no calidad); defender Villa Allende. | ✅ | `agentes-autonomos/competencia/` |
| **Performance** | Números vs KPIs (POL-016), incluye resultados de pauta. | ✅ | `agentes-autonomos/performance/` |

## Producción (crea las piezas)
| Rol | Qué hace | Estado | Dónde vive |
|---|---|---|---|
| **Productor de contenido** | Copy, guiones, hooks, naming. | ✅ | `agentes-ondemand/recetas/` |
| **Diseño / Media** | Imagen/video (Higgsfield/Gemini) + layout marca (Canva). | ✅ | `media/recetario.md` |

## Operaciones (hace que la máquina funcione cada día)
| Rol | Qué hace | Estado | Dónde vive |
|---|---|---|---|
| **Coordinador / Traffic** | Que nada se caiga: parte diario/semanal, pendientes, tomas, cadencia. | 🔨 | `agentes-autonomos/coordinacion/` |
| **Publicación / Distribución** | Deja cada pieza aprobada lista para publicar + checklist. | 🔨 | `agentes-ondemand/recetas/publicacion.md` |
| **Pauta / Paid media** | Plan de Meta/Google Ads, audiencias, presupuesto, seguimiento. Gate de Luciano antes de gastar. | 🔨 | `agentes-ondemand/recetas/pauta.md` |

## Activables (cuando haga falta — el sistema ya está listo para sumarlos)
| Rol | Qué haría | Estado |
|---|---|---|
| **Community manager** | Responder comentarios, DMs, reseñas Google en tono Dimanche (borradores que Anto aprueba). | ⚪ |
| **Atención / Encargos por redes** | Clasificar y responder ventas/encargos/quejas; rutear lo que no es MKT. | ⚪ |
| **Email / CRM** | Newsletter (1-2/mes) y difusiones WhatsApp (1/sem) — MAN-018. | ⚪ |
| **Influencers / UGC / Prensa** (earned) | Gestionar colaboraciones, repostear UGC, contactar prensa local. | ⚪ |
| **SEO / Google Business Profile** | Ficha de Google de cada local, fotos, reseñas, búsqueda local. | ⚪ |
| **Marca personal (Luciano)** | El fundador como cara pública. | ⚪ Fase 2 |

## Cómo se suma un rol nuevo (el sistema es extensible)
1. Definí si **corre solo** (autónomo → `agentes-autonomos/<rol>/PROMPT.md`, patrón radar) o es **a demanda** (receta → `agentes-ondemand/recetas/<rol>.md`).
2. Escribí su prompt/receta anclado al brand kit (`brand/`) y a los 5 filtros de POL-010.
3. Conectalo a la base Notion que corresponda (Inteligencia & Ideas, Calendario, Objetivos & Campañas, Activos).
4. Definí el **gate**: qué propone/produce solo y qué aprueba Luciano/Anto antes de salir.
5. Sumalo a este organigrama.

> Decímelo y lo armo. El esqueleto ya soporta todos estos roles sin rehacer nada.
