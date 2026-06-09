---
name: dimanche-media
description: Producción visual on-brand de Dimanche con IA — imágenes y videos consistentes, coherentes y realistas (NO "genéricos de IA"), siguiendo el sistema del Branded AI Guide (framework de prompts de 6 capas, recetas de toma, realismo anti-look-IA) sobre el stack real de Dimanche (Higgsfield, Nano Banana para el hero; Satori/PIL y Remotion para la capa gráfica por código) y respetando la regla visual de oro. Usá SIEMPRE que se pida una foto, imagen, video, reel, mood, fondo, escena o textura para Dimanche; cuando haya que escribir un prompt de imagen/video; cuando se mencione Higgsfield, Nano Banana, Midjourney, Sora o Canva para generar visuales; o cuando algo "se vea muy hecho con IA" y haya que hacerlo realista y de marca.
---

# dimanche-media — Producción visual on-brand (sistema Branded AI)

Generás imágenes y videos de Dimanche que se ven **de la marca, no genéricos de IA**.

**Principio rector:** la IA no es tu socia creativa, es tu **traductora creativa**. Vos traés el concepto, la visión de marca y el entendimiento del público; la IA te da la capacidad técnica de materializarlo. El error #1 —el que produce las imágenes sin alma, intercambiables, "de cualquier marca de internet"— es pedirle "algo lindo rápido" sin concepto, sin dirección. Antes de escribir un prompt, **tené la imagen final clara en la cabeza** y describila con el detalle con que lo haría un fotógrafo o un director de arte.

## ⛔ Regla visual de oro (no negociable) — y cómo usar el poder de la IA igual

**La IA SIEMPRE parte de algo REAL — nunca inventa de cero.** No es "IA para nada identificable"; es **anclar todo a una base real**:
- Para cualquier pieza con producto/local/equipo: tomá de BASE una **referencia real** — una **foto nuestra** (Drive `06_Marketing/01_Fotos`, packaging en `04_Packaging`) o **pedí una foto rápida del celu** al equipo/Luciano — y la IA **mejora, ambienta, extiende y le pone movimiento** sobre esa base (estilo, fondo, luz, composición).
- **No fabriques un producto que no existe.** Si no hay base real ni se puede sacar una foto, no lo generes: pedila.
- **Logo, texto, íconos y badge los compone CÓDIGO** (Satori/PIL para estáticas, Remotion para video/TV), con Niveau embebida y los PNG/íconos reales del Drive en posición/tamaño exactos. La IA **no** escribe el texto y **no** se arma a mano: la pieza sale completa y lista para publicar. Ver `references/motor-de-composicion.md`. (Canva queda afuera de todo.)
- **Sin emojis. Sin naranja.** Paleta `#3559E0` azul / `#E9E3D9` crema.

> **Flujo estrella:** referencia real (Drive o foto del celu) → la IA arma el hero/escena premium en tu estética → componés logo + texto → (opcional) movimiento sutil. Ej. probado: croissants hero generados anclados a fotos reales = premium y on-brand, muy por encima de las fotos viejas.

## La estética Dimanche es ESPECÍFICA — norte canónico en `sistema-visual-dimanche.md`
El look de Dimanche **no** es "panadería beige hogareña" genérica, **ni "fondo azul cobalto en los 2/3" como en la versión vieja** (ese look quedó solo para placas/slides con texto encima). Norte vigente (2026-06-07): **limpio, prolijo y premium estilo Villa Allende** (blanco, acero inox, mármol/granito) con **disciplina de color** cobalto/crema, la **firma cobalto POR FORMATO y con sentido** (objeto cobalto real con motivo en fotos de mesa/ritual de reel/story; azul en la capa gráfica —titular/badge/acento— en feed/placas; nunca decorativo random ni inventado por IA), y un **dial de calidez** que sube en reel/story y baja (premium) en feed. **El detalle completo (norte, mundo visual, realismo, playbooks) está en `references/sistema-visual-dimanche.md` — leelo primero; manda sobre cualquier nota genérica vieja.** Generar "de memoria" da off-brand: siempre referenciá fotos reales.

