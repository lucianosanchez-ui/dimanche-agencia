# Placas para los TVs del local — estado y cómo retomar

> Última actualización: 2026-08-29. Motor: `motor-contenido/remotion`. Entregables (mp4/png) en
> `Desktop/referencias diseño agencia/menu board/producido por claude/`.

## Los 3 TVs (cada local tiene 3)
- **◀ IZQUIERDA = producto** · **▦ MEDIO = info** · **▶ DERECHA = contenido / videos lindos con vuelta de rosca**

## Método (IMPORTANTE)
**Ir DE A UNA, con iteración de Luciano por pieza.** Producir en lote con un molde único salió **plano y repetido** (rechazado 10/06). Lo que funcionó: desayuno, criollos, delivery — una por vez, concepto → mockup → ajustes → movimiento → cierre, cada una con su vuelta de rosca. Los moldes (`PlacaProducto`, `PlacaInfo`) son **punto de partida**, no salida final: romper la uniformidad (composición/movimiento propios por placa).

## Estado por TV
**Cerradas y aprobadas (referencia de calidad):**
- Desayuno (producto, 10s), Criollos (producto, 10s), Delivery (info, escena ilustrada + mano real, QR), Horarios Villa Allende (info, medialuna).
- Horarios Boulevares (10/06) y Gauss (11/06): mismo molde por props (`local` + `filas`; Boulevares lleva 3 filas: lun-vie 6 a 22 / sáb 7 a 22 / dom 7 a 20 — Gauss 2: lun-sáb 7 a 22 / dom 7 a 20). Al video se le portó la prop `adorno` (tenía el emblema viejo hardcodeado; ahora medialuna como la estática). Horarios reales de los 3 locales confirmados en `brand.ts` LOCALES. **Los 3 locales tienen su placa de horarios.**

**Hechas en lote 10/06 — FUNCIONAN pero quedaron PLANAS, hay que retrabajarlas de a una:**
- Producto: pan, torta de chocolate, medialunas, masas finas, muffin, coquitos (estática + video; precios reales de Notion).
- Info: café, medios de pago, seguinos (QR IG), encargos (QR WhatsApp) (estática + video).

**BUDINES (producto, video 17.2s) — PRODUCIDA 10/06, esperando aprobación final de Luciano.** 3 actos: (1) hero chocolatoso cortado sobre crema (clip Seedance 1080p) + "el que te salva / [la juntada]"; (2) cenitales VERTICALES de a uno (1.6s c/u, nano_banana desenvolvió los 6 desde la cenital real IMG_9603; recortados con remove_background de Higgsfield + sombra sintética CSS — el keyeo por color falló con glaseados claros), nombre al lado (sin precio); (3) cierre: los 6 en fila + DOS cápsulas de precio ($5.500 manzana·chips·limón / $7.000 chocolatoso·carrot·frutos secos) + "los mates los pone otro." + sello. (Precios act. 16/06: antes era único "$4.500 — el que sea"; ahora dos niveles — chocolatoso/carrot/frutos secos $7.000, resto $5.500. Se eliminó el "el que sea". El precio va SOLO en el cierre, no en los individuales — evita redundancia.) Primera placa de producto sobre CREMA. Entregados: `budines — video (17s).mp4` + `budines — placa estatica.png` (= still frame 505). Comp `BudinesVideo` (`PlacaBudinesVideo.tsx`); assets en `public/media/tv/budines/` (gitignored — backup en `_opciones budines/generaciones-ia/`). Generaciones: 10 nano_banana (correcciones: chocolatoso masa/glaseado, manzana proporción de molde) + 6 remove_background + 2 Seedance (quedó la 1080p job 977ae7dc).

**SANGUCHITOS (producto, 2 placas de 8s c/u) — PRODUCIDAS 11/06, esperando aprobación final.** Estilo "cartel de producto" minimal calcado de la placa café (decisión Luciano tras 5 iteraciones de mockup: matar el copy del partido largo, matar sol/sparkles — producto + nombre + precio). Placa 1 "sanguchito": hero squeeze (mano apretando el pan de papa, Seedance job 3703da78, espejado) + "pan de papa, jamón y queso" + $1.200. Placa 2 "caja x 9": "para el partido" + $10.000, push-in por código. Elementos CREMA oficiales del set `Off_white_blue` (sello + moneda D, nuevos en `assets/tv/` y `TV_GRAFICA`). Comp `SanguchitoVideo` / `SanguchitoCajaVideo` (`PlacaSanguchitoVideo.tsx`, sirve para ambas por props). NO usar "pebete" (es pan de papa) ni "juntada" (es de budines). Estáticas = frame 200.

