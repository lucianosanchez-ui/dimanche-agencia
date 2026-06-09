# Arsenal de Higgsfield — qué hay y cómo lo usa Dimanche

> **Mapa vivo de las capacidades de Higgsfield aplicadas a Dimanche.** Higgsfield actualiza modelos/presets casi a diario → **revisar periódicamente y sumar lo nuevo** (pedido de Luciano, 2026-06-08). Última revisión: **2026-06-08 (sesión 9)**, con test de modelos de video real.
>
> **Regla de revisión constante:** cada tanto correr `models_explore` (list image + video), `presets_show` y `show_marketing_studio(action='presets')`, comparar con este mapa y bajar lo nuevo acá y a las skills. No quedarse en "lo clásico" (i2v básico) — Higgsfield tiene mucho más.

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
| **Ad completo de producto** (UGC / TV Spot / Hyper Motion / "vibe motion") | **Marketing Studio / "DTC Ads"** | ⚠️ **por la APP web** — el video da 500 por MCP (ver abajo) |

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
- **Marketing Studio VIDEO** (UGC / Tutorial / Unboxing / **Hyper Motion** / Product Review / **TV Spot** / Wild Card): el endpoint `marketing_studio_video` devuelve **500 por MCP** (probado Hyper Motion y TV Spot, 08/06). → Hacerlo desde la **app web de Higgsfield** (ahí está pulido, con Brand Kit + avatar + setting). **"Vibe Motion"** que menciona Luciano = el preset **Hyper Motion** de la app. **"Angles 2.0"** = botón de la app; equivalente por MCP = la edición de arriba.
- El **Brand Kit de Dimanche** (logo/colores/fuentes/tono) se puede cargar en el Marketing Studio de la app (scrapeando la web o subiendo assets) → las piezas salen on-brand. Pendiente de armar.

## Créditos (referencia, test 08/06)
Plan plus. Costos por clip de video i2v: Kling 3.0 pro ~9 cr · Hailuo 1080 ~10 cr · Cinema 3.0 ~25 cr · Veo 3.1 ultra ~36 cr. Imagen Nano Banana ~2 cr. Baratos: explorar sin miedo (Luciano: "no me importa quemar créditos por el mejor resultado").
