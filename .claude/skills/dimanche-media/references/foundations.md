# Fundamentos del Design System — Dimanche

> Los "átomos" del sistema: **tipografía, grilla/espaciado, color, iconografía.** Medidos sobre un **lienzo de referencia de 1080 px de ancho** (el de IG); escalá proporcional para otros tamaños. Para producir en **Canva**. Fuente de verdad de marca: REF-002 (Notion). Complementa `design-system.md`. (El `Manual_de_Marca.pdf` es viejo — referencia histórica, no manda.)

## 1. Tipografía — Niveau Grotesk (única fuente)
Escala (sobre lienzo 1080 px), de mayor a menor:

| Nivel | Tamaño | Peso | Interlineado | Interletrado | Uso |
|---|---|---|---|---|---|
| **Display** | 120 px | Black | 1.0 | −1% | titular gigante, 1–3 palabras |
| **Titular** | 80 px | Bold | 1.1 | 0 | titular estándar |
| **Subtítulo** | 52 px | Medium | 1.15 | 0 | bajada del titular |
| **Cuerpo** | 32 px | Regular | 1.35 | 0 | texto / descripción |
| **Epígrafe** | 24 px | Light | 1.3 | 0 | dato, fecha, detalle |
| **Antetítulo** | 20 px | Medium · MAYÚS | 1.2 | +8% | etiqueta chica arriba |

**Reglas:**
- **Largo de línea:** máx. ~24–32 caracteres en titulares; un titular respira mejor en 2 líneas que en 1 larga.
- **Mayúsculas:** solo Display punchy y Antetítulo; el resto en **oración** (se lee más cálido).
- **Pesos:** Black/Bold para gritar · Medium/Regular para leer · Light para el detalle. **Máx. 2 pesos por pieza.**
- **"Jugar con la tipo" = jugar con Niveau** (escala, peso, mayúsculas), nunca sumar otra fuente.

## 2. Grilla y espaciado
- **Unidad base: 8 px** (sobre 1080). Todo se mueve en múltiplos.
- **Escala de espaciado:** 8 · 16 · 24 · 32 · 48 · 64 · 96.
- **Margen exterior:** 80 px (≈7.5% del ancho). El contenido nunca pega al borde.
- **Safe area (story 9:16):** dejá libres ~**250 px arriba y abajo** (los tapa la UI de IG).
- **Columna:** la mayoría de las piezas, **una columna centrada**. Para carrusel / piezas con datos: grilla de **6 columnas**.
- **Ritmo vertical:** separá bloques (ícono / titular / pie) en múltiplos de la unidad (24–48).

## 3. Color (a fondo)
| Color | HEX | Rol |
|---|---|---|
| Azul Dimanche | `#3559E0` | primario · badge, bloques, íconos sobre claro |
| Crema | `#E9E3D9` | soporte cálido · fondos suaves |
| Blanco | `#FFFFFF` | fondo principal · texto/íconos sobre foto |
| Negro | `#000000` | texto · monocromo |

- **Tints/shades del azul** (profundidad/estados): oscuro `#2843A8`, claro `#D6DEFB`.
- **Legibilidad:** ✓ blanco/azul · ✓ azul/blanco · ✓ negro/crema · ✗ blanco/crema (no contrasta) · ✗ texto fino azul sobre foto.
- **Texto sobre foto → SIEMPRE scrim:** degradado negro suave (0→40%) detrás del texto, o ubicarlo sobre una zona oscura/simple de la foto. Contraste objetivo ≥ 4.5:1.
- **Cero naranja.**

## 4. Iconografía (spec — para que el set crezca consistente)
- **Estilo:** línea · **un trazo** · **un color** (blanco sobre foto / azul sobre claro).
- **Caja:** cuadrada ~120×120 px (sobre 1080), con ~10% de aire interno.
- **Trazo:** ~6 px (al tamaño de caja) · **puntas y uniones redondeadas**.
- **Silueta:** simple, reconocible al toque (sol, paraguas, taza…).
- **Regla para sumar íconos:** misma caja, mismo grosor de trazo, mismo redondeo, 1 color, simple. **Probar en chico** (que se entienda a 2 cm). Viven en Drive `00_Marca/Elementos_Graficos`.

> Estos son los átomos. Encima van los **componentes** (badge, bloque de titular, banner/cuadro, tag de precio, sticker, lockup) y los **templates por formato** — la capa siguiente.