**Pendiente:**
- TV contenido (videos mood): manos/proceso, mostrador, medialunas+café, pan en canasta, lluvia/torta, drone Villa Allende. Requiere Seedance (~20 créditos c/u) + bajar un aéreo real del drone (los buenos están "online only" en Drive).

## Componentes (Remotion `src/components/`)
`PlacaDesayuno(Video)`, `PlacaCriollos(Video)`, `PlacaHorarios(Video)`, `PlacaDelivery(Video)`, `PlacaProducto(Video)`, `PlacaInfo`. Brand kit en `src/brand.ts` (paleta, Niveau, `TV_GRAFICA`/`TV_DELIVERY`). Heroes/clips en `public/media/tv` y `public/assets/tv`. Chroma-key: `scripts/key_chroma.py`.

## Datos
- **Precios: `motor-contenido/remotion/src/precios.ts` — FUENTE ÚNICA, verificada contra Odoo en vivo.** Ningún precio se hardcodea en un componente ni se pasa suelto por `--props`. Los props de las 6 placas de producto del lote viven en `src/placasProducto.ts` y cada una tiene composición propia (`ProductoMedialunas`, `ProductoTorta`, …, + `…Video`).
- **Cómo se lee un precio de Odoo:** `product.template.list_price` está en **NETO** → mostrador = `list_price × (1 + IVA)` (panificado 10,5% · pastelería/salado 21%). Los **combos** (`product.combo`) cobran un total propio que se reparte entre los componentes: el precio real se confirma mirando lo que cobró el POS (`pos.order.line.price_subtotal_incl` de las líneas hijas), **NO** sumando los sueltos. Conexión y API key: memoria `odoo-conexion-dimanche`.
- Notion DB **Productos** (**Precio Local**) queda como referencia de marca, pero **manda Odoo** (es lo que cobra la caja).
- Fotos/clips base: Drive `06_Marketing/01_Fotos/1_Listas-para-publicar` + `2_Material-crudo`, `02_Videos`, `04_Packaging`.
- WhatsApp `wa.me/5493516639003` · Instagram `@dimanchepanaderia`.

## Cómo retomar (otra sesión)
1. Abrí Claude Code en el repo y decí: **"leé ESTADO.md, docs/placas-tv.md y la memoria; retomemos las placas TV DE A UNA, empecemos por <placa>"**.
2. Elegí UNA placa. Concepto + mockup primero, ajustás, recién ahí movimiento, y se cierra antes de pasar a la siguiente.
3. Render: `cd motor-contenido/remotion && npx remotion studio` (preview) · `npx remotion render <Comp> <salida.mp4>` / `still <Comp> <salida.png>`.
4. **Estáticas: siempre con `--frame=60`** (o el frame asentado de la pieza). El sello y los textos entran con spring, así que en el frame 0 salen invisibles — así se rindió en blanco más de una vez.

## ⚠ CAMBIO DE MOTOR (2026-09-25): Higgsfield afuera, fal.ai adentro
**Luciano dio de baja Higgsfield.** El MCP ya no se conecta. El reemplazo está probado
y en producción:

| Antes (Higgsfield) | Ahora |
|---|---|
| `generate_image` con `nano_banana_2` (MCP + OAuth + créditos) | **fal.ai `nano-banana/edit`** — misma familia de modelo, API key en `.env`, ~US$0,04/imagen · `motor-contenido/scripts/hero_ia.py generar` |
| `remove_background` (créditos) | **`rembg` local y gratis** · `hero_ia.py recortar` |

Sale **más barato y más simple para el equipo**: no hay OAuth que caduque ni créditos
que administrar. Verificado el 25/09 regenerando el hero de chipa (bolsa kraft volcando
chipas): producto y packaging idénticos, misma calidad.

