# Arsenal de Higgsfield — qué hay y cómo lo usa Dimanche

> **Mapa vivo de las capacidades de Higgsfield aplicadas a Dimanche.** Higgsfield actualiza modelos/presets casi a diario → **revisar periódicamente y sumar lo nuevo** (pedido de Luciano, 2026-06-08). Última revisión: **2026-09-22 (relevamiento MCP, rutina quincenal)** — ver **[Novedades 2026-09-22](#novedades--revisión-2026-09-22)** al final; la anterior fue [2026-08-23](#novedades--revisión-2026-08-23). El último **test de realismo con piezas reales sigue siendo el del 08/06** (Kling 3.0 default): lo nuevo está relevado, **no validado**.
>
> **Regla de revisión constante:** cada tanto correr `models_explore` (list image + video), `presets_show`, `show_marketing_studio_v2` y `get_workflow_instructions` (sin argumento = catálogo de workflows), comparar con este mapa y bajar lo nuevo acá y a las skills. No quedarse en "lo clásico" (i2v básico) — Higgsfield tiene mucho más.

## Atajo: cuándo se pide X → usar Y

| Cuando se pide… | Herramienta | Modelo / preset |
|---|---|---|
| **Video de producto** (antojo, movimiento, humito, pantalla) | i2v desde **foto real** | **Kling 3.0 (mode `pro`)** ← ganador del test 08/06 (lo eligió Luciano). Alternativas: Veo 3.1 (`quality:ultra`), Cinema Studio 3.0 |
| **Variar tomas / ángulos** desde 1 foto (carrusel, multi-toma, sin sesión nueva) | Edición image-to-image (**"Angles"**) | **Nano Banana Pro** (`nano_banana_pro`) o Seedream 4.5 |
| **Hero / escena premium nueva** (cuando NO hay foto del encuadre) | `generate_image` | Nano Banana Pro / Seedream 4.5 / Cinema Studio Image 2.5 |
| **Cambiar fondo / limpiar / premium-izar** una foto real | Edición | Flux Kontext / Seedream 5 lite / Nano Banana |
| **Íconos, vector, mockups de packaging** on-brand (paleta exacta) | **Recraft 4.1** (`model_type` vector/utility, `colors` #hex) | `recraft-v4-1` |
| **Fondos / locaciones premium** sin producto | Soul Location | `soul_location` |
| **Cambiar formato** de un video (16:9 ↔ 9:16 ↔ 1:1) sin rehacerlo | **Reframe** | `reframe` |
| **Subir calidad** a 1080p / 4K | **Upscale** (Topaz) | `upscale_video` |
| **Saber si un video va a funcionar** antes de publicar | **Virality Predictor** | `virality_predictor` |
| **Personaje / mascota consistente** de marca | Soul / Character | `soul_2` + `show_characters` |
| **Ad completo de producto** (UGC / TV Spot / Hyper Motion / "vibe motion") | **Marketing Studio / "DTC Ads"** | ⚠️ hoy por la APP web; **desde 08/26 el MCP lo expone completo** (26 presets + hook/setting + ad_reference) — falta test, ver abajo |
| **Alargar un clip que quedó bien** (5 s → 15/30 s para TV, sin rehacerlo) | `seedance_2_5` `mode:'video_extension'` | nuevo 08/26 — a testear |
| **Pasar una foto cuadrada a 16:9 (TV) o 9:16 sin recortar el producto** | **Outpaint** (`flux_2_pro_outpaint`, expansión por lado en px) | nuevo 08/26 — el recorte puro (valores negativos) es gratis |
| **Retocar/limpiar una foto real por instrucción** (sacar un elemento, inpaint) | `seedream_v5_pro` (`is_inpaint`, `remove_bg`) | nuevo 08/26 — alternativa por prompt al retoque con `rembg`+Pillow |
| **Mini-spot de varias tomas desde 1 foto** | `cinematic_studio_video_v2` (`multi_shots` + `multi_prompt`) | nuevo 08/26 — a testear |
| **Kling en 4K directo** (TV) | `kling3_0` con `mode:'4k'` | nuevo 08/26 — evita el paso de upscale |
| **Meter NUESTRO producto real en un clip que ya funciona** (o cambiar un producto por otro sin rehacer el video) | **Genjutsu — reemplazo de objeto** | `hf_mult_replace_object` (video fuente + fotos de referencia) — nuevo 09/26, **el más prometedor**, a testear |
| **Copiar el movimiento de un video que nos gustó** a nuestra foto de producto | **Genjutsu — motion transfer** | `hf_mult_motion_control` — nuevo 09/26 |
| **Retoque quirúrgico con máscara** (sacar/cambiar UNA zona sin tocar el resto del pixel) | Inpaint con máscara real | `nano_banana_2` / `nano_banana_2_lite` (`is_inpaint:true` + media rol `mask`) — nuevo 09/26; alternativa al `rembg`+Pillow |
| **PNG con transparencia on-brand** (elementos/sellos para el motor Remotion) | `gpt_image_2_5` con `background:'transparent'` | nuevo 09/26 — evita el paso de remove-bg |
| **Recortar el producto de un CLIP** (video sobre fondo de marca por código) | Remove Background de **video** | `sam_3_video` / `video_background_remover` — nuevo 09/26 |
| **Alargar un clip bueno a 15-20 s** (TV) | `flux_3_video` (video-continuation) o `seedance_2_5` `mode:'video_extension'` | flux nuevo 09/26 (5-20 s, 1080p) |
| **Editar un video ya hecho por instrucción** (sin regenerarlo) | `kling_video_edit` (Omni Edit, hasta 4k) o `flux_3_video_edit` (1 crédito/seg) | nuevos 09/26 |
| **Terminar un video para TV** (4K + arreglar parpadeo) | `bytedance_video_upscale` (`resolution:'4k'`, `preset`, `model_version:'pro'`) + `video_deflicker` | nuevos 09/26 |
| **Subtítulos quemados** en un reel (con timing real del audio) | workflow `subtitles` (Whisper) | nuevo 09/26 — el pipeline Remotion todavía no clava la letra |
| **Método empaquetado de foto de producto** (packshot, lifestyle, hero banner, carrusel) | workflow `product-photoshoot` | nuevo 09/26 — leer antes de improvisar un prompt |
| **Método empaquetado de assets de marca** (mockups, packaging, cartelería, posters) | workflow `brand-asset-creation` | nuevo 09/26 — preserva los assets oficiales tal cual |

## Video: el flujo bueno (cuando Luciano pide un video)
**Tener esto en cuenta SIEMPRE que se pida un video.**
1. **Base REAL** del producto (foto de `Sesion_Principal` o foto del celu). NUNCA partir de un hero IA: arrastra los tells y "se nota IA".
2. **i2v con Kling 3.0 (`mode:pro`, `sound:off`)** — ganó el test de realismo 08/06. Movimiento **sutil y físico**: push-in lento + vapor real (no CGI) + brillos; **producto intacto** (`no morphing, no warping, no new elements, no hands`).
3. (opcional) **Reframe** al formato de destino (9:16 reel/story · 16:9 TV) · **Upscale** a 1080p/4K.
4. **Capa gráfica por código** encima si la pieza la lleva (ver `motor-de-composicion.md`).

**Ranking de realismo (test 08/06, croissants reales, mismo movimiento):** **Kling 3.0 (elegido)** · Veo 3.1 ultra (muy bueno, más lento/pesado) · Cinema Studio 3.0 · Hailuo (salió cuadrado, no respetó el vertical → descartado). Seedance 2.0 sobre hero IA = look IA (no usar así). Re-correr este test cuando salgan modelos nuevos.

## Imagen / edición: "Angles" (validado 08/06)
Desde **una sola foto real** del producto, los modelos de edición (Nano Banana Pro, Seedream) generan **otras tomas manteniendo el producto idéntico**: top-down (grilla/carrusel), macro lateral (antojo), cambio de fondo. Prompt clave: *"the EXACT same product from the reference, identical, seen from [ángulo]… keep it identical, photorealistic, no text, no logo, no orange"*. Resuelve la falta de variedad de tomas **sin sesión de fotos nueva** y, como parte de foto real, no se nota IA.

## Detalle por herramienta (caso de uso Dimanche)
- **Kling 3.0 / Veo 3.1 / Cinema Studio 3.0** (video i2v) → el antojo en movimiento, el humito, la pantalla del local. Kling por default.
- **Nano Banana Pro / Seedream 4.5/5** (imagen + edición) → ángulos nuevos, cambiar fondo a premium, componer el producto real en escena. Lo más usado para imagen.
- **Recraft 4.1** → generar/ajustar **íconos** del set, **mockups de packaging**, piezas vector con la paleta cobalto/crema exacta. Útil para los elementos gráficos que hoy no aprovechamos.
- **Soul Location** → fondos/escenas (cocina premium, mármol, local) para usar de set sin inventar el producto.
- **Reframe** → un mismo spot sirve para TV (16:9) y reel (9:16) sin regenerar. Clave para reutilizar.
- **Upscale (Topaz)** → terminar en 4K para TV o impresión.
- **Virality Predictor** → puntuar un reel/hook antes de publicar; priorizar lo que mejor mide.
- **Soul / Character** → si algún día Dimanche define una mascota/personaje recurrente.
- **Presets de video (+50)** → la mayoría son virales con personas/gaming (NO Dimanche); algunos de cámara (turntable/orbit 3D) podrían servir para girar un producto. Revisar caso por caso.

## Lo que NO anda por MCP hoy (va por la app web)
> ⚠️ **Actualizado 2026-09-22:** el tool `show_marketing_studio` (con `action='presets'` / `type='hook'|'setting'|'brand_kit'|'product'|'ad_reference'`) **ya no existe**: lo reemplazó **`show_marketing_studio_v2`**, un **widget de galería** con pestañas (UGC · Product shot · Motion · Ads · Posters · Marketplace) que el usuario navega y desde el cual genera. Consecuencias prácticas: (a) **Hypermotion** (el "vibe motion" de Luciano) ya figura en el catálogo del MCP, dentro de *Motion*; (b) el modelo `ms_image` ("DTC Ads") **exige un `style_id`** que salía de `show_marketing_studio(type='image_style')` — ese listado hoy **no está expuesto por MCP**, así que ese camino quedó trabado salvo desde el widget/app.
>
> ⚠️ **Actualizado 2026-08-23:** este bloque describe el estado del **08/06**. En el relevamiento de agosto el MCP **ya expone Marketing Studio video completo** (26 presets, `hook_id`/`setting_id`, `ad_reference_id`) y **el Brand Kit se puede crear/leer/editar por MCP**. No se volvió a probar una generación real (esta corrida era solo relevamiento), así que **el 500 no está confirmado como resuelto**. Ver [Novedades 2026-08-23](#novedades--revisión-2026-08-23).

- **Marketing Studio VIDEO** (UGC / Tutorial / Unboxing / **Hyper Motion** / Product Review / **TV Spot** / Wild Card): el endpoint `marketing_studio_video` devuelve **500 por MCP** (probado Hyper Motion y TV Spot, 08/06). → Hacerlo desde la **app web de Higgsfield** (ahí está pulido, con Brand Kit + avatar + setting). **"Vibe Motion"** que menciona Luciano = el preset **Hyper Motion** de la app. **"Angles 2.0"** = botón de la app; equivalente por MCP = la edición de arriba.
- El **Brand Kit de Dimanche** (logo/colores/fuentes/tono) se puede cargar en el Marketing Studio de la app (scrapeando la web o subiendo assets) → las piezas salen on-brand. Pendiente de armar.

## Créditos (referencia, test 08/06)
Plan plus. Costos por clip de video i2v: Kling 3.0 pro ~9 cr · Hailuo 1080 ~10 cr · Cinema 3.0 ~25 cr · Veo 3.1 ultra ~36 cr. Imagen Nano Banana ~2 cr. Baratos: explorar sin miedo (Luciano: "no me importa quemar créditos por el mejor resultado").

## Novedades — revisión 2026-09-22
> Relevamiento por MCP (`models_explore` image+video, `presets_show`, `show_marketing_studio_v2`, `get_workflow_instructions`). **Nada testeado en esta corrida** — es mapa, no validación. El criterio de fondo sigue siendo el del 18/06 ([[higgsfield-supercomputer-no-migrar-gobernanza]]): **producto idéntico = foto real + composición por código**; HF entra por mood, fondo, movimiento y terminación.

### 1. Genjutsu — lo más accionable
Dos modelos nuevos de video dirigido por referencia:
- **`hf_mult_replace_object`** — reemplaza un objeto en un video fuente usando **fotos de referencia**. Es el candidato directo al problema histórico "el producto sale genérico": en vez de pedirle a la IA que invente nuestro croissant, se le mete **la foto real** dentro de un clip que ya se mueve bien. **Vale un test contra la conclusión del 18/06** — si mantiene el producto idéntico, cambia el flujo de video.
- **`hf_mult_motion_control`** — transfiere el movimiento de un video de referencia a nuestras imágenes. Sirve para copiar un movimiento que funcionó (propio o de referencia de mercado) sin volver a describirlo por prompt.

Ambos: `generate_video` con `medias` rol `image_references` + un único `video_references`; 480p/720p/1080p.

### 2. Retoque y transparencia (impacta el motor por código)
- **`nano_banana_2` / `nano_banana_2_lite` con `is_inpaint:true` + media rol `mask`** — inpaint **con máscara real**: se edita sólo la zona marcada y el resto del pixel queda intacto. Es la versión por prompt de lo que hoy hacemos con `rembg`+Pillow (ver memoria del video del Día del Padre); útil cuando el retoque es "sacar/limpiar esto de acá" sin arriesgar el producto.
- **`gpt_image_2_5`** (variantes `flare`/`sunburst`, hasta 4k) con **`background:'transparent'`** — PNG transparente directo. Relevante para el set de elementos crema/cobalto que consume Remotion (`public/assets/tv/`), donde hoy hay que aplanar y recortar a mano.
- **`openai_hazel`** — el mejor en texto/logos/infografía del catálogo. **No cambia la regla**: el texto de las piezas lo sigue poniendo el código con Niveau. Sirve como apoyo para bocetos o mockups, no para la pieza final.
- **`sam_3_video` / `video_background_remover`** — remove-background **de video**. Abre la puerta a recortar el producto real de un clip y componerlo sobre fondo de marca por código (mismo principio que las estáticas, ahora en movimiento).

### 3. Video: más largo, editable y mejor terminado
- **`flux_3_video`** (BFL) — t2v, i2v multi-frame y **continuación de video**, **5-20 s**, 1080p, audio sincronizado. Junto con `seedance_2_5 mode:'video_extension'` resuelve el clip de 5 s que hay que estirar para la TV.
- **`kling_video_edit`** (Kling 3.0 Omni Edit, hasta 4k) y **`flux_3_video_edit`** (1 crédito por segundo) — editar un video ya hecho por instrucción, sin regenerarlo.
- **`kling3_0_turbo`** — versión rápida/barata de Kling: sirve para **explorar** encuadres y movimientos antes de gastar en `kling3_0 mode:'pro'`, que sigue siendo el default de producción.
- **`wan3_0` / `wan3_0_prime`** (hasta 30 s, primer/último frame, audio nativo), **`minimax_h3` / `h3_max`** (2K, refs multimodales), **`gemini_omni_flash_1_1`** (4k + modo edit), **`grok_video_v15`** — alternativas nuevas; **ninguna testeada contra Kling 3.0**.
- **Terminación:** **`bytedance_video_upscale`** (hasta 4k, `preset` por tipo de material, interpolación de fps, `model_version:'pro'`) y **`video_deflicker`** — para las TVs, mejor que el upscale genérico.
- **`sync_so`** (lipsync) y **`clipify`** (un YouTube → clips con subtítulos) — existen, hoy sin uso claro en Dimanche.

### 4. Workflows empaquetados (nuevo: el MCP trae sus propios métodos)
`get_workflow_instructions` sin argumento lista **skills empaquetadas dentro del MCP** que orquestan las tools. Las que nos tocan:
- **`product-photoshoot`** — packshots, lifestyle, hero banners, carruseles, packs de estáticas. **Leerlo antes de improvisar un prompt de producto.**
- **`brand-asset-creation`** — mockups, packaging, cartelíería, señalética, posters, social graphics; **preserva los assets oficiales tal cual** (clave para logo/emblema Dimanche). Se conecta con `dimanche-local`.
- **`ugc-product-video`** — UGC **producto-only**, sin creador hablando a cámara (persona sólo como manos/POV). Es el único sabor de UGC compatible con el tono POL-010; los demás (`ugc-review`, `unboxing`, `try-on`, `tutorial`, `website`) no van.
- **`subtitles`** — subtítulos quemados con timing de Whisper sobre el audio real. Tapa el agujero conocido del reel Remotion automático ([[loop-aprendizaje-contenido]]).
- **`video-editing`** (Higgsedit: cortes, títulos, overlays) y **`ad-multiplier`** (N variantes de un mismo ad) — a mirar cuando haya volumen.
- No aplican: `faceless-video`, `thumbnail-generation`, `character-sheet`, `narrator`, `website-builder-flow`.

### 5. Marketing Studio V2
El widget trae **986 presets sólo en Product shot** (formatos `standalone` y `with-model`), varios directamente de comida/take-away: *Slatted Light Breakfast*, *Takeout Hand-Off*, *Linen Lid Lift*, *Buried in Ice*. Categorías: UGC (talking head) · Product shot · Motion (2D product motion, **Hypermotion**, Mixed media, SaaS) · Ads · Posters · Marketplace. Sirve como **banco de referencia de composición** (qué encuadre/luz pedirle al prompt) aunque la pieza final se componga por código.

### 6. Presets de i2v (`presets_show`): sin cambios últiles
Siguen siendo casi todos virales con personas (K-pop, gaming, superhéroes, paparazzi). Los únicos rescatables para producto siguen siendo los de cámara pura: **ORBIT 360** y **FLOAT SPIN** (giro 360° alrededor del objeto). El resto, no.

### Pendientes que deja esta revisión
1. **Testear `hf_mult_replace_object`** con un clip propio + foto real de producto — es la prueba que puede mover la decisión del 18/06.
2. **Re-correr el test de realismo** (último: 08/06) con Kling 3.0 vs Wan 3.0 Prime vs Seedance 2.5 sobre la misma foto real.
3. **Probar `gpt_image_2_5` transparente** para un elemento del set de TV y ver si reemplaza el recorte manual.
