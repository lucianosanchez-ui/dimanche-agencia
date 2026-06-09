# Proceso de producción de contenido — Dimanche

> **Cómo se produce una pieza de contenido de Dimanche, de punta a punta.** El método YA está definido en las skills; este doc es el **mapa que las hilvana** para no volver a trabarnos ni reinventar. Última actualización: 2026-06-08.

## Regla #0: NO reinventar. Seguir el sistema.
Todo el criterio visual y de marca **ya está escrito** en las skills (abajo). El error a no repetir: improvisar prompts o atajos en vez de seguir el flujo. Si algo no sale, la respuesta casi siempre está en una reference que no leíste — **leela antes de inventar**.

## Los dos carriles (decidido 2026-06-08)
- **Claude Code = el PRODUCTOR.** Acá se producen las piezas de calidad (imágenes, video, campañas, guiones). Lo usan Luciano y Anto. Herramientas: Higgsfield + Nano Banana (hero) + **composición por código** (Satori/PIL, Remotion) + Adobe (retoque), dirigidas, con las skills. **Canva afuera.**
- **Luti (Telegram) = el ASISTENTE rápido.** Ideas, copys, hooks, tendencias, aprobar/archivar ideas, agendar, consultar la marca. **NO produce piezas** (imágenes/video). Eso se intentó (bot-productor con fal.ai) y se descartó: la calidad es trabajo dirigido, no automático. El bot-productor quedó archivado en n8n.
- **Notion** = base operativa común (Calendario, Inteligencia & Ideas, Documentos, Productos). Compartida; vos y Anto ven/editan lo mismo.

## El proceso, paso a paso (de pedido a "Propuesto")

**0 · Brief (refinar antes de producir).** Qué pieza, **formato** (`dimanche-formatos`), **pilar** POL-015, **buyer persona** REF-029 (Cande manda), **mensaje/canal**. Pedido vago → repreguntar, no producir cualquier cosa.

**1 · Foto base REAL (regla de oro).** Lo identificable (producto/local) **parte de una foto real**, nunca se inventa.
- Fuente buena: `06_Marketing/01_Fotos/Sesiones/Sesion_Principal/Fotos/` (la **sesión profesional** — las buenas). **NO** usar `01_Fotos/Editadas/` (flojas, "se nota la IA") salvo que no haya otra.
- O **foto del celu** del equipo. Si no alcanza, se pide una mejor. **Nada de sesiones nuevas** improvisadas.
- Para elegir sin abrir 50: **contact sheet** con `sips -Z 360` + PIL (no hay ImageMagick). Achicar antes de mirar (`sips -Z 1600`).

**2 · Escena / mejora con IA — solo si hace falta** (`dimanche-media`).
- Motor: **Higgsfield / Nano Banana** (vía MCP, créditos del plan). NO fal.ai (eso fue el atajo del bot que no llega).
- **Construir el prompt con el framework de 6 capas** (`framework-6-capas.md`) + las **recetas de toma** (`recetas-de-toma.md`). Inglés, cierre `editorial food photography, photorealistic, no text, no logo, no orange`. **Nunca un prompt improvisado.**
- **La foto real es referencia de PRODUCTO, no de fondo** (decidido 08/06): el banco real es mayormente azul/madera, así que **NUNCA** pidas "in the exact style/palette/lighting of the references" (esa frase arrastra el azul-base). `media_upload` → `medias: [{value, role:"image"}]` para que el **producto real entre intacto**, y **describí la escena premium en el prompt** (norte Villa Allende: mármol blanco/acero, luz aireada, objeto cobalto de firma con sentido). El producto se mantiene; el fondo lo construye el prompt. Ver `herramientas.md` §"Referencia desde Drive".
- **El producto real se COMPONE** (Nano Banana multi-referencia: escena + foto real del producto), **no se genera**. El logo igual (PNG real). Ver `postproduccion-y-realismo.md`.

