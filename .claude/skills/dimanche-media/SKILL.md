---
name: dimanche-media
description: Producción visual on-brand de Dimanche con IA — imágenes y videos consistentes, coherentes y realistas (NO "genéricos de IA"), siguiendo el sistema del Branded AI Guide (framework de prompts de 6 capas, recetas de toma, realismo anti-look-IA) sobre el stack real de Dimanche (Higgsfield, Nano Banana, Canva, Adobe) y respetando la regla visual de oro. Usá SIEMPRE que se pida una foto, imagen, video, reel, mood, fondo, escena o textura para Dimanche; cuando haya que escribir un prompt de imagen/video; cuando se mencione Higgsfield, Nano Banana, Midjourney, Sora o Canva para generar visuales; o cuando algo "se vea muy hecho con IA" y haya que hacerlo realista y de marca.
---

# dimanche-media — Producción visual on-brand (sistema Branded AI)

Generás imágenes y videos de Dimanche que se ven **de la marca, no genéricos de IA**.

**Principio rector:** la IA no es tu socia creativa, es tu **traductora creativa**. Vos traés el concepto, la visión de marca y el entendimiento del público; la IA te da la capacidad técnica de materializarlo. El error #1 —el que produce las imágenes sin alma, intercambiables, "de cualquier marca de internet"— es pedirle "algo lindo rápido" sin concepto, sin dirección. Antes de escribir un prompt, **tené la imagen final clara en la cabeza** y describila con el detalle con que lo haría un fotógrafo o un director de arte.

## ⛔ Regla visual de oro (no negociable) — y cómo usar el poder de la IA igual

**La IA SIEMPRE parte de algo REAL — nunca inventa de cero.** No es "IA para nada identificable"; es **anclar todo a una base real**:
- Para cualquier pieza con producto/local/equipo: tomá de BASE una **referencia real** — una **foto nuestra** (Drive `06_Marketing/01_Fotos`, packaging en `04_Packaging`) o **pedí una foto rápida del celu** al equipo/Luciano — y la IA **mejora, ambienta, extiende y le pone movimiento** sobre esa base (estilo, fondo, luz, composición).
- **No fabriques un producto que no existe.** Si no hay base real ni se puede sacar una foto, no lo generes: pedila.
- **Logo y texto a mano** (Canva con brand kit "Dimanche" / Niveau Grotesk, o Nano Banana con el PNG y posición/tamaño exactos). La IA no escribe el texto.
- **Sin emojis. Sin naranja.** Paleta `#3559E0` azul / `#E9E3D9` crema.

> **Flujo estrella:** referencia real (Drive o foto del celu) → la IA arma el hero/escena premium en tu estética → componés logo + texto → (opcional) movimiento sutil. Ej. probado: croissants hero generados anclados a fotos reales = premium y on-brand, muy por encima de las fotos viejas.

## La estética Dimanche es ESPECÍFICA — norte canónico en `sistema-visual-dimanche.md`
El look de Dimanche **no** es "panadería beige hogareña" genérica, **ni "fondo azul cobalto en los 2/3" como en la versión vieja** (ese look quedó solo para placas/slides con texto encima). Norte vigente (2026-06-07): **limpio, prolijo y premium estilo Villa Allende** (blanco, acero inox, mármol/granito) con **disciplina de color** cobalto/crema, un **objeto cobalto real** que firma cada toma, y un **dial de calidez** que sube en reel/story y baja (premium) en feed. **El detalle completo (norte, mundo visual, realismo, playbooks) está en `references/sistema-visual-dimanche.md` — leelo primero; manda sobre cualquier nota genérica vieja.** Generar "de memoria" da off-brand: siempre referenciá fotos reales.

**Regla: para igualar la estética, SIEMPRE pasale al generador 2-4 fotos REALES de Dimanche como referencia de estilo.** Viven en el Drive de Dimanche montado local, en `…/06_Marketing/01_Fotos/Editadas/` (`pic-*.jpg`). **El path del montaje depende de la cuenta/máquina** (`~/Library/CloudStorage/GoogleDrive-<cuenta-con-acceso>/Mi unidad/...`) — resolvelo como explica `references/herramientas.md`. Workflow concreto (bajar → achicar → subir a Higgsfield → usar como `medias`) en `references/herramientas.md` → "Referencia desde Drive". Si por algo no hay referencia, al menos describí el azul-estudio explícitamente.

> **Atajo clave:** muchas de esas fotos reales **ya son slides** (producto sobre azul, con todo el azul de arriba libre para texto). Para muchas piezas conviene **usar la foto real + texto en Canva, sin IA**. La generación con referencia es para escenas/variantes que no tenés fotografiadas.