**Premium = PISO, no techo (2026-06-08).** Lo premium es la identidad-base: accesible, con gente y vida; **ni distante / de altar ni "loud"**. Premium en la **marca y la terminación**, accesible en el **trato** (así reconcilia el brand-book —"no es premium"— con el contexto —"premium accesible"—). Calibre: "menos precious", el clásico sobrio; el museo (plato fino + luz dramática) fue **demasiado** y el "Criollazos" gigante fue **overshoot loud**. Sí vale el modo "feed potente con Display grande"; lo que NO va es el loud espantoso.

**Regla (decidido 2026-06-08): la foto real aporta el PRODUCTO; el FONDO/escena premium lo construye el PROMPT.** El banco real de Dimanche (incluida la sesión profesional) es mayormente **azul cobalto o madera cálida** — NO el norte premium blanco/mármol/acero. Por eso **NO uses las fotos como "style-ref" del fondo**: arrastran el azul/madera y la salida vuelve al **azul-base genérico** que Luciano rechaza. En cambio: pasá la foto real como **referencia de PRODUCTO** (Nano Banana, role `image`) para mantener el producto intacto (regla de oro), y **describí el entorno premium en el prompt** según `references/sistema-visual-dimanche.md` (blanco/mármol/acero, luz limpia y aireada, objeto cobalto de firma) — **nunca** "fondo azul" ni "exact style of the references". Las fotos buenas (para el producto) están en `…/06_Marketing/01_Fotos/Sesiones/Sesion_Principal/Fotos/` (197 `_JFZ*.JPG`, la sesión profesional) — **NO** `01_Fotos/Editadas/` (`pic-*.jpg`, slides viejas flojas). **El path del montaje depende de la cuenta/máquina** (`~/Library/CloudStorage/GoogleDrive-<cuenta-con-acceso>/Mi unidad/...`) — resolvelo como explica `references/herramientas.md`. Workflow concreto en `references/herramientas.md` → "Referencia desde Drive".

> **Atajo clave:** el contenido real de Dimanche NO es hero de IA — muchas piezas se resuelven mejor con **foto real buena (Sesion_Principal o foto del celu) + capa gráfica de marca compuesta POR CÓDIGO, sin IA** (ícono + titular Niveau + badge "D"; ver `references/motor-de-composicion.md`, `references/sistema-visual-dimanche.md` y `references/design-system.md`). La generación con referencia es para escenas/variantes que no tenés fotografiadas. **OJO:** las viejas slides "producto sobre fondo azul con el azul de arriba libre para texto" (`Editadas/`) son el look descartado — no las uses de molde.

## Antes de generar: cargá el criterio

- **`references/sistema-visual-dimanche.md` — norte visual canónico (V1, 2026-06-07): identidad, dial por formato, mundo visual, realismo, playbooks. EMPEZÁ POR ACÁ.**
- `brand/20-brand-visual-kit.md` — vocabulario visual, paleta, luz, tipos de toma, framework de 6 capas de Dimanche.
- `brand/00-brand-book.md` — qué es Dimanche, qué NO es. `brand/10-contexto-negocio.md` — negocio y buyer personas.
- Si dudás del visual oficial: REF-002 y REF-030 en Notion (DB Documentos).
- **`references/higgsfield-arsenal.md` — TODO lo que Higgsfield puede hacer y CUÁNDO usar cada cosa (video = Kling 3.0; "angles"/variar tomas = edición Nano Banana/Seedream; íconos/packaging = Recraft; reframe; upscale; virality). Mapa vivo: revisalo y sumá lo nuevo (Higgsfield cambia casi a diario).**
- **Video: cuando se pide un video, el default es Kling 3.0 (`mode:pro`) desde una FOTO REAL, movimiento sutil, producto intacto. Ver el flujo en `higgsfield-arsenal.md`.**

## El proceso — de la idea a la pieza publicada

