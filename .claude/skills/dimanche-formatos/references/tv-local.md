# TV del local (pantallas) — playbook Dimanche

> El playbook **de formato** (propósito/specs/jerarquía/anclas). El **detalle QSR completo** (dwell, loop, dayparting, jerarquía tipográfica px, movimiento, checklist de 11 puntos) vive en **`dimanche-media/references/pantallas-tv-local.md`** — leerlo para producir. Acá: la vista de formato + reconciliación con el norte.

## 1. Propósito y función
**Vender en la cola de mostrador** (vista 2,5-5 m, local físico, no drive-thru). Captura el antojo en el punto exacto de decisión y sube el ticket vía combos. Atención: el cliente está cautivo en la cola, pero la lee de reojo → **se entiende en <3 s o falló**. Pilar POL-015: producto/combo/novedad, con **dayparting** (desayuno / almuerzo / merienda).

## 2. Specs técnicas
- **16:9 horizontal**, 1080p mínimo, **4K** ideal cerca de ventanas.
- **Loop 50-72 s**, **5-8 placas**. Dwell: visual+titular 6-10 s; placa con texto/combo 15-20 s; nunca <8 s.
- Legibilidad: ~2,5 cm de alto de letra por cada 3 m, usar 1,5-2× ese mínimo. Contraste mín. 4,5:1, **7:1 en precios**.
- Niveau Grotesk Medium/Bold/Black (evitar finos/script). → tabla de px por jerarquía: `pantallas-tv-local.md` §2.

## 3. Jerarquía y lectura
**1 mensaje por placa** (hero O categoría, nunca ambos). En placa-menú el **precio es protagonista** (alto contraste, pegado al nombre); en placa-hero el precio puede omitirse para vender deseo. Mezcla del loop: hero a sangre · combo · novedad/temporada · marca/mood · menú-precios. Logo discreto en **lugar fijo** en todas.

## 4. Anatomía Dimanche
**Foto a sangre (full-bleed)** con overlay para la placa hero; **foto recortada sobre color sólido** para combos/menú. Movimiento **sutil con easing**: push-in lento / vapor en loop seamless; el texto entra con fade. **Anima el ambiente, nunca el producto ni el logo.** → movimiento detallado: `pantallas-tv-local.md` §3 + `templates.md`.

**Reconciliación con el norte (importante):** el viejo `pantallas-tv-local.md` dice "azul `#3559E0` como fondo pleno". El norte (`sistema-visual-dimanche.md`) lo acota: el **azul dominante como fondo va SOLO en placas con texto** (menú/precios/mood) — para máximo contraste —, **no como regla general**. Las placas hero van **foto a sangre** con overlay, no fondo azul. (Pendiente menor: bajar esta aclaración al propio `pantallas-tv-local.md`.)

## 5. Do's & Don'ts Dimanche
**SÍ:** 1 mensaje por placa, foto que abre apetito, precio legible a 4 m, fondo azul sólido **solo en placas-texto**, movimiento sutil con easing, dayparting. **NO:** menú sobrecargado de ítems, texto sobre foto sin overlay, fuentes finas/script, placa estática que nunca cambia, todo moviéndose a la vez, precios poco visibles, naranja/emojis.

## 6. Anclas que mejor funcionan acá
- **Caliente / recién hecho** (placa hero de lo que sale ahora del horno).
- **Combos** (el "y con esto…": medialuna + café) — sube ticket.
- **Clima → calentito** (placa rotativa de día fresco).
- **El clásico / marca-mood** (placa de identidad sin precio).
- Menos: refranero largo (no se lee en la cola).

## 7. Ejemplo desarrollado — placa combo desayuno (daypart mañana)
- **Fondo:** azul `#3559E0` pleno (placa-menú con texto → acá sí va el azul dominante).
- **Foto:** medialunas + café recortadas sobre el azul (producto real).
- **Titular:** `Combo desayuno` (Niveau Bold) · **Precio:** `$X` (Niveau Black, 7:1, pegado al nombre).
- **Movimiento:** vapor sutil del café en loop seamless 6-10 s; texto fijo.
- Logo D fijo esquina. Dwell 15-20 s. Asignada al daypart desayuno. → producción: `pantallas-tv-local.md` checklist.

## 8. Errores típicos
1. Menú sobrecargado (nadie lo lee en la cola).
2. Texto sobre foto sin overlay → ilegible.
3. Placas que nunca cambian (vs. dayparting) → la gente deja de mirarlas.
4. Movimiento permanente que distrae en vez de dirigir.
5. Precio poco visible / fuente fina.
6. **El gap abierto:** foto de producto floja. El estándar QSR pide foto excelente y actual; las de Dimanche hoy son viejas. → **decisión abierta de Luciano** (`pantallas-tv-local.md` §"Regla de oro vs calidad"): (a) sesión real, (b) IA alta calidad, (c) híbrido. El motor de video (Revideo/Creatomate) **rotula** pero no resuelve la calidad de la foto base.

---
Specs verificados: 2026-06-07 · Detalle de producción: dimanche-media/references/pantallas-tv-local.md · Mejora continua: Numa + watch. Valida: dimanche-brand-check. Nace Propuesto.
