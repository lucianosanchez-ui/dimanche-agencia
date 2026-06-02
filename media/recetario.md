# Recetario de media — qué herramienta para qué

Cómo se produce cada tipo de pieza, respetando la identidad visual nueva (sin naranja) y la regla REF-030.

## Regla madre (REF-030)
- **Producto real → se fotografía/filma** (cámara propia: iPhone + DJI Osmo). Va a la base *Activos a producir*.
- **IA permitida para:** retoque, mood, escena/ambiente, contexto imaginado, variantes de fondo.
- **IA NO permitida para:** inventar el producto que se hace pasar por real (un criollito "fake").

## Mapa formato → herramienta

| Necesito… | Herramienta | Notas |
|---|---|---|
| Foto de producto real | Cámara propia → *Activos a producir* | IA solo para retoque/limpieza de fondo |
| Mood / escena / ambiente / fondo | **Higgsfield** `generate_image` o **Gemini** | Paleta Dimanche, minimalista, sin texto |
| Variantes rápidas de una imagen | **Gemini** (image) | Para iterar ideas baratas |
| Video corto / reel con IA | **Higgsfield** `generate_video` | + `reframe` para 9:16 (reel/story), 1:1 (feed), 16:9 (web) |
| Adaptar aspect ratio | **Higgsfield** `reframe` | Mismo activo, varios formatos |
| Score de hook / video | **Higgsfield** `virality_predictor` | Para elegir entre variantes, no como verdad |
| Placa / carrusel / cartel con texto | **Canva** (brand kit) | Niveau Grotesk, paleta nueva, mucho blanco |
| Layout final de marca | **Canva** | Cierre de toda pieza con texto |

## Identidad visual (obligatoria)
- Paleta: Azul `#3559E0`, Blanco `#FFFFFF`, Negro `#000000`, Crudo `#E9E3D9`. **Sin naranja.**
- Tipografía: **Niveau Grotesk** (fallback Helvetica Neue / Arial).
- Estilo: minimalista, mucho espacio en blanco, sin degradados, sin sombras, sin ornamentos. **Cero emojis.**

## Brand kit en Canva (configurar una vez, en la UI)
1. Canva Pro → Brand Hub → **Brand Kit "Dimanche"**.
2. Cargar colores: `#3559E0`, `#FFFFFF`, `#000000`, `#E9E3D9`.
3. Subir fuente **Niveau Grotesk** (pesos Light/Roman/Medium/Bold/Black).
4. Subir **logo** desde Google Drive → `06_Marketing` (variantes azul/blanco/negro).
5. Crear plantillas base: post 1:1, story/reel 9:16, carrusel.

## Flujo de producción de una pieza
1. Guion/idea (Claude, recetas on-demand) → 2. Generar mood/escena (Higgsfield/Gemini) **o** pedir toma real (Activos a producir) → 3. (si video) score con `virality_predictor` → 4. Layout final en Canva con brand kit → 5. Cargar link en *Calendario de contenido* (estado Propuesto) → 6. Aprobación → 7. Programar/publicar.