1. **Diagnosticá qué es real y qué es IA.** Separá la pieza en: lo identificable (→ foto real) y lo genérico (→ IA). Si lo central es el producto/local real y no hay foto, **pará y pedí la toma** — no la inventes.
2. **Definí el concepto** (qué tipo de toma del catálogo: *food studio, product in context, flat lay, cozy interior, golden hour, macro/texture, brand mood*). Tené la imagen clara antes de escribir.
3. **Construí el prompt en 6 capas, en inglés** (rinde mucho mejor; la IA fue entrenada con esa terminología). Ver `references/framework-6-capas.md`. Anclá la paleta y el mood Dimanche (warm, homey, domingo, antojable).
4. **Producí** con la herramienta correcta (ver `references/herramientas.md`). Por defecto **Higgsfield** (`generate_image` / `generate_video`, `reframe` 9:16/1:1). Para video, empezá SIEMPRE por una imagen base.
5. **Componé el producto real en el hero:** meté la foto real del producto con **Nano Banana** (vía Higgsfield) como referencia de **producto** (role `image`), manteniéndolo intacto. Indicá posición, ángulo y tamaño exactos; el fondo premium lo dicta el prompt, nunca el estilo de la foto.
6. **Hacelo realista** (que no se note "IA"): ver `references/postproduccion-y-realismo.md`.
7. **Pasá por `dimanche-brand-check`** (tono, paleta, regla de oro, prohibidos).
8. **Armá la pieza final POR CÓDIGO** (Satori/PIL para estáticas, Remotion para video/TV): texto + logo + íconos + badge + acento cobalto compuestos sobre el hero, con Niveau embebida y los assets reales del Drive — **el texto nunca lo escribe la IA ni se arma a mano**, y Canva queda afuera. Ver `references/motor-de-composicion.md`. Sale **completa y lista para publicar**; nace **Propuesto** (gate humano).

> Para video corto/hook, podés puntuar con `virality_predictor` de Higgsfield antes de finalizar.

## Las 6 capas del prompt (el esqueleto)

Orden acumulativo: cada capa refina la anterior.

1. **Concepto** — qué tipo de imagen (food studio, product hero, flat lay, cozy interior…).
2. **Motivo** — el protagonista y todos sus atributos (forma, material, estado; si hay persona: pose, ropa, pelo, gesto).
3. **Colores & materiales** — temperatura, armonía, paleta Dimanche, cómo el material reacciona a la luz.
4. **Composición** — encuadre, regla de tercios, capas de profundidad (foreground/middle/background), espacio negativo.
5. **Luz & ambiente** — la base del fotorrealismo: tipo de luz, dirección, sombras, cómo la luz toca la superficie.
6. **Cámara & lente** — "el filtro de un millón de dólares": cuerpo, lente (mm), apertura (f/), profundidad de campo.

Catálogos completos de keywords (verbatim en inglés) + plantilla de ensamblaje → **`references/framework-6-capas.md`**.

## Qué herramienta para qué (stack Dimanche)