**Para que Anto lo use hay una skill dedicada: `dimanche-tv`** (con el formato, los
precios de Odoo y Zignia en `references/`). Su guía: `docs/anto-tvs.md`.

## Producción visual: FOTO DE CELU + IA (act. 2026-08-29)
**Decisión de Luciano (29/08): no usar más la sesión vieja de `01_Fotos` — “fotos aburridas de la sesión esa vieja”.** El material bueno son **fotos nuevas de celu del producto real**, tocadas con IA. Banco de referencias reales: **`Desktop/referencias diseño agencia/menu board/`** (chipa ×5, criollos, medialuna, factura con crema, sanguchito, caja x9, + refs de menu board de Starbucks). Ahí también viven `Elementos_Graficos/` y `Logos/` del set de marca.

**El camino, punta a punta** (validado con la placa de chipa):
1. **Foto de celu real** del producto (Luciano / el equipo del local).
2. `python3 motor-contenido/scripts/foto_celu.py base <foto> <base.jpg> --centro 0.58` → recorte 16:9. Sin esto el modelo recompone el encuadre solo.
3. **IA que cambia SOLO el entorno**: `generate_image` con **`nano_banana_2`**, `medias[].role = image_references`, 16:9, `resolution 2k`. El prompt tiene que decir explícito *“EXACTLY the same roll as in the reference image … Do NOT restyle, reshape, smooth or re-bake it, keep every crack and blemish and the same camera angle. Change ONLY the surroundings”*. Así **mantiene el producto idéntico** — que era la duda de la decisión del 18/06.
4. **`remove_background`** sobre el job anterior → PNG con alfa.
5. `python3 motor-contenido/scripts/foto_celu.py trim <descargado.png> <public/media/tv/<prod>/<prod>-cut.png>` → recorta al bbox del alfa y deja una **miniatura aplanada** para poder mirarla (el lector de imágenes rechaza los PNG grandes con alfa).
6. **Montaje por código** en Remotion, sobre el cobalto EXACTO de marca + sombra de contacto sintética.

**Por qué se recorta en vez de usar el fondo generado:** el cobalto que devuelve la IA sale **violáceo**, no `#3559E0`. El color lo pone el código, nunca el modelo. (Misma conclusión que budines: recortar > igualar fondos.)

**Costo:** 2 variantes 2k + 1 recorte ≈ centavos de crédito. Saldo Higgsfield al 29/08: **1.138 créditos**.

**Dirección de arte (act. 29/08, tras el rechazo del "monumento" de chipa — "un espanto"):**
- **Contexto de USO, no producto flotando**: packaging real de la marca en escena (bolsa blanca de estampas, vaso cobalto, papel con monogramas — refs en `menu board/`), manos/personas anónimas (validado en Día del Padre), mesa/luz de mañana.
- **Fondo CRUDO (crema) antes que cobalto pleno** — a Luciano le rinde mejor en pantalla. La tipografía va COBALTO sobre el crudo.
- **Dos referencias por generación**: la foto de celu del producto + la foto del packaging. `nano_banana_2` mantiene los dos idénticos si el prompt lo exige ("EXACTLY that bag", "EXACTLY that cup"). Pedir en el prompt que una zona quede calma para la tipografía.
- **La sesión vieja de `01_Fotos` NO se usa más** ("fotos aburridas de la sesión esa vieja") — la base son fotos nuevas de celu (las carga Luciano/Nuria en `referencias diseño agencia/menu board/`).
- Componente: `PlacaEscenaVideo` (una entrada por escena en `Root.tsx`: `ChipaEscena`, `MedialunaCafe`, …).

