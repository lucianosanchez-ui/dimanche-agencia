---
name: dimanche-tv
description: Produce y actualiza las placas de las TVs de los locales de Dimanche — de punta a punta: mira en Odoo qué se vende y a qué precio, parte de una foto REAL, genera el hero con IA (fal.ai), compone la placa por código en Remotion, renderiza estática + video y la deja lista para subir a Zignia. Usá SIEMPRE que alguien mencione las TVs, las pantallas del local, el menu board, una placa, cambiar un precio de una placa, o Zignia. Trigger también con "hay que actualizar la pantalla", "cambió el precio del café", "quiero una placa de X", "subir a las TVs", "el cartel de la tele".
---

# dimanche-tv — Las placas de las pantallas del local

Hacés las piezas que se ven en las TVs de Villa Allende, Gauss y Boulevares.

**Quién te va a hablar:** normalmente **Anto** o **Luciano**. Anto no es técnica y no
tiene por qué serlo: vos hacés el trabajo, ella decide. **Andá de a un paso y de a
una pregunta**, en castellano, sin jerga. Nunca le pidas que edite código ni que
entienda un render — mostrale la placa y preguntale si va.

## Las 3 pantallas de cada local
**◀ IZQUIERDA = producto** · **▦ MEDIO = info** (horarios, delivery, medios de pago) · **▶ DERECHA = contenido/mood**

## Las reglas que no se rompen

1. **La foto SIEMPRE es real.** La IA compone la escena (mesa, luz, mano, fondo);
   nunca inventa un producto. Si no hay foto del producto, se pide una del celu —
   y se espera. **Banco de fotos reales (en el Drive, lo ven las dos máquinas):**
   `~/Library/CloudStorage/GoogleDrive-lucianosanchez@panaderiadimanche.ar/Mi unidad/06_Marketing/00_Marca/referencias diseño agencia/menu board/`
   Ahí están las fotos de celu del producto, el packaging (bolsa kraft, vaso, bolsa
   de delivery), `Elementos_Graficos/`, `Logos/` y las referencias de menu board.
2. **Los precios salen de Odoo, no de la cabeza.** Fuente única en el repo:
   `motor-contenido/remotion/src/precios.ts`. Cómo leerlos bien (los combos tienen
   trampa) → `references/precios-odoo.md`.
3. **El precio NO va en todas las placas.** Solo donde decide la compra: **café/promo
   café, criollos y sanguchitos**. En el resto el número le come el lugar al concepto.
4. **Un MECANISMO por placa.** Si todas comparten la misma arquitectura salen planas
   y Luciano las rechaza (pasó dos veces). El catálogo de mecanismos ya usados y el
   formato que funciona están en `references/formato-promo-board.md`.
5. **Verificá en Odoo que el producto se venda HOY** antes de producir. Se hizo una
   placa de muffin que está en el puesto 127 de 147.
6. **Nada se sube sin el OK** de Luciano o Anto. Todo nace Propuesto.

## El camino completo

**1 · Qué placa** — Preguntá qué producto. Si no lo tienen claro, mirá en Odoo qué
vende y qué hueco hay (`references/precios-odoo.md` trae la consulta).

**2 · El precio** — Si la placa lleva precio, leelo de Odoo y actualizá `precios.ts`.
Si solo hay que cambiar un precio y nada más, saltá al paso 6.

**3 · La foto real** — Buscá en `referencias diseño agencia/menu board/`. Si no está,
pedí una foto del celu y decí exactamente qué querés ver (producto lleno, luz de día,
fondo liso, horizontal). **Sin foto no hay placa.**

**4 · El hero con IA** — `motor-contenido/scripts/hero_ia.py generar`. La receta del
prompt que funciona está en `references/formato-promo-board.md`. Cuesta ~US$0,04 por
imagen. Mostrale el resultado antes de seguir.

**5 · Componer** — La placa se arma por código en Remotion
(`motor-contenido/remotion/src/components/`). El formato aprobado es `PlacaPromoVideo`.
Registrá la composición nueva en `Root.tsx`.

**6 · Renderizar** — Estática **siempre con `--frame=180`** (en el frame 0 el sello y
los textos están invisibles porque entran con animación) + el video de 8s:
```
cd motor-contenido/remotion
npx remotion still <Comp> out/<nombre>.png --frame=180
npx remotion render <Comp> out/<nombre>.mp4
```

**7 · Mostrar y dejar listo** — Mostrale la placa. Con el OK, copiá el archivo a
`~/Desktop/PARA SUBIR A ZIGNIA/` con un nombre claro (creá la carpeta si no existe).

**8 · Subir a Zignia** — Lo hace ella a mano, arrastrando. **No se puede automatizar**
(el navegador calcula la duración con el selector nativo; si lo subo yo queda en 0
segundos). Los pasos exactos → `references/zignia.md`.

## Si solo hay que cambiar un precio
Es el caso más común y es corto: leé el precio nuevo de Odoo → editalo en
`precios.ts` → re-renderizá las placas que lo muestran → dejalas en la carpeta.
Nunca hardcodees un precio dentro de un componente.

## Qué NO hacer
- No usar la sesión de fotos vieja de `06_Marketing/01_Fotos` (Luciano: "fotos
  aburridas de la sesión esa vieja"). Las bases son fotos nuevas de celu.
- No sacarle el precio a una placa sin cambiarle el mecanismo: queda más vacía, no mejor.
- No recortar con `rembg` una escena con manos o personas: quedan fantasma. En ese
  caso el hero se genera directo sobre el crema y se usa a sangre.
- No inventar un precio ni redondearlo a ojo.

## Herramientas
| Para qué | Con qué |
|---|---|
| Precios reales | Odoo por XML-RPC → `references/precios-odoo.md` |
| Recortar la foto base a 16:9 | `motor-contenido/scripts/foto_celu.py base` |
| Generar el hero con IA | `motor-contenido/scripts/hero_ia.py generar` (fal.ai) |
| Recortar fondo | `motor-contenido/scripts/hero_ia.py recortar` (rembg, gratis) |
| Componer y renderizar | Remotion, en `motor-contenido/remotion/` |

Historial completo y decisiones de diseño: `docs/placas-tv.md`.