| Necesidad | Herramienta | Nota |
|---|---|---|
| Escena/mood/fondo/textura IA | **Higgsfield** (`generate_image`) | Tu stack principal (836 créditos). Mobile-first, fácil. |
| Meter foto real de producto en escena / logo / texto correcto | **Nano Banana** (vía Higgsfield) | Multi-referencia precisa; consistencia de objeto/texto. **Clave para la regla de oro.** |
| Video corto, movimiento de producto/cámara, humito | **Higgsfield i2v — Kling 3.0 (`pro`)** por default (ganó el test 08/06) | Empezá SIEMPRE por una **foto real**. Ver `references/higgsfield-arsenal.md`. |
| Variar tomas/ángulos desde 1 foto · cambiar fondo | **Higgsfield edición** (Nano Banana Pro / Seedream) | "Angles": mismo producto, otro ángulo, sin sesión nueva. |
| Íconos / mockups de packaging on-brand | **Recraft 4.1** (vector/utility, paleta #hex) | Para los elementos gráficos. |
| Pieza final con texto + logo + íconos + badge (post, story, carrusel, cartel, placa) | **Motor por código** — **Satori/PIL** (estáticas), **Remotion** (video/TV) | Compone la capa gráfica sobre el hero, Niveau embebida, assets reales del Drive. Texto/logo nunca IA ni a mano. **Canva afuera.** Ver `references/motor-de-composicion.md`. |
| Retoque/resize de foto real por plataforma | **Adobe** | Sobre material real. |
| Loops / texto-a-video | Sora (opcional) | Bueno para loops. |
| Estética artística muy entrenada (opcional) | Midjourney | Si se suma; no está en el stack base. |

Detalle de cada herramienta, costos y técnicas de consistencia → **`references/herramientas.md`**.

## Recetas de toma (puntos de partida, no para copiar literal)

Cada tipo tiene un patrón fijo: **lente + apertura concretos · plano · capas de profundidad (qué está nítido / qué borroso) · dirección y calidad de luz · paleta explícita · mood al cierre.** Tipos: **toma de modelo · de producto · de producto 3D/render · de escena · de textura.** Prompts modelo (verbatim) + versiones adaptadas a panadería/food → **`references/recetas-de-toma.md`**.

## Pantallas de TV en local (digital signage)
Para los TV de los locales seguí el **playbook de patrones QSR** (Starbucks / McDonald's / Mostaza): qué mostrar, dwell time, jerarquía tipográfica, contraste, **movimiento sutil**, dayparting (desayuno/almuerzo/merienda) → **`references/pantallas-tv-local.md`**. Resumen de producción:
- **Hero:** si las fotos reales no están a la altura (viejas/flojas), generá un **hero NUEVO premium describiendo la escena por prompt** (norte Villa Allende), con la foto real solo como **referencia de PRODUCTO** — **NO** "anclado al estilo" de las refs (arrastra el azul/madera). Alta resolución (2k/4k).
- **Layout:** 1 mensaje por placa, texto grande y legible a 4 m, logo real fijo, foto a sangre con overlay; el azul firma en la **capa gráfica** (titular/badge/acento), no como objeto físico forzado. Componé **por código** (Remotion para el loop con movimiento, Satori/PIL para placa estática) — texto/logo/íconos nunca los pone la IA ni se arman a mano; Canva afuera. Ver `references/motor-de-composicion.md`.
- **Movimiento (opcional, queda muy bien):** Higgsfield **seedance_2_0** image→video desde el hero → vapor sutil + push-in lento, 5 s, 1080p, easing, loop. Nada que distraiga.
- **Loop:** 50-72 s, 5-8 placas, 16:9 1080p/4K.

## Que no se vea "hecho con IA" (realismo)

Lo que separa tus resultados de las imágenes genéricas: **imperfección y textura real.** Romper la perfección plástica (`unusual looking`, poros visibles, vello facial que atrapa la luz, asimetrías), nombrar un lente real, describir cómo la luz penetra la piel/la miga/la corteza. Detalle + manejo de logos + errores frecuentes y cómo resolverlos → **`references/postproduccion-y-realismo.md`**.

## Consistencia entre piezas (que toda la cuenta se vea de la misma marca)

No generes prompts sueltos: construí un **sistema**. Moodboard de marca, un "vocabulario" reutilizable, referencias de personaje/producto (Higgsfield Character-Model / Nano Banana multi-reference), y `seed` para reproducir. Cómo → `references/herramientas.md` (sección Consistencia).

**Marcas de referencia** (qué robar / qué no, p. ej. Levain Bakery — su azul valida el nuestro — y Donutelier) → `references/marcas-referencia.md`.

## Diagnóstico y vocabulario de marca

Para definir o auditar la base visual antes de producir a escala: el **Brand Vocabulary Builder** y el **Brand AI-Readiness Check** (20 preguntas) → **`references/vocabulario-y-readiness.md`**.

## Plantilla rápida (copiar y completar, en inglés)

```
[content type] of [motivo + detalle real, paleta Dimanche cobalto/crema], [posición], [composición + capas de profundidad + negative space], [luz limpia y aireada (feed) o cálida de mañana (reel/story) + dirección; entorno premium Villa Allende: mármol blanco / acero inox], shot on [lente + f/], editorial food photography, photorealistic, no text, no logo, no orange.
```
Después: componé el producto real en el hero (Nano Banana, role `image`) → realismo → brand-check → **capa gráfica final por código** (Satori/PIL o Remotion; texto/logo/íconos nunca IA ni a mano, Canva afuera — ver `references/motor-de-composicion.md`). Ejemplo desarrollado en `brand/20-brand-visual-kit.md` y en `references/recetas-de-toma.md`.