**3 · Capa gráfica = la pieza, compuesta POR CÓDIGO** (`motor-de-composicion.md` + `design-system.md` + `foundations.md` + `components.md` + `templates.md`).
- **La pieza sale completa por código, lista para publicar, sin trabajo manual** (decidido 08/06): sobre el hero se componen **texto + logo + íconos + badge + acento azul** programáticamente, con Niveau embebida y los assets reales del Drive. **Canva queda AFUERA.** El texto **NUNCA lo escribe la IA** (lo pone el código, exacto) y **NUNCA se arma a mano**. Excepción: piezas sin capa gráfica (un mood/fondo/textura suelto) salen solo del hero. Detalle: `motor-de-composicion.md`.
- Anatomía: **lockup (ícono + titular Niveau) arriba · foto full-bleed · badge D abajo** (+ scrim para legibilidad). Adaptar por formato (`templates.md`).
- **Dos modos** (ver piezas reales en `06_Marketing/03_Piezas/Redes`): **(a) story** = ícono + titular + badge (CRIOLLOS, Historias); **(b) feed potente** = foto macro + **tipografía Display gigante** en cobalto, sin ícono. El modo feed-potente con Display gigante **es válido** (es una de las caras de marca); el **"Criollazos GIGANTE loud" fue overshoot** — el límite es premium = piso (ni de altar ni loud), no Display reventado.
- **Íconos:** los reales del Drive (`00_Marca/Elementos_Graficos`), **silueta plana rellena en cobalto** (sobre foto se usan en blanco), **no inventar** variantes ni recolorear a lo bruto. Nada de "línea fina".

**4 · Copy** (`dimanche-copy`): on-brand, tono POL-010, mensajes maestros REF-029. Sin marketinería, sin emojis.

**5 · Brand-check** (`dimanche-brand-check`): **toda pieza —también las fotos— pasa por acá.** 5 filtros POL-010 + identidad visual (paleta, sin naranja, sin texto-IA) + mensaje maestro. Marca qué falla y reescribe.

**6 · Propuesto** en Notion (gate humano de Luciano/Anto). Agendar con `dimanche-calendario`. Bajar al local con `dimanche-local` si aplica.

## Stack y rol de cada herramienta (`herramientas.md`)
| Para… | Herramienta |
|---|---|
| Escena / mood / fondo / textura · video · movimiento | **Higgsfield** (`generate_image`, `generate_video`, reframe) |
| Componer la foto real del producto en la escena · logo · texto correcto | **Nano Banana** (vía Higgsfield, multi-referencia) |
| Layout final con texto, logo, íconos y badge (la pieza completa) | **Motor por código** (Satori/PIL para estáticas, Remotion para video/TV; ver `motor-de-composicion.md`). **Canva afuera.** |
| Retoque / resize de foto real | **Adobe** (skills adobe-*) |

## Las skills que mandan (no reinventar)
`dimanche-mkt` (orquestador) → `dimanche-media` (visual: 6 capas, recetas, herramientas, sistema-visual, design-system, foundations, components, templates, realismo, marcas-referencia) · `dimanche-copy` · `dimanche-guion` (video) · `dimanche-formatos` (por formato) · `dimanche-brand-check` (valida) · `dimanche-local` (al mostrador) · `dimanche-calendario` · `dimanche-campana`.

## El estándar (a igualar)
Las piezas reales en `06_Marketing/03_Piezas/Redes` (CRIOLLOS, MEDIALUNAS, HAY PAN, las 13 Historias) y las que aprueba Luciano (Criollazos, packaging). El salto de calidad está en **la foto** (macro, luz, packaging branded) + **tipografía potente** + **seguir el sistema**, no en componer apurado sobre una foto floja.

## Por qué nos trabamos (2026-06-07/08) — para no repetirlo
Se intentó **automatizar la producción por Telegram** (bot con fal.ai + prompts improvisados) en vez de seguir el **flujo dirigido en Claude Code que ya funcionaba** (Higgsfield + Nano Banana + Canva + referencias del Drive + 6 capas). Resultado: piezas genéricas, lejos del estándar. **Lección: el método ya existe — seguirlo, no reinventarlo; y la producción de calidad es dirigida (Claude Code), no automática (Telegram).**
