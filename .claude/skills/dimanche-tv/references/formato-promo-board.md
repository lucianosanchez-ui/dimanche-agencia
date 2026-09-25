# El formato que funciona + los mecanismos ya usados

## PROMO BOARD — el formato aprobado (29/08)

Salió de copiar los menu boards de Starbucks que Luciano cargó en
`06_Marketing/00_Marca/referencias diseño agencia/menu board/_ (*).jpeg (Drive)`. Componente: `PlacaPromoVideo`.

La receta:
- **Fondo sólido** de marca (crema `#E9E3D9`) + **marco hairline** cobalto finito.
- **Producto EN USO**, no flotando: una mano entrando desde el borde, el packaging
  real, bandeja de **acero inoxidable**.
- **Palabras gigantes apiladas en DOS colores** — cobalto `#3559E0` + tinta `#1E1E1E`.
  Nunca todo azul.
- **Cápsula de precio** cobalto, donde corresponda.
- **Sello** "con olorcito a domingo" estampado.

### Criterio estético (pedido explícito de Luciano)
- **Acero inoxidable sí, mimbre no.** El canasto de las fotos del local es feo; la IA
  lo reemplaza por una bandeja de acero.
- **La bolsa kraft chica** (`assets/tv/bolsa-kraft.png`), NO la bolsa blanca grande —
  esa es la de delivery.
- **Vaso cobalto oficial** para café.
- Nada de utilería fea que venga en la foto base: se pisa en el prompt.

### El prompt que funciona
La clave son tres cosas: exigir que el producto y el packaging queden **idénticos**,
pedir el fondo **por hex** y **reservar una zona vacía** para la tipografía.

```
Studio product photograph on a PLAIN SOLID warm cream seamless background, exact hex
#E9E3D9 everywhere, floor and wall the same flat cream tone with no horizon line.
Crisp commercial studio lighting, one clean soft grounded shadow. Composition sits in
the RIGHT HALF of the 16:9 frame; the LEFT HALF stays pure empty cream for typography.
<<< LA ESCENA: qué hace la mano, qué packaging, qué producto >>>
— EXACTLY that bag / EXACTLY that cup, do not redesign it. Every <producto> EXACTLY
like the first reference image: <color, textura, forma>, do NOT re-bake or smooth them.
Frozen mid-motion, energetic, appetising. No table, no basket, no props, no text,
no extra logos.
```

Se le pasan **dos fotos reales**: el producto + el packaging.

```
REFS="$HOME/Library/CloudStorage/GoogleDrive-lucianosanchez@panaderiadimanche.ar/Mi unidad/06_Marketing/00_Marca/referencias diseño agencia/menu board"
python3 motor-contenido/scripts/hero_ia.py generar out/hero.jpg \
  --ref "$REFS/chipa 7.jpeg" \
  --ref "$REFS/bolsa kraft referencia.png" \
  --prompt-file prompt.txt --variantes 2
```

### Dos aprendizajes que ahorran plata
- **Generá el hero directo sobre el crema** y usalo **a sangre** (full-bleed): las
  sombras salen reales y no hay que recortar nada.
- **`rembg` deja fantasma manos y brazos.** Si la escena tiene gente, no se recorta.

---

## Mecanismos ya usados — NO repetir, seguir inventando

Si dos placas comparten arquitectura, salen planas. Cada una necesita la suya.

| Mecanismo | Qué es | Dónde |
|---|---|---|
| **promo board** | fondo sólido + marco + producto en uso + tipografía bicolor gigante + precio | `PlacaPromoVideo` (chipa, medialuna) |
| **montaje / corte seco** | 3 tomas reales, el copy se completa al ritmo de los cortes | `PlacaMedialunasVideo` |
| **editorial** | la tipografía vive DENTRO de la foto, en la pared cobalto real | `PlacaMasasVideo` |
| **macro a sangre + banda** | el producto ocupa todo; el texto en una banda crema | `CookiesMacro` |
| **poster / masthead** | banda cobalto sólida arriba, producto a color pleno abajo | `CookiesPoster` |
| **panel derecho** | columna crema que se abre, con hairline | `CookiesPanel` |
| **pila generada** | la abundancia entera como una imagen | criollos |
| **escena ilustrada + clip real** | dibujo de marca + video real compositado | delivery |
| **catálogo de a uno + cierre** | variedades una por una, precio solo al final | budines |
| **menu board editorial** | fondo crema, sin foto, PNG reales del set | horarios |

**Rechazados, no volver:**
- **"El monumento"** (producto solo, centrado, sobre fondo pleno): *"es un espanto"*.
  Producto flotando = frío.
- **El molde único `PlacaProducto`** para todo el lote: *"son todos iguales, muy plano"*.

## Copy
Tono POL-010: seco, observacional, sin marketinería, sin emojis. Los que funcionaron:
*"se moja. no se discute."* · *"se sirven solas."* · *"salen calientes."* ·
*"para cuando cae alguien sin avisar."* · *"esto no es una galletita."*

Si hay que escribir uno nuevo, pasá por la skill `dimanche-copy`.
