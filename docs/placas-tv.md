# Placas para los TVs del local — estado y cómo retomar

> Última actualización: 2026-06-10. Motor: `motor-contenido/remotion`. Entregables (mp4/png) en
> `Desktop/referencias diseño agencia/menu board/producido por claude/`.

## Los 3 TVs (cada local tiene 3)
- **◀ IZQUIERDA = producto** · **▦ MEDIO = info** · **▶ DERECHA = contenido / videos lindos con vuelta de rosca**

## Método (IMPORTANTE)
**Ir DE A UNA, con iteración de Luciano por pieza.** Producir en lote con un molde único salió **plano y repetido** (rechazado 10/06). Lo que funcionó: desayuno, criollos, delivery — una por vez, concepto → mockup → ajustes → movimiento → cierre, cada una con su vuelta de rosca. Los moldes (`PlacaProducto`, `PlacaInfo`) son **punto de partida**, no salida final: romper la uniformidad (composición/movimiento propios por placa).

## Estado por TV
**Cerradas y aprobadas (referencia de calidad):**
- Desayuno (producto, 10s), Criollos (producto, 10s), Delivery (info, escena ilustrada + mano real, QR), Horarios Villa Allende (info, medialuna).
- Horarios Boulevares (10/06): mismo molde por props (`local` + `filas`: lun-sáb 6 a 22 / dom 7 a 20). Al video se le portó la prop `adorno` (tenía el emblema viejo hardcodeado; ahora medialuna como la estática). Horarios reales de VA y Boulevares quedaron en `brand.ts` LOCALES (Gauss sigue provisorio).

**Hechas en lote 10/06 — FUNCIONAN pero quedaron PLANAS, hay que retrabajarlas de a una:**
- Producto: pan, torta de chocolate, medialunas, masas finas, muffin, coquitos (estática + video; precios reales de Notion).
- Info: café, medios de pago, seguinos (QR IG), encargos (QR WhatsApp) (estática + video).

**BUDINES (producto, video 17.2s) — PRODUCIDA 10/06, esperando aprobación final de Luciano.** 3 actos: (1) hero chocolatoso cortado sobre crema (clip Seedance 1080p) + "el que te salva / [la juntada]"; (2) cenitales VERTICALES de a uno (1.6s c/u, nano_banana desenvolvió los 6 desde la cenital real IMG_9603; recortados con remove_background de Higgsfield + sombra sintética CSS — el keyeo por color falló con glaseados claros), nombre al lado; (3) cierre: los 6 en fila + "$4.500 — el que sea" + "los mates los pone otro." + sello. Primera placa de producto sobre CREMA. Entregados: `budines — video (17s).mp4` + `budines — placa estatica.png` (= still frame 505). Comp `BudinesVideo` (`PlacaBudinesVideo.tsx`); assets en `public/media/tv/budines/` (gitignored — backup en `_opciones budines/generaciones-ia/`). Generaciones: 10 nano_banana (correcciones: chocolatoso masa/glaseado, manzana proporción de molde) + 6 remove_background + 2 Seedance (quedó la 1080p job 977ae7dc).

**Pendiente:**
- TV contenido (videos mood): manos/proceso, mostrador, medialunas+café, pan en canasta, lluvia/torta, drone Villa Allende. Requiere Seedance (~20 créditos c/u) + bajar un aéreo real del drone (los buenos están "online only" en Drive).

## Componentes (Remotion `src/components/`)
`PlacaDesayuno(Video)`, `PlacaCriollos(Video)`, `PlacaHorarios(Video)`, `PlacaDelivery(Video)`, `PlacaProducto(Video)`, `PlacaInfo`. Brand kit en `src/brand.ts` (paleta, Niveau, `TV_GRAFICA`/`TV_DELIVERY`). Heroes/clips en `public/media/tv` y `public/assets/tv`. Chroma-key: `scripts/key_chroma.py`.

## Datos
- Precios: Notion DB **Productos** (propiedad **Precio Local** = góndola). Combos guardan neto (×1.105 = c/IVA).
- Fotos/clips base: Drive `06_Marketing/01_Fotos/1_Listas-para-publicar` + `2_Material-crudo`, `02_Videos`, `04_Packaging`.
- WhatsApp `wa.me/5493516639003` · Instagram `@dimanchepanaderia`.

## Cómo retomar (otra sesión)
1. Abrí Claude Code en el repo y decí: **"leé ESTADO.md, docs/placas-tv.md y la memoria; retomemos las placas TV DE A UNA, empecemos por <placa>"**.
2. Elegí UNA placa. Concepto + mockup primero, ajustás, recién ahí movimiento, y se cierra antes de pasar a la siguiente.
3. Render: `cd motor-contenido/remotion && npx remotion studio` (preview) · `npx remotion render <Comp> <salida.mp4>` / `still <Comp> <salida.png>`.
