# Design System de Dimanche — cómo se arma una pieza

> Cómo se ven y se arman las piezas de contenido: la **grilla, los textos, los elementos gráficos, el logo, el color** y las **anclas de contenido**. Anclado en lo que YA existe y funciona: piezas reales del Drive (`06_Marketing/03_Piezas/Redes`), los elementos de `00_Marca/Elementos_Graficos`, el `Manual_de_Marca.pdf` y REF-002 (Notion). Escrito para que cualquiera arme una pieza on-brand, aunque no sepa diseño. Producción: **Canva** con el brand kit "Dimanche". Complementa `sistema-visual-dimanche.md`.

## El principio: foto real + capa gráfica de marca
El contenido de Dimanche **NO es un hero de IA.** Es:
1. una **foto real** — del Drive, o **una foto del celu** (y si hace falta una mejor, se pide; **no hacemos sesiones de fotos**),
2. + la **capa gráfica de marca** encima (ícono + titular + badge),
3. armada en **Canva**.

La IA (Higgsfield) queda **solo** para cuando necesitás una toma/escena que no tenés. Lo identificable siempre parte de algo real (regla de oro).

## La plantilla (anatomía de una pieza)
El patrón de las piezas que ya funcionan, de arriba a abajo:
1. **Ícono de marca** (línea, blanco sobre la foto) — arriba, centrado. El que pegue con el mensaje (sol, paraguas, producto…).
2. **Titular** — Niveau Grotesk, blanco, centrado, corto, con ingenio.
3. **Foto real full-bleed** — ocupa todo el fondo. Cálida, apetitosa, en contexto.
4. **Badge circular de la "D"** — abajo, centrado (cobalto sobre blanco, o blanco).

Márgenes generosos; el texto nunca pegado al borde; respetar safe area (que la UI de IG no tape nada).

## Formatos
- **Story / portada de reel:** 9:16
- **Post / carrusel:** 4:5 (gana grilla)
- **Feed cuadrado:** 1:1
- **TV del local:** 16:9

Mismo sistema, adaptando la plantilla a cada formato.

## Tipografía
- **Niveau Grotesk, única fuente** (REF-002). *La "Bubbly" del Drive es vieja, no se usa.*
- "Jugar con la tipo" = jugar **con Niveau**: pesos (Light → Black), escala, mayúsculas vs. oración. No sumar otra fuente.
- Patrones de titular que ya funcionan:
  - **Caps punchy:** `HAY CRIOLLOS CALENTITOS!` (Bold/Black, mayúsculas — inmediato, casual).
  - **Setup + frase:** **Plan perfecto:** lluvia afuera, algo rico de Dimanche adentro. (bold el gancho + regular el resto, en oración).
- Blanco sobre la foto · centrado · corto (idealmente ≤ 2 líneas) · con ingenio, **sin marketinería**.

## Elementos gráficos (los "recursos") — Drive `00_Marca/Elementos_Graficos`
Íconos de línea simples, cobalto o blanco:
- **Sol** — domingo / mañana / "olorcito a domingo".
- **Paraguas + lluvia** — día de lluvia o fresco ("algo calentito").
- **Producto** (pan, croissant, torta, galleta) — refuerzan el producto.
- **"D" (monograma)** + lockup **"Con olorcito a domingo"**.
- **Reglas:** 1 ícono por pieza · arriba · blanco sobre foto (o cobalto sobre claro) · tamaño contenido · **cero naranja** (las variantes naranja están deprecadas).
- **Ampliar el set:** sumar íconos contextuales cuando haga falta (mate, café, frío, fecha especial…), mismo estilo de línea simple.

## Color (aplicado)
- Texto e íconos sobre foto: **blanco**.
- **Cobalto `#3559E0`:** badge, bloques/banners, íconos sobre fondo claro.
- **Crema `#E9E3D9`:** fondos cálidos / soporte.
- **CERO naranja.** *(El `Manual_de_Marca.pdf` viejo todavía tiene `#f49739` → ignorarlo; la marca lo retiró el 2026-06-02.)*

## Logo / badge
- **Badge circular de la "D"** ("Panadería · Pastelería") abajo-centro.
- Del Manual: **área de seguridad** (clear space ≈ ancho de la D), **no deformar** (no comprimir/estirar/torcer/diagonal/engrosar), no recolorear fuera de las variantes, **monocromático en tamaños chicos**.

## Anclas de contenido (de qué hablamos — recurrente, siempre aplica)
- **Clima → calentito.** Cuando está **fresco o llueve**, se presta para algo caliente. El clima de Córdoba ya lo tienen los agentes (Open-Meteo en el radar) → se puede **disparar contenido "día de lluvia/fresco, algo calentito"** automáticamente. Ej: paraguas + *"Plan perfecto: lluvia afuera, algo rico de Dimanche adentro."*
- **Caliente / recién hecho.** Siempre empujamos **criollo y chipa CALIENTE**, y **pan recién hecho/recién salido**. El antojo de lo que sale del horno ahora. Ej: *"HAY CRIOLLOS CALENTITOS!"*, *"Chipá caliente"*, *"Pan recién hecho"*.
- **El clásico** (gesto-firma): lo cotidiano elevado, sobrio + un dato real con ingenio.
- **Banco de conceptos:** el momento/contexto (café, mesa, "un martes"), macro/textura (antojo), refranero cordobés, "olorcito a domingo, un martes".

## Cómo se arma (flujo)
1. **Foto real** (Drive o celu; pedir una mejor si hace falta).
2. **Canva** con brand kit "Dimanche": elegir formato → foto full-bleed → ícono arriba → titular Niveau → badge "D".
3. **Brand-check** (tono POL-010, paleta, regla de oro, cero naranja/emojis) → **Propuesto** (gate humano).

> La IA (Higgsfield/nano_banana) entra solo si no tenés la foto: genera la escena partiendo de una referencia real, y el texto/logo igual van en Canva.

## Cómo vive el sistema en las herramientas
El design system (foundations + components + templates + gobernanza) es la **especificación**. Se vuelve usable así:
- **Canva = el hogar de producción.** El **Brand Kit "Dimanche"** (paleta · **Niveau Grotesk** · logo/badge · los 8 íconos) + **Brand Templates con autofill** por formato (story/post/carrusel/TV, con grilla y safe-area ya puestas) → Anto **arrastra la foto y escribe el titular**. *(Las plantillas autollenables todavía hay que construirlas — es el puente de "doc" a "usable".)*
- **Higgsfield (u otra IA) = SOLO la foto/escena**, cuando no hay una real. No hace texto, logo ni layout — eso es Canva.
- **Flujo:** foto real (celu/Drive) **o** Higgsfield → **Canva** (template: foto + ícono + titular + badge) → **brand-check** → **Propuesto** (gate).
- **A futuro (bot-productor):** el bot dispara Higgsfield + el autofill de Canva por API y devuelve la pieza por Telegram (las MCP de ambos ya están conectadas).
