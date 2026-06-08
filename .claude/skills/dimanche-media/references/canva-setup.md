# Armar Canva desde la base del Drive — setup (una sola vez)

> Las **plantillas autollenables** de Canva se arman en la **UI** (la API no las crea). Es un setup de **una vez**; después Anto produce por autofill. Todo se sube **DESDE el Drive** (la base). El Brand Kit "Dimanche" **ya existe** (id `kAHL68AYTxI`, en la cuenta de Luciano "L" — **NO** `kAHGX3NlfR4`, que era de otra cuenta con relleno genérico).

## Paso 1 — Completar el Brand Kit "Dimanche"
Canva → **Brand Hub → Brand Kit "Dimanche"**:
- **Colores:** Azul `#3559E0` · Crema `#E9E3D9` · Blanco `#FFFFFF` · Negro `#000000`. *(Borrar cualquier naranja.)*
- **Fuente:** subir **Niveau Grotesk** desde `Drive/06_Marketing/00_Marca/Tipografias/Niveau_Grotesk/`. Setearla como fuente de marca (titulares Bold/Black · cuerpo Regular · detalle Light).
- **Logo:** subir el **badge "D"** desde `00_Marca/Logos/`.
- **Elementos/Gráficos:** subir los **8 íconos** desde `00_Marca/Elementos_Graficos/Blue/` (+ variante crema `Off_white_blue/`). *(Las naranja NO.)*

## Paso 2 — Armar una plantilla por formato (anatomía base)
Crear un diseño por formato (arrancá por **Story 9:16** y **Post 4:5**) con la anatomía (ver `Especificaciones/templates-spec.png`):
- **Story 9:16 (1080×1920):** foto real full-bleed (placeholder) · **ícono blanco arriba** (dentro de los 250 px de safe) · **titular Niveau blanco** centrado · **badge "D" abajo** (dentro del safe) · **scrim** suave (negro 0→40%) detrás del texto.
- **Post 4:5 (1080×1350):** igual, sin el safe-area de la UI de IG.
- Respetar grilla 8 px y margen 80 px (`foundations`).

## Paso 3 — Hacerlas reutilizables (autofill)
- **Con Canva Pro/Teams/Enterprise:** marcá la **foto** y el **titular** como campos y publicá como **Brand Template** (Brand Hub → Templates). Anto entra → elige el template → suelta la foto → escribe → listo.
- **Sin eso:** guardá el diseño como **plantilla** (duplicar y editar). Mismo resultado, un paso más manual.

## Paso 4 — Producir (día a día de Anto)
1. **Foto real** (del celu o del Drive `01_Fotos`). Si no hay, generar la escena en Higgsfield partiendo de una foto real (regla de oro).
2. Abrir el template → soltar la foto → escribir el **titular** (corto, con ingenio) → elegir el **ícono** que pegue con el mensaje.
3. **Brand-check** (paleta · sin naranja/emojis · regla de oro) → guardar como **Propuesto** (gate).

## Nota
La **base** vive en el Drive (`00_Marca/Design_System/` + assets en `00_Marca`). Si la marca cambia, se actualiza ahí y se re-sincroniza al Brand Kit. El Brand Kit y las plantillas de Canva son un **reflejo** de esa base, no la fuente.