**Formato PROMO BOARD (3ª ronda 29/08 — el que más gustó):** copiar el lenguaje de las refs de menu board que cargó Luciano (`menu board/_ (*).jpeg`): fondo sólido + marco hairline + producto EN USO (mano entrando del borde, bolsa kraft chica — NO la de delivery —, bandeja de ACERO inoxidable, vaso oficial) + palabras gigantes apiladas en DOS colores (cobalto + tinta `#1E1E1E`, no todo azul) + cápsula de precio + sello. Componente `PlacaPromoVideo` (comps `ChipaKraft`, `ChipaAcero`, `MedialunaPromo`). **Generar el hero DIRECTO sobre crema `#E9E3D9` (pedirlo por hex en el prompt, sin línea de horizonte, con una zona reservada "for typography") y usarlo full-bleed** — sombras reales; `remove_background` deja los brazos fantasma en escenas con gente, no recortar. Nada de utilería fea de las fotos base (canasto de mimbre): la IA la reemplaza por acero/kraft.

**Lo que la IA NO puede inventar:** un interior que nunca vio. Chipa partido al medio, miga cortado mostrando las capas, cookie de nutella partida — esas fotos hay que sacarlas. Los **gestos** (una mano) tampoco: valen más que cualquier generación.

## Romper el molde — un MECANISMO por placa (act. 2026-08-29)
**Rechazo de Luciano (29/08): "son todos iguales, muy plano".** Cambiarle el precio a una placa del
lote no la arregla: el problema es que las 6 comparten la MISMA arquitectura (`PlacaProducto`:
producto recortado a la derecha · columna de texto a la izquierda · precio grande). La salida no es
retocar el molde, es que **cada placa tenga su propio mecanismo** — su arquitectura y su movimiento.

Mecanismos ya usados (no repetir, seguir inventando):
- **macro a sangre + banda crema** — el producto ocupa todo el cuadro; el texto tiene piso propio. Movimiento: pull-back. (`CookiesMacro`)
- **poster / masthead cobalto sólido** — banda de color arriba con el título, producto a color pleno abajo. (`CookiesPoster`)
- **panel crema a la derecha que se abre** — el espejo del molde, con hairline que se dibuja. (`CookiesPanel`)
- **editorial: la tipografía DENTRO de la foto** — el texto vive en la pared cobalto real de la sesión propia; sin banda, sin panel, sin recorte. (`MasasVideo`)
- **montaje / corte seco** — la placa se mueve por CORTE entre 3 tomas reales, con el copy completándose al ritmo de los cortes. Es lo más trabajado y se lo lleva el producto estrella. (`MedialunasVideo`)
- ya cerrados antes: pila generada (criollos) · escena ilustrada + clip real compositado (delivery) · catálogo de a uno + cierre (budines) · cartel minimal (sanguchitos) · menu board editorial (horarios).

**Dos reglas que salieron de esta pasada:**
1. **El precio no va en todas.** Solo donde la decisión de compra lo necesita: **café/desayuno, criollos y sanguchitos**. En el resto el precio ocupaba el lugar del concepto. Y sacar el precio SIN cambiar el mecanismo deja la placa más vacía, no mejor: van juntos.
2. **Verificar en Odoo que el producto de la placa se venda HOY**, antes de producir. Chequeo: `available_in_pos` + `active` + venta en los últimos 60 días (`pos.order.line`). El 29/08 apareció que la cookie más vendida (`MA0017`, rellena de nutella, $457.632/60d) **no tiene foto en el banco**, y que había que nombrar "rocklets" (`MA0024`) y no "confites".

**Material real primero:** antes de generar nada con IA, barrer `06_Marketing/01_Fotos/<producto>/` — ahí aparecieron el gesto de mojar la medialuna en el café (`medialunas-facturas_17`), la mesa editorial de masas (`masas-finas_04`) y 5 tomas de cookies. Composición por código sobre foto real = cero créditos.

## Zignia — la plataforma de las TVs (act. 2026-08-30)
`gett.zignia.net` (login de Luciano). Estructura: **Dispositivos** (los 3 TVs por local) → **Librería**
(imágenes/videos) → **Listas de reproducción** → el device corre una lista.

**Gauss al 30/08:** `tv 1 izq` y `tv 3 derecha` corren la lista **producto** (= budines · horarios ·
delivery, 41 s) · `tv 2 central` corre **info** (= horarios · delivery, 24 s). O sea: horarios y
delivery están **duplicados en los tres**, y criollos / desayuno / Día del Padre están en la
librería pero **no salen en ningún TV**. Los que sí están al aire con **precio viejo**: budines
("$4.500 el que sea") y la imagen sanguchitos caja x9 ($10.000).

