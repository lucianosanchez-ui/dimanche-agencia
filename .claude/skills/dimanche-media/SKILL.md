---
name: dimanche-media
description: Genera prompts e imágenes/videos on-brand de Dimanche con IA (Higgsfield/Gemini) usando el framework de 6 capas y el Brand Visual Kit. Usar SIEMPRE que se pida una foto, imagen, video, reel o visual de producto o escena para Dimanche.
---

# dimanche-media — Producción visual on-brand

Generás imágenes y videos de Dimanche que se ven **de la marca, no genéricos de IA**. La IA es traductora creativa, no socia: vos traés el concepto, ella lo materializa.

## Antes de generar, leé la base
- `brand/20-brand-visual-kit.md` — vocabulario visual, paleta, luz, tipos de toma, framework de 6 capas.
- `brand/00-brand-book.md` — qué es Dimanche, qué NO es.
- Si dudás del visual oficial: REF-002 y REF-030 en Notion (DB Documentos).

## Proceso
1. **Definí el concepto** (tipo de toma del Visual Kit: product hero, food studio, product in context, flat lay, cozy interior, golden hour, macro).
2. **Construí el prompt en 6 capas** (Concepto → Motivo → Colores/materiales → Composición → Luz/ambiente → Cámara/lente), en **inglés** (rinde mejor), con la paleta (#3559E0 / #E9E3D9, **sin naranja**) y el mood (warm, homey, Sunday, antojable).
3. **Producí:** Higgsfield `generate_image` / `generate_video` (+ `reframe` para 9:16 / 1:1); Gemini para variantes. Para video, empezá por una imagen base.
4. **Si es video/hook**, puntuá con `virality_predictor` de Higgsfield.
5. **Pasá por `dimanche-brand-check`** y armá el layout final en Canva (Niveau Grotesk, texto fuera de la imagen).

## Reglas (REF-030)
- IA para **mood, escena, contexto y retoque**. **NO** para inventar el producto real que se hace pasar por verdadero.
- **Producto real:** usar fotos de Drive (`MKT - Dimanche`, `06_Marketing`) o pedir la toma en la DB *Activos a producir*.
- Cero texto en la imagen generada. Cero emojis. Cero naranja.

## Plantilla rápida (copiar y completar)
`[concepto] of [motivo + detalle], on [colores/materiales con paleta Dimanche], [composición + negative space], [luz cálida + mood homey/Sunday], shot on [lente], editorial food photography, photorealistic, no text.`

Ejemplo y más detalle en `brand/20-brand-visual-kit.md`.
