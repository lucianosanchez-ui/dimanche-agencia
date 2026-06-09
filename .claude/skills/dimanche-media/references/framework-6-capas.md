# Framework de prompts — 6 capas (Branded AI Guide)

> El esqueleto para construir CUALQUIER toma on-brand. Orden acumulativo: Concepto → Motivo → Colores/Materiales → Composición → Luz/Ambiente → Cámara/Lente. Los keywords técnicos van **verbatim en inglés** (la IA fue entrenada con ese vocabulario; el español es solo la capa explicativa). El prompt final se escribe en inglés.

## Índice
- [Principios](#principios)
- [Capa 1 — Concepto](#capa-1--concepto)
- [Capa 2 — Motivo](#capa-2--motivo)
- [Capa 3 — Colores & materiales](#capa-3--colores--materiales)
- [Capa 4 — Composición](#capa-4--composición)
- [Capa 5 — Luz & ambiente](#capa-5--luz--ambiente)
- [Capa 6 — Cámara & lente](#capa-6--cámara--lente)
- [Ensamblaje del prompt](#ensamblaje-del-prompt)
- [Nota Dimanche](#nota-dimanche)

## Principios
- **Tené la imagen clara antes de escribir.** Empezar con una idea vaga te aleja del resultado. Describí la escena exactamente como lo haría un fotógrafo/productor.
- **Pensá en capas que se construyen.** Cuanto más estructurado, mejor el resultado. Cada definición extra acota el margen de la IA y te acerca a tu imagen.
- **Empezá SIEMPRE por una imagen, nunca directo por video.** El video se construye sobre una imagen base.
- **Test del niño de 8 años:** leé el prompt en voz alta — ¿podría un chico de 8 imaginar la imagen con tu descripción? Ese es el nivel de claridad que necesitás.
- **No te pases de específico:** dale a la IA suficiente para ejecutar tu visión sin asfixiar su capacidad de resolver.

---

## CAPA 1 — CONCEPTO
El "por qué"/tipo de imagen. Los 4 más comunes: `Beauty shot` · `Product shot` · `Studio shot` · `3D rendering style`.

**Catálogo de tipos de contenido (verbatim):**

*Orientados a personas:* `Portrait` · `Beauty Shot` · `Full-Body Shot` · `Fashion Editorial` · `Street Style` · `Campaign Visual` · `Conceptual Portrait` · `Glamour Studio Shot` · `Headshot` · `Lifestyle Portrait`.

*Estudio:* `Studio Shoot` · `High-Key Studio Shot` (fondo claro, sobreexpuesto, sombras suaves) · `Low-Key Studio Shot` (fondo oscuro, alto contraste) · `Beauty Studio Close-up` · `Catalog / Lookbook Shoot` · `Commercial Product Shoot` · `Food Studio Shot` · `Minimalist Studio Composition` · `Still Life Studio Shot` · `White Background Studio` (e-commerce) · `Colored Background Studio`.

*Producto:* `Product Still Life` · `Product in Context` (escena lifestyle/uso) · `Flat Lay` (cenital) · `Pack shot` (foco en envase) · `Luxury Product Editorial` · `Product Hero Shot` (dramático) · `Unboxing Visual` · `Product Comparison Shot` · `Ingredient/Material Focus` · `Before/After Visual`.

*Entorno y atmósfera:* `Interior Scene` · `Decorative Still Life` · `Set Design Visual` · `Brand Mood Visual` · `Monochrome Visual` · `Shadow Play` · `Atmospheric Scene` · `Cozy Interior` · `Minimalist Space` · `Color Story Visual`.

*Naturaleza:* `Floral Composition` · `Botanical Study` · `Organic Texture Shot` · `Nature-Based Editorial` · `Seasonal Visual` · `Water Elements` · `Golden Hour Scene` · `Macro Nature`.

*Artístico/abstracto:* `Abstract Visual` · `Cinematic Scene` · `Surreal Composition` · `3D Render Style` · `Geometric Composition` · `Texture Study` · `Double Exposure` · `Vintage Film Style` · `Digital Art Style` · `Conceptual Metaphor`.

> **Dimanche usa sobre todo:** `Food Studio Shot`, `Product in Context`, `Flat Lay`, `Minimalist Space`, `Golden Hour Scene`, `Macro Nature`/`Organic Texture Shot`, `Brand Mood Visual`. *(Nada de `Cozy Interior`/homey: el norte es premium-yet-warm de Villa Allende — superficies limpias y luz aireada; la calidez va por luz y crema, no por "cozy".)*

---

## CAPA 2 — MOTIVO
El protagonista. Clave: pensá los **atributos que la IA asocia automáticamente** y describilos para controlarlos.

**Sujetos base (verbatim):** `A person` · `A woman` · `A man` · `A child` · `A model` · `A coffee cup` · `A bread loaf` · `A pastry` · etc.

### Si el motivo es una persona (gente anónima — recordá la regla de oro):
- **Postura/pose:** `relaxed` · `confident` · `casual` · `formal` · `dynamic`; brazos `crossed` · `at sides` · `hands on hips` · `reaching` · `gesturing`; peso `leaning on one leg` · `balanced` · `in motion`; energía `static` · `dynamic` · `flowing` · `rigid`.
- **Ropa:** estilo `casual` · `formal` · `vintage` · `modern` · `bohemian` · `minimalist`; estado `tailored` · `loose` · `worn` · `pristine` · `wrinkled`.
- **Pelo:** largo `short`/`medium`/`long`/`shoulder-length`; textura `straight`/`wavy`/`curly`/`coarse`/`fine`; peinado `loose`/`braided`/`updo`/`ponytail`/`messy bun`/`sleek`; condición `shiny`/`matte`/`tousled`.
- **Gesto facial:** ánimo `happy`/`serious`/`contemplative`/`confident`; ojos `bright`/`intense`/`gentle`/`focused`/`dreamy`; boca `smiling`/`neutral`/`slight smirk`/`laughing`; cejas `raised`/`furrowed`/`relaxed`/`arched`.
- **Accesorios/maquillaje:** describir solo si suman; estilo de makeup `natural`/`dramatic`/`editorial`.
- *Ej:* `Standing with confident posture, weight shifted to right leg, left hand on hip, right arm relaxed at side` · `Gentle, genuine smile with eyes slightly crinkled at the corners, conveying warmth and approachability`.

### Si el motivo es un objeto/producto:
- **Propiedades físicas:** tamaño/escala `relative to surroundings`; forma `geometric`/`organic`/`angular`/`curved`; superficie `smooth`/`rough`/`glossy`/`matte`/`weathered`; estado `new`/`vintage`/`worn`/`pristine`.
- **Posición/orientación:** `centered`/`off-center`/`foreground`/`background`; ángulo `straight-on`/`angled`/`tilted`/`rotated 45° angle`; relación `isolated`/`grouped`/`overlapping`.

---

## CAPA 3 — COLORES & MATERIALES
Transmiten textura, peso, temperatura y calidad — convierten una imagen plana en algo "que casi se toca".

**Temperatura:**
- `warm colors` — acogedor, nostálgico. **PROHIBIDO PARA DIMANCHE el eje golden honey / amber / naranjas cálidos** (Dimanche = sin naranja). La calidez de Dimanche se logra con la crema `#E9E3D9` y la luz (window/golden-hour light), NO con paletas ámbar/naranja. El *Ej* genérico de abajo (`Warm color palette dominated by golden honey tones and amber highlights…`) NO se usa para Dimanche.
- `cool colors` — moderno, limpio, profesional (steel blue, ice, mint). *Ej:* `Cool color palette with steel blue undertones and crisp whites, modern professional aesthetic`.

**Armonía:**
- `neutral colors` — equilibrado, natural, muestra materiales sin distorsión.
- `monochromatic schemes` — sofisticado, armónico (alta gama, minimalismo).
- `complementary colors` — dinámico, mucho contraste (azul/naranja, rojo/verde).
- `analogous colors` — armónico, natural (vecinos en el círculo).

**Descripciones de color (más allá del nombre):** rojos `crimson`/`scarlet`/`burgundy`/`coral`/`cherry`; azules `navy`/`cerulean`/`midnight`/`powder`/`steel`. Usá lenguaje comparativo ("más oscuro que navy, más claro que negro").

**Saturación:** `high saturation` (vivo, audaz) · `low saturation` (elegante, sobrio) · `pastel colors` (delicado, soñador).

**Materiales y su relación con la luz:**
- Textiles: `silk` (brillo luminoso, fluye, lujo) · `cotton` (mate, textura natural) · `linen` (natural, casual) · `wool`.
- Superficies: `high gloss surfaces` (reflejos espejados) · `satin finishes` (brillo suave) · `matte` (sin reflejos, muestra forma por sombras) · `textured surfaces` (reflejos irregulares, táctil).
- *Ej producto:* `Polished stainless steel case with mirror-like reflections, contrasted against a soft cognac leather strap with natural grain... background warm gray marble with subtle veining`.

**Pro:** sé preciso (satinado ≠ mate), pensá la interacción con la luz, superponé texturas (lisa+rugosa, mate+brillante) para tensión, apostá por autenticidad (¿cómo se vería en la vida real?).

> **Dimanche (act. 2026-06-07):** paleta `#3559E0` (azul) + `#E9E3D9` (crema), **sin naranja**. Materiales **limpios** (norte Villa Allende): `white surfaces`, `stainless steel`, `white marble`, `ceramic` + `golden crust`/`soft crumb` del producto. `wood`/`linen` solo como acento cálido en reels, nunca la base. Mood: premium-limpio en feed, cálido en reel (ver `sistema-visual-dimanche.md`).

---

## CAPA 4 — COMPOSICIÓN
Cómo se relacionan los elementos y cómo guían la mirada.

- **Posición del motivo:** `centered` (formal) · `rule of thirds` (dinámico) · `off-center` (tensión) · `edge placement` (dramático) · `upper/middle/lower third`.
- **Relaciones entre objetos:** `overlapping` (profundidad) · `separated` (orden) · `clustered` (peso) · `scattered` (energía).
- **Fondo:** `clean minimal` · `contextual` · `blurred/bokeh` · `detailed`; complejidad `seamless` · `defined space` · `partial view`.
- **Capas de profundidad:** `foreground` (encuadra) · `middle ground` (suele ir el motivo) · `background` (contexto). *Decí cuál está sharp y cuál blurred.*
- **Espacio negativo:** `head room` · `lead room` · `edge proximity`; cantidad `generous`/`tight`/`minimal`/`abundant`.
- **Aspecto:** `Portrait/vertical` · `Landscape/horizontal` · `Square` (redes) · `Panoramic`.
- **Equilibrio:** `Symmetrical` (estable) · `Asymmetrical` (dinámico) · `Radial`.
- **Líneas guía:** `Diagonal` (energía) · `Horizontal` (calma) · `Vertical` (fuerza) · `Curved` (elegancia).
- *Ej:* `The subject is positioned slightly left of center, occupying the right two-thirds of the frame, with eyes aligned with the upper third line`.

**Regla más importante:** cada decisión compositiva debe tener un propósito claro.

---

## CAPA 5 — LUZ & AMBIENTE
La base del fotorrealismo. Define cómo se ve Y cómo se siente.

- **Estudio:** luz principal `front-lit`/`side-lit`/`back-lit`/`three-quarter lighting`; modeladores `softbox` (suave) · `umbrella` · `beauty dish` · `bare bulb` (duro); `fill light` (rellena sombras) · `rim lighting` (separa del fondo).
- **Natural:** `golden hour` (cálida, suave, direccional) · `direct sunlight` (dura, alto contraste) · `blue hour` · `window light` (suave, direccional) · `overcast` (difusa, sombras mínimas).
- **Sombras:** dureza `sharp/defined edges` vs `soft/gradual transitions`; densidad `deep black` vs `filled, detailed`; dirección y largo.
- **Cómo la luz toca la superficie** (esto te separa de la IA genérica — verbatim): `visible pores on nose and cheeks` · `healthy glow with light catching the high points` · `subsurface scattering` (la luz penetra apenas la piel, calidez viva) · `backlight creates separation between individual hair strands` · `soft baby hairs catch the light` · `a single bright catchlight in each eye`.
  - *Para food/panadería:* `light raking across the golden crust revealing texture` · `steam rising catching the warm light` · `soft crumb with subtle shadow in the air holes` · `condensation on the glass` · `crumbs scattered catching tiny highlights`.
- **Grano/atmósfera:** `fine film grain` (orgánico, analógico) · `grain-free` (moderno, pulido) · `dust motes in the beam of light` · `slight atmospheric haze` · `gentle steam`.
- *Ej:* `Bathed in warm golden hour sunlight streaming through a large window, creating a natural rim light that highlights texture and casts a gentle glow`.

**Estrategia de referencia (para construir vocabulario reusable):** 1) identificá la fuente principal (dónde/qué tamaño), 2) mapeá transiciones de sombra, 3) mirá los highlights, 4) leé el ambiente, 5) abstraé a lenguaje descriptivo.

---

## CAPA 6 — CÁMARA & LENTE ("el filtro de un millón de dólares")
Simulás equipo carísimo describiendo características técnicas.

- **Cuerpo:** *profesional* `high-resolution full-frame DSLR` (nítido, preciso) vs *cine* `35mm film stock with natural grain, warm color grading`.
- **Lentes:** `wide-angle 20-35mm` (contexto, leve distorsión) · `standard 50mm` (perspectiva natural, documental) · `short telephoto 85-135mm` (retrato favorecedor, fondo comprimido, bokeh) · `telephoto 200mm+` (compresión extrema, aislamiento) · `macro 100mm` (detalle extremo, nitidez clínica — **ideal food/textura**) · `tilt-shift` (efecto miniatura).
- **Punto de foco:** `eyes` · `hands` · `product` · `environmental element` · `multiple layers`.
- **Bokeh / profundidad:** `shallow depth of field (f/1.4-f/2.8)` (aísla, íntimo) · `deep depth (f/8-f/16)` (todo nítido, contexto) · `controlled/professional bokeh` (cremoso, limpio).
- **Apertura:** `wide aperture` → poca profundidad, más luz, bokeh; `narrow aperture` → todo nítido, necesita más luz.
- **Obturación:** `fast shutter (1/500s+)` congela; `slow shutter` → motion blur, vida.
- *Ej:* `Shot with a 100mm macro lens at f/8, revealing every detail of the surface texture while the background dissolves into creamy blur`.

**Nombrar un lente real (ej. Canon EOS R5) mejora el realismo** y la textura de piel/superficie.

---

## Ensamblaje del prompt

**Estructura:** `[CONCEPTO] + [MOTIVO con detalle] + [COLORES/MATERIALES] + [COMPOSICIÓN] + [LUZ] + [CÁMARA/LENTE]`

**Plantilla verbatim:**
```
[Content type] of [detailed subject description] wearing/using [details with colors and materials], [specific pose/positioning], [composition and framing details], [lighting setup and mood], [camera and lens specifications]
```

**Control de calidad antes de generar:**
- ¿Describí el motivo con detalle suficiente para que un niño lo imagine?
- ¿Están claras luz y ambiente?
- ¿Especifiqué colores, materiales, texturas?
- ¿La composición apoya la historia?
- ¿Cámara y lente refuerzan la atmósfera?

## Nota Dimanche
- Prompt en inglés, cierre con `editorial food photography, photorealistic, no text, no logo, no orange`.
- Paleta azul/crema, sin naranja. Norte: premium-yet-warm de Villa Allende (`white marble / brushed stainless steel / clean airy daylight / one real cobalt signature object`) — premium-limpio en feed, cálido en reel. Mood antojable. **NO** "homey / Sunday cozy".
- Lo identificable (producto/local/equipo real) NO se genera: se compone la foto real encima (ver `postproduccion-y-realismo.md` y `herramientas.md`).
