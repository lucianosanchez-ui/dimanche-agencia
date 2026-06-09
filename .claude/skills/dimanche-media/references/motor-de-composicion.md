# Motor de composición — la pieza completa por código (sin Canva)

> **Decidido con Luciano el 2026-06-08 (sesión 9).** Reemplaza a Canva en TODO el flujo. La pieza sale **completa y lista para publicar** (foto + texto + logo + íconos + badge), **sin trabajo manual** y **sin que la IA escriba el texto**. Excepción: piezas que no llevan capa gráfica (un mood/fondo/textura suelto) salen solo del hero.

## El principio
Dos capas, cada una con su responsable:
1. **HERO (la foto) → IA.** Higgsfield / Nano Banana genera el hero premium **anclado a una foto real del producto** (regla de oro: el producto se mantiene intacto, el fondo lo construye el prompt — norte Villa Allende). Ver `herramientas.md` y `sistema-visual-dimanche.md`.
2. **CAPA GRÁFICA (texto + logo + íconos + badge + acento azul) → CÓDIGO.** Se compone programáticamente sobre el hero, con Niveau embebida y los assets reales del Drive. El resultado es el archivo final listo para publicar.

**Por qué así (y no las dos alternativas que descartamos):**
- **Canva → afuera.** Es manual (no "lista sin tocar nada") y quedaba malísimo, sobre todo en TV/motion.
- **Que la IA escriba el texto/logo → no.** Alucina la tipografía y deforma el logo. El texto y el logo son **datos exactos**: los pone el código, perfectos, siempre iguales = consistencia de marca.

## Herramientas (todas gratis para Dimanche)
| Output | Motor | Notas |
|---|---|---|
| **Imágenes estáticas** (feed, story, carrusel, placa, folleto) | **Satori** (JSX+CSS → SVG → PNG vía Sharp/Resvg) o **PIL** (ya está en el repo) | Satori = layout tipo HTML/CSS, lindo para plantillas; PIL = más bajo nivel, ya disponible. Soportan fuente custom (Niveau OTF). |
| **Video / TV / reels** (movimiento, loops, datos que cambian: precios/combos) | **Revideo** (MIT, self-host gratis) o **Remotion**, tomando el hero/clip de Higgsfield de base | **Revideo = gratis** sin importar el tamaño de la empresa (fork MIT de Motion Canvas; cuesta DevOps de mantener Chromium headless). **Remotion** es más maduro pero para Dimanche (for-profit con >3 empleados) **requiere Company License de pago** (~US$25/dev/mes, mín. ~US$100/mes) — NO entra al tier gratis. **Creatomate** (US$29/mes, API, cero infra) = plan B. Decidir según si hay quién mantenga el self-host. Ver [[video-por-codigo-revideo]]. |

**Adobe queda afuera:** Firefly Services API es enterprise (US$1.000+/mes + créditos + semanas de integración); Adobe Express es UI manual = mismo problema que Canva.

## Assets que consume el código (del Drive de Dimanche)
- **Tipografía:** Niveau Grotesk (OTF) — embebida en el render, no se sustituye por fallback.
- **Logo:** los PNG reales (`00_Marca/Logos`, p. ej. wordmark blanco para fondo oscuro).
- **Íconos:** los reales de `00_Marca/Elementos_Graficos` (sol/pan/croissant/torta/galleta/monograma D) — silueta plana rellena en cobalto; sobre foto se usan en blanco. No dibujar a código ni inventar variantes.
- **Badge / lockup / grilla / escala tipográfica:** según `design-system.md`, `foundations.md`, `components.md`, `templates.md`.

## Flujo de una pieza completa
1. **Hero** (regla de oro): foto real del producto → Higgsfield/Nano Banana arma la escena premium por prompt (ver `herramientas.md`). El producto se mantiene; el fondo lo dicta el prompt; nada de "exact style of the references".
2. **Plantilla por formato** (grilla y zonas seguras de `templates.md`): feed 4:5, story/reel 9:16, carrusel 4:5 (hasta 20), placa TV 16:9, folleto.
3. **Componer por código:** titular en Niveau (escala de `foundations.md`, máx 2 pesos, oración salvo Display/Antetítulo), logo PNG real, íconos reales, badge D, acento/objeto cobalto **según formato** (ver "Firma de color" en `sistema-visual-dimanche.md`), scrim para legibilidad.
4. **Output:** PNG (estática) o MP4 (video) **final, listo para publicar**.
5. **`dimanche-brand-check`** (paleta, sin naranja, sin emojis, premium = piso ni de altar ni loud, deadpan/dato real sin adjetivos, objeto azul con sentido).
6. **Propuesto** en Notion (gate humano) → `dimanche-calendario` → `dimanche-local` si aplica.

## Reglas que el motor no rompe
- **Texto exacto por código, nunca IA, nunca a mano.** Niveau embebida.
- **Logo e íconos = assets reales del Drive**, posicionados por código.
- **Sin emojis, sin naranja.** Cobalto `#3559E0` / crema `#E9E3D9`.
- **Premium = piso accesible**, con gente y vida; ni de altar ni loud.
- **Objeto azul por formato y con sentido** (ver `sistema-visual-dimanche.md` §1).
- **Texto en registro deadpan / dato real sin adjetivos** (ver `dimanche-copy`).

## Estado (qué falta construir)
Las **plantillas de código por formato** todavía no están hechas — es el próximo entregable del frente de contenido. Mientras no estén, una pieza puntual se puede componer **ad-hoc con PIL** siguiendo `design-system.md` (jamás Canva). Cuando se construyan, vivirán en el repo (carpeta de plantillas) y serán la forma estándar de producir.
