# Postproducción y realismo (anti "look IA")

> Lo que separa una pieza on-brand de una imagen genérica de IA es **imperfección, textura y control manual de lo identificable**. Mentalidad de la guía: "si no te sale, casi seguro otro ya lo logró — la diferencia son las keywords correctas". (Y la regla de oro de Dimanche encaja acá: lo real se controla a mano.)

## Índice
- [Que la persona/escena no se vea "IA"](#que-la-personaescena-no-se-vea-ia)
- [Manejo de logos y texto](#manejo-de-logos-y-texto)
- [Errores frecuentes y cómo resolverlos](#errores-frecuentes-y-cómo-resolverlos)
- [Postproducción de video](#postproducción-de-video)
- [Realismo para food](#realismo-para-food)

## Que la persona/escena no se vea "IA"
El problema típico: demasiado perfecto, sin textura real. Soluciones (keywords verbatim en inglés):
- **Romper la perfección:** `unusual looking`, `small imperfections`; rasgos reales `acne`, `wrinkles`, `asymmetrical lips`.
- **Textura de piel con luz:** `visible pores on nose and cheeks`, `fine facial hair catching the light`.
- **Filtro fílmico:** un `film filter` da un perfil más humano.
- **Nombrar un lente real** (ej. Canon) → look fotográfico con detalle realista; otros lentes suavizan imperfecciones. El lente también define profundidad/luz/textura.
- *(Midjourney: agregar `--raw` desactiva el filtro estético y obliga a seguir tu prompt → menos "Midjourney look").* 

## Manejo de logos y texto
**Nunca confíes el logo a la IA generativa** (es su punto débil — y además es lo identificable de Dimanche). Tres casos:
- **Falta el logo:** subí la imagen a **Nano Banana** + el **PNG del logo**, indicá dónde va y describilo; o ponelo a mano en **Canva/Photoshop**.
- **Logo incorrecto/borroso:** borralo en el editor y **reinsertá el correcto** en Nano Banana, o pegá el PNG real directo (control total).
- **Logo correcto pero muy grande:** recortá el logo, colocalo en la imagen final y **ajustá tamaño/contexto** en el editor.

> Para Dimanche: el layout final con logo y texto se cierra **en Canva** (brand kit "Dimanche", Niveau Grotesk), texto **fuera de la imagen**. La IA no escribe el texto.

## Errores frecuentes y cómo resolverlos
- **Producto mal colocado:** describí composición con detalle (`vertical`/`horizontal`/`tilted`, "inclinado ~30°", `The product is rising from the bottom of the frame`). Si la IA "sabe" la pose típica y la sobreescribe, **rotá vos una referencia y subila**.
- **Producto muy chico/grande:** dale escala (medidas reales: "10 cm de ancho"; relación: "más chico que una mano", "ocupa un tercio del frame").
- **Extremidades/dedos mal:** a más variaciones de un objeto, más error (los dedos son lo peor). Usá referencias visuales o describí la posición de cada dedo; reusá el mismo `--seed` y ajustá.
- **"Sensitive Content" injustificado:** reformulá aclarando contexto; revisá material no licenciado / menciones de etnia / términos NSFW. **No reenvíes el mismo prompt marcado repetidamente** (puede flaggear/suspender la cuenta).
- **Reproducir una imagen:** `--seed` (mismo seed+prompt+params ≈ misma imagen). En Midjourney web: Create → More → Copy → Seed; en Discord: reaccionar con ✉️.

## Postproducción de video
- **Clips cortos (≤3s)** funcionan mejor — ideales para Reels o relleno; permite combinar clips sin que toda la escena sea coherente de punta a punta → más libertad.
- **Movimientos no deseados:** keyword `silent` (evita que un personaje "hable"); pensá qué movimiento asocia la IA a cada keyword (experimentá).
- **Si anima algo que NO debe moverse** (ej. la bandeja en vez del producto): **enmascarado** en **CapCut** o **DaVinci Resolve** — combiná la secuencia animada con una imagen fija para estabilizar lo estático.
- **Física:** la IA todavía falla; sé descriptivo y dale contexto. **Sora** suele rendir mejor en text-to-video que desde imagen.
- **Animar imagen:** Higgsfield (start frame + efectos + prompt) o, si se usa MJ, `Animate Image` Auto/Manual con `--motion low/high`.

## Realismo para food (Dimanche)
- **Textura que da hambre:** `light raking across the golden crust`, `visible air pockets in the soft crumb`, `steam rising catching the warm light`, `condensation on the glass`, `crumbs scattered catching tiny highlights`, `glossy glaze reflections`.
- **Lente real + macro** para detalle (`100mm macro at f/3.5–4`).
- **Imperfección apetecible pero PROLIJA** ("real pero prolijo", norte Villa Allende): la miga real, dos o tres migas, una pieza partida a mano, bordes irregulares, un reflejo real en el acero — pero limpio y ordenado, **sin harina volada ni desorden**. Ni el plástico perfecto, ni el rústico desordenado.
- **Lo identificable real va por foto real + Adobe** (retoque/resize), no IA. La IA arma el set/mood/fondo; la factura/pan real se compone (Nano Banana) o se fotografía.
