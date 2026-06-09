# Playbook: pantallas digitales en local (TV) — patrones de QSR de referencia

> Cómo las marcas líderes (Starbucks, McDonald's, Mostaza) diseñan sus menu boards / TVs de promo, destilado para replicarlo en Dimanche. Contexto Dimanche: **local físico, cola de mostrador, vista 2,5–5 m** (no drive-thru). Fuentes al pie.

> **⚡ Reconciliado con el norte 2026-06-08 (sesión 9):** la placa de TV sale **completa por código**, no a mano. **Motor de motion = Remotion** (React → video), tomando de base el **hero/clip de Higgsfield** (producto real, regla de oro); el texto + logo + íconos + precio los compone el código, con Niveau embebida y assets reales del Drive. **Canva queda AFUERA** (quedaba malísimo en TV). Las placas estáticas simples pueden salir con **PIL** (ya en el repo), nunca Canva. Detalle: `motor-de-composicion.md`. El **hero es foto real + escena premium por prompt** — NO sesiones nuevas, NO producto inventado por IA (ver "Regla de oro" al pie).

## 1. Contenido y cadencia
- **Loop total 50–72 s** (entra en el tiempo de cola), **5–8 placas**.
- **Dwell por placa:** visual + titular corto **6–10 s**; placa con texto/combo **15–20 s**; nunca <8 s.
- **1 mensaje por placa.** Hero O categoría, nunca ambos.
- **Mezcla del loop:** (1) producto **hero** a sangre, (2) **combo** ("y con esto…": medialuna+café), (3) **novedad/temporada**, (4) **marca/mood** (logo + claim, sin precio), (5) **menú-precios** por categoría.
- **Dayparting** (clave en panadería): contenido por franja → **desayuno** (apertura–11: medialunas, café, combo desayuno) · **almuerzo** (11–15: sándwiches, tartas, salado) · **merienda** (15–cierre: pastelería, facturas, café+dulce). Starbucks corre 3 dayparts; McDonald's cambia desayuno→almuerzo automático.
- **Precio:** en placas-menú es protagonista (alto contraste); en placas hero se puede omitir para vender deseo.

## 2. Diseño visual
- **Jerarquía tipográfica** (ref. 55"/1080p; ×2 para 4K): Encabezado 60–80px Bold · Nombre producto 40–55px SemiBold · Precio 45–60px Bold · Descripción 30–40px · Info chica 24–32px.
- **Legibilidad a distancia:** ~2,5 cm de alto de letra por cada 3 m; usar 1,5–2× ese mínimo. Probalo parado en la cola (2,5–4,5 m).
- **Tipografía:** sans gruesa y limpia. Para Dimanche: **Niveau Grotesk** en pesos Medium/Bold/Black para titulares y precio (legible en pantalla); evitar pesos finos y script. (Lección Starbucks: elegí la fuente mirándola EN la TV.)
- **Contraste:** mínimo 4,5:1, apuntar a 7:1 en precios. Nunca texto directo sobre la foto sin overlay oscuro o zona de color sólido. Fondo oscuro + texto claro mejora legibilidad.
- **Fondo de marca:** el azul Dimanche #3559E0 como fondo pleno va **solo en placas con texto** (menú/precios, combos, mood con claim) — ahí da consistencia + máximo contraste, tipo "white-on-black" de Starbucks. **En la placa hero NO hay fondo azul:** es la foto a sangre. El cobalto, en el hero, vive en un detalle real o en la capa gráfica (titular/badge), no como fondo.
- **Foto:** la placa **hero** es **foto real del producto a sangre (full-bleed)** — máximo apetito, regla de oro (producto real, escena premium por prompt; nunca producto inventado por IA); **recortada sobre color sólido** para combos/menú.
- **Texto al mínimo:** titular + 1 línea + precio. Si hay que leer un párrafo, la placa falló.
- **Logo:** discreto, en lugar **fijo** en todas las placas. **Precio** pegado al nombre, peso fuerte.

## 3. Movimiento / animación
**Principio: el movimiento dirige la atención, no compite por ella.** Capturar con movimiento, entregar el mensaje en estático.
- **Usar (sutil, premium):** push-in lento / Ken Burns sobre la foto hero; **steam/vapor** sobre café o producto recién horneado (loop corto, realista); texto que entra con fade/slide suave; transiciones limpias (corte o crossfade ~0,5 s).
- **Easing obligatorio:** ease-in/ease-out, nunca lineal (se ve barato).
- **Loops seamless:** el vapor/zoom cierra sin salto; la placa termina quieta y legible.
- **Video** para apetito (vapor, miel cayendo, corte de medialuna); **motion graphics** para precios/combos/transiciones.
- **Evitar:** todo moviéndose a la vez; texto que rebota/gira/titila; movimiento lineal; transiciones 3D/flips.
- **En Dimanche:** el hero/clip de antojo lo hace **Higgsfield image→video** (clips 3–5 s, empezar por la imagen hero); la **placa con movimiento/datos se arma en Remotion** tomando ese hero/clip de base y componiendo texto, precio, logo e íconos por código (datos que cambian — precios/combos — sin rehacer la pieza). Movimiento mínimo y elegante. **Nunca Canva.**

## 4. Especificaciones y errores
- **Resolución:** 1080p mínimo, **4K** ideal cerca de ventanas/luz. **16:9 horizontal** (estándar TV); 9:16 solo si la pantalla imita una carta parada.
- **Errores a evitar:** menú sobrecargado de ítems; texto sobre foto sin overlay; fuentes finas/script; placas estáticas que nunca cambian (vs dayparting); movimiento permanente distractor; precios poco visibles.
- **Espaciado:** generoso (1,5× interlínea entre ítems, 2,5× entre categorías, márgenes ≥5%).

## 5. Qué imitar de cada marca
- **Starbucks:** tipografía pensada para pantalla + **sistema escalable** (tipografía y paleta desacopladas del contenido → plantillas con estilos maestros) + 3 dayparts; menú sobrio blanco-sobre-negro.
- **McDonald's:** **dayparting dinámico** (desayuno→almuerzo automático, ajusta por hora/clima/temporada) + **apetito a sangre** con foto memorable y combos claros.
- **Mostaza:** **sistema visual fuerte, simple y consistente** aplicado idéntico en app/digital/local; un elemento de marca ancla (la "M") recurrente. → Para Dimanche: identidad coherente en todas las placas + símbolo/marca en lugar fijo.

## Checklist para armar una placa de TV Dimanche
1. ¿Un solo mensaje (hero O categoría)?
2. ¿Foto que abre apetito? (real cuando sea producto identificable; ver regla de oro)
3. ¿Se lee nombre y precio a 4 m? (sans gruesa, 7:1)
4. Si es placa con texto → ¿fondo azul sólido de marca? Si es placa hero → ¿foto real a sangre (sin fondo azul, con overlay donde haya texto)?
5. ¿Texto al mínimo (titular + 1 línea + precio)?
6. ¿Logo en lugar fijo, discreto?
7. ¿Movimiento sutil con easing, o estático? (nada que distraiga)
8. ¿Dwell correcto (6–10 s visual / 15–20 s con texto)?
9. ¿Loop de 50–72 s, 5–8 placas?
10. ¿Asignada a su daypart?
11. ¿16:9, 1080p/4K?

## Regla de oro vs. calidad (cerrado con Luciano, 2026-06-08)
El estándar QSR exige foto de producto **excelente y actual**. Las fotos reales viejas eran flojas, pero la decisión ya está cerrada: **NO sesiones nuevas de fotos** y **NO inventar producto por IA**. El camino es el de toda pieza Dimanche — **híbrido**: el producto sale de una **foto real** (banco del Drive `01_Fotos/Sesiones/Sesion_Principal/Fotos/`, no `01_Fotos/Editadas/`; o foto rápida del celu si hace falta), y la **escena premium la construye el prompt** (Higgsfield/Nano Banana arman el set/mood; el producto se mantiene intacto). El producto se pasa como **referencia de producto, nunca como referencia de fondo** — nada de "exact style/palette of the references". Eso es la regla de oro aplicada a TV.

---
### Fuentes
Seenlabs (tipografía/contraste/densidad QSR) · Scala (best practices QSR) · CrownTV / SignageTube / 21stCenturyAV (dwell/loop) · Screenfeed / Spectrio (motion/easing) · Smartersign / Evergreen (dayparting) · Lettermatic + Pickcel (Starbucks) · Pickcel (McDonald's) · Shakespear Works + Dossiernet (Mostaza) · Stratacache/RBI (escala) · Nento (bakery).
