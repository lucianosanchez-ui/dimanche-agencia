# Herramientas + consistencia (stack Dimanche)

> El framework de 6 capas es agnóstico de herramienta. Acá: qué usar para qué en el stack real de Dimanche, cómo lograr consistencia entre piezas, y costos. Datos de la guía: sep-2025 — las plataformas cambian rápido, tratá settings/precios como referencia.

## Índice
- [El stack Dimanche](#el-stack-dimanche)
- [Higgsfield](#higgsfield-principal)
- [Nano Banana (clave para la regla de oro)](#nano-banana-clave-para-la-regla-de-oro)
- [Sora / Midjourney (opcionales)](#sora--midjourney-opcionales)
- [Consistencia entre piezas](#consistencia-entre-piezas)
- [Costos](#costos)

## El stack Dimanche
| Para… | Herramienta | MCP / dónde |
|---|---|---|
| Escena/mood/fondo/textura IA (imagen) | **Higgsfield** | `generate_image` |
| Video corto, movimiento de cámara, efectos | **Higgsfield** | `generate_video`, `reframe`, presets |
| Meter foto real de producto en la escena, logo, texto correcto | **Nano Banana** (vía Higgsfield) | `generate_image` con multi-referencia / Higgsfield "Nano Banana" |
| Layout final con texto y logo | **Canva** (brand kit "Dimanche") | MCP Canva (autofill/templates) |
| Retoque/resize de foto real | **Adobe** | skills adobe-* |
| Loops / texto-a-video | Sora (opcional) | — |
| Estética artística muy entrenada | Midjourney (opcional, no en stack base) | — |

**Regla de flujo:** imagen primero, después video. Lo identificable real NO se genera: se compone (Nano Banana/Canva). Logo/texto a mano.

## Higgsfield (principal)
Plataforma de imagen+video IA, **mobile-first y fácil**. Además es **interfaz unificada de acceso a otros modelos** (Nano Banana, Google Veo, Kling) — evita pagar suscripción a cada uno.

- **Image to Video:** subir `start frame` (+ opcional `end frame`) → elegir **Preset** (+50: crash zoom, crane, dolly, whip pan, color explosions; "General" como estándar; se pueden **combinar** con "Mix") → prompt (opcional "Enhance" para enriquecer; ojo que modifica tu prompt) → settings (modelo, steps, seed).
- **Draw to Video / Draw to Edit:** dibujás flechas/texto/lápiz sobre la imagen para explicar el movimiento o el cambio.
- **Character-Model:** versión para **consistencia de personaje/mascota** ultrarrealista en varios videos (útil si Dimanche define un personaje/mascota de marca).
- **Specs:** clips **3-5s**, **30 fps MP4**, aspect = el de tu imagen (9:16 / 1:1 / 16:9). Actualizaciones casi diarias → explorá modelos nuevos.
- **Tips:** keywords de cámara reales (`crane`, `FPV`, `dolly`) ayudan; subí un start frame claro para continuidad; para evitar habla no deseada usá `silent`.

## Nano Banana (clave para la regla de oro)
Gemini 2.5 Flash Image. **Accedelo vía Higgsfield** (permite refinar interactivo + dibujar sobre la imagen). Es lo que hace posible respetar la regla de oro con potencia:

- **Multi-referencia precisa:** combina varias imágenes (atuendo + persona + set, o **escena + foto real del producto**) en una composición coherente. Reutilizable en toda una campaña.
- **Colocar/reemplazar producto:** subís la **escena vacía generada en Higgsfield** + la **foto real del producto** → indicás **dónde colocarlo y desde qué ángulo**. Así la escena es IA pero el producto es real. También sirve para **sustituir** un producto viejo por uno nuevo en una pieza existente.
- **Texto y logo correctos:** alta precisión en texto (a diferencia de Midjourney). Para el logo: subí la imagen + el **PNG del logo** e indicá **posición y tamaño exactos**. (Igual, el layout final con logo conviene cerrarlo en Canva.)

## Sora / Midjourney (opcionales)
- **Sora** (ChatGPT Plus): mejor en **texto→video** y **loops**; escribe texto correctamente. Para estética de marca coherente, Higgsfield/MJ suelen rendir mejor.
- **Midjourney:** modelo estético muy entrenado (captura "el look" con poca descripción). Falla en logos/texto. Si se suma, sus técnicas de consistencia (abajo) son potentes. No está en el stack base de Dimanche.

## Consistencia entre piezas
El objetivo: que **toda la cuenta se vea de la misma marca**. No generes prompts sueltos — construí un sistema:

1. **Vocabulario de marca reutilizable** (ver `vocabulario-y-readiness.md`): los mismos keywords de luz/paleta/mood en cada prompt. Para Dimanche: `warm diffused window light`, `flour-dusted wood`, `muted blue and cream palette`, `homey Sunday mood`, `editorial food photography`.
2. **GPT/asistente entrenado en la marca:** cargale personalidad + 5-10 mejores imágenes + bloques de prompt; que devuelva prompts **en inglés**. (Esta skill cumple ese rol.)
3. **Referencia de producto/personaje:**
   - **Nano Banana multi-referencia** → mismo producto/elemento consistente entre piezas.
   - **Higgsfield Character-Model** → mismo personaje/mascota en varios videos.
   - *(Midjourney, si se usa: **Omni Reference** `--oref` (V7) para identidad de objeto/personaje, Omni Strength ~100 para réplica precisa; `--sref`/`--sw` para estilo; `--cref`/`--cw` (V6.1) para personaje.)*
4. **Seed para reproducir:** fijar el `seed` repite el punto de partida (mismo seed + mismo prompt + mismos params ≈ misma imagen). Ojo: las referencias (Omni/sref) introducen variación igual.
5. **Moodboard de marca:** una colección coherente de imágenes que define paleta, luz, textura, encuadre y "vibe". Cuanto más uniforme, más consistente la salida. (En MJ se referencia con `--p m...`; en tu stack, mantené una carpeta de referencias y pasalas a Nano Banana/Higgsfield.)

## Referencia desde Drive (workflow concreto) — el que hace que salga on-brand
La estética Dimanche solo se logra **anclando fotos reales** como referencia. Probado y funcionando:

1. **Fuente:** el Drive de Dimanche montado local (Google Drive Desktop). **El path varía por cuenta/máquina** — resolvelo listando `~/Library/CloudStorage/` y entrando a la carpeta `GoogleDrive-<la cuenta con acceso al Drive>` (en la compu de Luciano: `lucianosanchez@panaderiadimanche.ar`; en otra máquina, la cuenta de ese usuario). Las editadas están en `…/Mi unidad/06_Marketing/01_Fotos/Editadas/` (`pic-*.jpg`, ~54 on-brand). **Si el `06_Marketing` te lo COMPARTIERON** (no está en tu unidad), agregale un *acceso directo a 'Mi unidad'* en Google Drive para que sincronice local — o, ideal a futuro, que los assets vivan en una **unidad compartida (Shared Drive)**, que sincroniza sin accesos directos. Para elegir sin abrir 50 archivos: armá un **contact sheet** con `sips -Z 360` + PIL (no hay ImageMagick).
2. **Elegí 2-4** que representen el look (producto sobre azul, vajilla, luz). Pesan 15-28 MB → **achicá** con `sips -Z 1600 in.jpg --out out.jpg` (no las metas enteras en contexto: el MCP de Drive devuelve base64 y revienta).
3. **Subí a Higgsfield:** `media_upload` (devuelve presigned URLs) → `curl -X PUT -H "Content-Type: image/jpeg" --data-binary @foto.jpg "<upload_url>"` → `media_confirm` (te da los `media_id`).
4. **Generá** con `nano_banana_2` (o `marketing_studio_image`), pasando `medias: [{value: <media_id>, role: "image"}, ...]` + prompt que pida una escena NUEVA "in the exact style/palette/lighting of the references". Para slides: plato **vacío** (regla de oro) + espacio azul para texto.
5. **Componé** el producto real (Nano Banana) y el texto/logo (Canva) encima.

> Nota gold-rule: las referencias son para **estilo**, no para clonar un producto. El producto real va por foto real.

## Costos (referencia sep-2025)
- **Higgsfield:** Basic $0 (150 créditos/mes) · **Pro $29/mes** (600) · **Ultimate $49/mes** (1200) · Creator $249. *(Dimanche: plan plus, ~836 créditos disponibles.)*
- **ChatGPT/Sora:** Plus $20 (con marca de agua) · Pro $200 (sin marca de agua).
- **Midjourney:** Standard $30 · **Pro $60** (privacidad Stealth — necesario si manejás datos de clientes).
- **Inversión sugerida marca pequeña (guía):** ~$89/mes (MJ Pro + Higgsfield) — pero Dimanche puede arrancar **solo con Higgsfield** (ya pago) + Canva + Adobe.
