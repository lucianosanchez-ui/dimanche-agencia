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

## 4. Iconografía — el set REAL (Drive `00_Marca/Elementos_Graficos`)
**Set actual (8 íconos):** pan (×2), croissant, torta, galleta, **sol** ("olorcito a domingo"), **lockup "Con olorcito a domingo"** (sign) y el **monograma D**. Variantes: **cobalto** (carpeta `Blue`) y **cobalto sobre crema** (`Off_white_blue`). *Las naranjas (`Orange`, `Off_white_orange`) están deprecadas.*
- **Estilo (así son los reales, NO líneas finas):** **silueta plana rellena en un solo cobalto**, formas redondeadas/orgánicas, con un **brillo/realce sutil**, simple y reconocible al toque.
- **Uso:** 1 ícono por pieza, arriba · en **blanco** sobre la foto o en **cobalto** sobre fondo claro · tamaño contenido (caja ~120×120 sobre 1080, ~10% de aire).
- **Sumar íconos nuevos** (mate, café, frío, fecha…): **diseñarlos matcheando este estilo** (plano, cobalto, brillo sutil, redondeado, simple). Probar en chico (que se entienda a 2 cm).
- **Nunca** usar un dibujo hecho a código como ícono final — siempre los reales del Drive. (El sol que aparecía dibujado en la hoja de fundamentos era solo un placeholder, ya corregido.)

**Cómo sumar un ícono nuevo (que quede igual al set):** los actuales son **vectores SVG editables** → usalos de **molde**. Diseñá el nuevo en Illustrator/Figma/Canva replicando el estilo (plano, 1 cobalto, brillo sutil, redondeado), exportá **PNG + SVG** en cobalto y en variante crema, y guardalo en `00_Marca/Elementos_Graficos`. *(Generarlo con IA en este estilo plano es lo más difícil de clavar; no es el camino principal. Si se prueba, pasale 2-3 íconos existentes como referencia de estilo y revisá bien antes de usar.)*

> Estos son los átomos. Encima van los **componentes** (badge, bloque de titular, banner/cuadro, tag de precio, sticker, lockup) y los **templates por formato** — la capa siguiente.
