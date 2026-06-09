# Motor de video Dimanche — Remotion (scaffold de prueba)

Video **por código** para Dimanche: el hero es un clip/foto del **producto a color**
y la **capa gráfica** (titular Niveau con filo, monograma D, sello "con olorcito a
domingo", cobalto) se compone encima en React. Es el equivalente en video del
`motor-de-composicion.md` (que para estáticas usa Satori/PIL).

> **Estado: PRUEBA / EVALUACIÓN.** Esto se montó para probar Remotion como motor de
> video data-driven (TV del local + reels). Remotion es gratis para uso personal y
> equipos de hasta 3 personas; **una empresa de más de 3 personas necesita licencia
> comercial** (Remotion Company License). Acá lo usamos para evaluar la salida antes
> de decidir. Alternativas evaluadas si hay que evitar la licencia: **Revideo** (MIT,
> self-host gratis) o **Creatomate** (API, ~US$29/mes). Ver
> `~/.claude/.../memory/video-por-codigo-revideo.md`.

## La ONDA Dimanche (cerrada 2026-06-09) — cómo se aplica acá

- **El producto a COLOR es el héroe.** El clip/foto va a color, sin filtros que lo
  tiñan. El cobalto **NO** tiñe la foto.
- **La identidad entra como TOQUE:** cobalto `#3559E0` + crema `#E9E3D9` + monograma D
  + sello "con olorcito a domingo" (**cápsula DIRECTA, sin recuadro blanco**) + titular
  **Niveau Grotesk** con filo deadpan + line-art cuando suma.
- **Versátil:** la `Reel` es registro lifestyle/antojo; la `PlacaTV` es registro placa
  (split editorial). Mismo sistema, distinta pieza.
- **Sin naranja, sin emojis.**

## Composiciones

| ID         | Tamaño     | Uso                         | Default props                                  |
|------------|------------|-----------------------------|------------------------------------------------|
| `Reel`     | 1080×1920  | IG / TikTok (9:16)          | `titular: "no es de ayer"`                     |
| `PlacaTV`  | 1920×1080  | Pantallas del local (16:9)  | `titular: "medialuna de manteca"` + `bajada`   |

Ambas duran 8 s @ 30 fps. La duración/props se editan en `src/Root.tsx` y en cada
composición.

## Cómo se usa

Requiere Node (probado con Node 25 / npm 11). Desde esta carpeta
(`motor-contenido/remotion/`):

```bash
# 1. Instalar dependencias (una vez)
npm install

# 2. Studio interactivo (previsualizar / ajustar props en vivo)
npm run dev            # = npx remotion studio

# 3. Renderizar a mp4
npx remotion render Reel out/reel.mp4
npx remotion render PlacaTV out/placa-tv.mp4
# atajos:
npm run render:reel
npm run render:placatv
```

### Pasar texto / clip propio por línea de comando

Las props se overridean con `--props` (JSON). El clip de fondo es un `staticFile`,
así que poné tu mp4/png en `public/media/` y referencialo relativo a `public/`:

```bash
npx remotion render Reel out/reel.mp4 \
  --props='{"titular":"recién salido del horno","videoSrc":"media/mi-clip.mp4"}'

npx remotion render PlacaTV out/placa.mp4 \
  --props='{"titular":"pan de masa madre","bajada":"18 h de fermentación en frío","imageSrc":"media/mi-foto.jpg"}'
```

Sacar un frame suelto (QA visual, sin encodear el video):

```bash
npx remotion still Reel out/frame.png --frame=215
```

## Estructura

```
remotion/
├── package.json            # remotion + @remotion/cli + @remotion/fonts (4.0.474)
├── remotion.config.ts      # h264, CRF 18, sobrescribe salida
├── tsconfig.json
├── public/
│   ├── fonts/              # Niveau Grotesk Black/Bold/Medium (.otf REALES)
│   ├── assets/             # monograma D + line-art (croissant, sun) del set real
│   └── media/              # hero.mp4 + hero.jpg de PRUEBA (reemplazar por clip real del Drive)
└── src/
    ├── index.ts            # registerRoot
    ├── Root.tsx            # registra Reel + PlacaTV (y precarga fuentes)
    ├── brand.ts            # BRAND KIT: paleta, registro de Niveau, assets, copy
    ├── Reel.tsx            # composición 1080×1920
    ├── PlacaTV.tsx         # composición 1920×1080
    └── components/
        ├── Hero.tsx        # clip/foto de fondo a color + push-in suave + scrim
        ├── Titular.tsx     # Niveau con filo + entrada suave por palabra
        ├── Sello.tsx       # cápsula "con olorcito a domingo" DIRECTA (sin caja blanca)
        └── Monograma.tsx   # monograma D (PNG real) como toque
```

## Fuentes y colores (registro del Brand Kit)

Todo vive en **`src/brand.ts`** (espeja `motor-contenido/brand_kit.py`):

- **Colores:** `cobalto #3559E0`, `crema #E9E3D9`, `blanco`, `negro`, + tints
  (`cobaltoOscuro #2843A8`, `cobaltoClaro #D6DEFB`).
- **Tipografía:** familia única `"Niveau Grotesk"` registrada con `@remotion/fonts`
  → `loadFont` desde las **OTF locales** (`staticFile("fonts/...")`). **NO** se usa
  `@remotion/google-fonts`: Niveau es de licencia propia (HVD Fonts). Pesos: Black
  (900), Bold (700), Medium (500).
- **Assets:** monograma D y line-art son los PNG reales del set del Drive, copiados a
  `public/assets/`.

## Notas / pendientes para producción

- **Hero de prueba:** `public/media/hero.{mp4,jpg}` son placeholders (un POC viejo).
  Para piezas reales, reemplazar por el clip/foto del **producto a color** (Drive
  `Sesion_Principal` o clip de Higgsfield), nunca `01_Fotos/Editadas/`.
- **El texto lo pone el código, nunca la IA y nunca a mano** (regla del motor de
  composición). El titular va en las props.
- **Audio:** el scaffold no lleva audio (placas TV suelen ir mudas). Para reel con
  sonido, sumar `<Audio>` en `Reel.tsx`.
- **Brand-check + gate humano:** toda pieza nace **Propuesto**; pasa por
  `dimanche-brand-check` antes de publicar.
- Si el equipo supera 3 personas y se adopta Remotion en serio → resolver la
  **licencia comercial** o pivotear a Revideo/Creatomate.