⛔ **NO se puede subir media por automatización.** Probado 3 veces (30/08) con dos nombres y dos
codificaciones distintas: el archivo entra, el nombre queda bien, pero **`Duración: 0 seg` y sin
miniatura** → inservible en una lista, y la duración **no es editable** en el editor de listas.
Causa: Zignia calcula duración y poster **en el navegador** al elegir el archivo con el selector
nativo; un archivo inyectado por automatización se saltea ese paso. Descartado que sea el archivo:
el mp4 nuevo es idéntico en codec/pixel format/duración al `desayuno` que sí funciona ahí.
**La carga la tiene que hacer una persona arrastrando el archivo.** (Vía alternativa sin probar:
dar permiso de **Accesibilidad** a osascript para manejar el selector nativo del sistema.)

**Dejar los archivos en `~/Desktop/PARA SUBIR A ZIGNIA/`** con nombre que incluya el precio, para
que se arrastren de una.

⚠ **Cuidado al borrar en la Librería:** las tarjetas son una grilla y el buscador de elementos por
lenguaje natural **asocia mal el botón de basura** (el 30/08 borré `sanguchito — video` creyendo que
borraba otra cosa). Borrar SIEMPRE por coordenada tomada de una captura fresca y verificar con otra
captura después.

## Actualizar precios (act. 2026-08-29)
1. Leé Odoo en vivo (ver **Datos**) y actualizá **solo** `src/precios.ts` (cada entrada lleva su código de Odoo).
2. Re-renderizá las placas tocadas, estática (`--frame=60`) + video.
3. Copiá los entregables a `Desktop/referencias diseño agencia/menu board/producido por claude/` y subilos a la app de las TVs.

**Pasada 2026-08-30 — café y promo café** (precios que pasó Luciano, verificados en Odoo):
promo café **chica $4.400** (CO0011) y **grande $5.200** (CO0012) · café **chico $3.300** (CA0002,
8 oz) y **grande $4.300** (CA0001, 16 oz, sin cambio). La placa del desayuno pasó a mostrar **los
dos tamaños** de la promo (antes solo uno) y se la renombró conceptualmente "promo café", que es
como la llama el equipo. La placa de **café** vivía en `TV medio — info/` pero usa el molde de
PRODUCTO y sus props también se habían perdido dentro del PNG: ahora está en `placasProducto.ts`
como `ProductoCafe`.

⚠ **Gotcha de IVA en combos MIXTOS (me equivoqué el 30/08):** el combo reparte su neto 50/50 entre
las patas, así que el multiplicador efectivo es el **promedio de las alícuotas**, no la del cabecera.
Desayuno = café 21% + panificado 10,5% → **×1,1575**. `list_price 3.801,28 × 1,1575 = $4.400`.
Aplicarle 21% da $4.599 y es incorrecto.

**Última pasada — 2026-08-29** (precios del aumento del 20/08, que las placas no tenían): desayuno $3.700→**$4.000** (CO0011; confirmado con ventas reales del POS: 2.090,71 + 1.909,29) · criollo común $7.500→**$8.600** y hojaldre $8.500→**$9.800** (PA0004/PA0005) · sanguchito $1.200→**$1.600** (SA0016) y caja x9 $10.000→**$14.000** (CO0015) · medialunas media docena $5.000→**$6.000** y docena $10.000→**$12.000** (CO0001/CO0002, el combo toma factura *o* medialuna) · masas finas $23.000→**$25.000**/kg y coquitos con cereza $23.000→**$25.000**/kg (MA0010) · muffin $1.500→**"desde $1.600"** (arándano $1.600 / vainilla DDL $1.700, dos precios distintos) · torta de chocolate porción $4.900→**$5.200** y entera $40.500→**$46.500** (PE0030 Torta bombón de chocolate, confirmado por Luciano). **Budines** ya estaba bien en código ($5.500/$7.000) pero el mp4/png entregado seguía diciendo "$4.500 el que sea" → re-renderizado. **Pan casero: Luciano lo dejó afuera** (no está confirmado qué pan es; el único pan por kilo a $5.500 en Odoo es PA0021 Pan salvado, que no cambió).