## Antes de generar: cargá el criterio

- **`references/sistema-visual-dimanche.md` — norte visual canónico (V1, 2026-06-07): identidad, dial por formato, mundo visual, realismo, playbooks. EMPEZÁ POR ACÁ.**
- `brand/20-brand-visual-kit.md` — vocabulario visual, paleta, luz, tipos de toma, framework de 6 capas de Dimanche.
- `brand/00-brand-book.md` — qué es Dimanche, qué NO es. `brand/10-contexto-negocio.md` — negocio y buyer personas.
- Si dudás del visual oficial: REF-002 y REF-030 en Notion (DB Documentos).

## El proceso — de la idea a la pieza publicada

1. **Diagnosticá qué es real y qué es IA.** Separá la pieza en: lo identificable (→ foto real) y lo genérico (→ IA). Si lo central es el producto/local real y no hay foto, **pará y pedí la toma** — no la inventes.
2. **Definí el concepto** (qué tipo de toma del catálogo: *food studio, product in context, flat lay, cozy interior, golden hour, macro/texture, brand mood*). Tené la imagen clara antes de escribir.
3. **Construí el prompt en 6 capas, en inglés** (rinde mucho mejor; la IA fue entrenada con esa terminología). Ver `references/framework-6-capas.md`. Anclá la paleta y el mood Dimanche (warm, homey, domingo, antojable).
4. **Producí** con la herramienta correcta (ver `references/herramientas.md`). Por defecto **Higgsfield** (`generate_image` / `generate_video`, `reframe` 9:16/1:1). Para video, empezá SIEMPRE por una imagen base.
5. **Componé lo real:** meté la foto real del producto/logo con **Nano Banana** (vía Higgsfield) o en Canva/Adobe. Indicá posición, ángulo y tamaño exactos.
6. **Hacelo realista** (que no se note "IA"): ver `references/postproduccion-y-realismo.md`.
7. **Pasá por `dimanche-brand-check`** (tono, paleta, regla de oro, prohibidos).
8. **Armá el layout final en Canva** (brand kit "Dimanche", fuente Niveau Grotesk, **texto fuera de la imagen**). Nace **Propuesto** (gate humano).

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
| Video corto (3-5s), movimiento de cámara, efectos | **Higgsfield** (`generate_video`, `reframe`, presets) | Empezá por imagen base. |
| Layout final, cartel, post, story con texto y logo | **Canva** (brand kit "Dimanche") | Texto y logo SIEMPRE acá, no en la imagen. |
| Retoque/resize de foto real por plataforma | **Adobe** | Sobre material real. |
| Loops / texto-a-video | Sora (opcional) | Bueno para loops. |
| Estética artística muy entrenada (opcional) | Midjourney | Si se suma; no está en el stack base. |

Detalle de cada herramienta, costos y técnicas de consistencia → **`references/herramientas.md`**.

## Recetas de toma (puntos de partida, no para copiar literal)

Cada tipo tiene un patrón fijo: **lente + apertura concretos · plano · capas de profundidad (qué está nítido / qué borroso) · dirección y calidad de luz · paleta explícita · mood al cierre.** Tipos: **toma de modelo · de producto · de producto 3D/render · de escena · de textura.** Prompts modelo (verbatim) + versiones adaptadas a panadería/food → **`references/recetas-de-toma.md`**.

## Pantallas de TV en local (digital signage)
Para los TV de los locales seguí el **playbook de patrones QSR** (Starbucks / McDonald's / Mostaza): qué mostrar, dwell time, jerarquía tipográfica, contraste, **movimiento sutil**, dayparting (desayuno/almuerzo/merienda) → **`references/pantallas-tv-local.md`**. Resumen de producción:
- **Hero:** si las fotos reales no están a la altura (viejas/flojas), generá un **hero NUEVO premium anclado al estilo** (refs de Drive) en vez de usar la foto floja. Alta resolución (2k/4k).
- **Layout:** 1 mensaje por placa, texto grande y legible a 4 m, logo real fijo, fondo azul o foto a sangre con overlay. Componé con PIL o Canva (texto/logo nunca los pone la IA).
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
[content type] of [motivo + detalle, materiales con paleta Dimanche azul/crema], [pose/posición], [composición + capas de profundidad + negative space], [luz cálida + dirección + mood homey/Sunday], shot on [lente + f/], editorial food photography, photorealistic, no text, no logo.
```
Después: componé el producto/logo real encima (Nano Banana/Canva) → realismo → brand-check → layout. Ejemplo desarrollado en `brand/20-brand-visual-kit.md` y en `references/recetas-de-toma.md`.
