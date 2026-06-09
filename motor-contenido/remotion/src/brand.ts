/**
 * Brand Kit Dimanche en codigo (Remotion).
 *
 * Fuente de verdad VISUAL para la capa grafica de video. Espeja el brand_kit.py
 * del motor de composicion (mismos HEX y misma logica de la ONDA).
 *
 * LA ONDA DIMANCHE (cerrada 2026-06-09):
 *  - El PRODUCTO a COLOR es el heroe (foto/clip apetitoso, vivo). La foto SIEMPRE
 *    a color; el cobalto NO tine la foto: vive en la capa grafica / props.
 *  - La identidad entra como TOQUE: cobalto #3559E0 + crema #E9E3D9 + monograma D
 *    + sello "con olorcito a domingo" (capsula DIRECTA, sin recuadro blanco) +
 *    titular Niveau con filo deadpan + line-art cuando suma.
 *  - Sin naranja, sin emojis.
 */

import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// ---------------------------------------------------------------------------
// 1. Paleta (identica a brand_kit.py)
// ---------------------------------------------------------------------------
export const COLORS = {
  cobalto: "#3559E0",
  crema: "#E9E3D9",
  blanco: "#FFFFFF",
  negro: "#000000",
  cobaltoOscuro: "#2843A8",
  cobaltoClaro: "#D6DEFB",
} as const;

// Atajos usados por las composiciones
export const COBALTO = COLORS.cobalto;
export const CREMA = COLORS.crema;

// ---------------------------------------------------------------------------
// 2. Tipografia Niveau Grotesk (OTF locales en public/fonts)
// ---------------------------------------------------------------------------
// Familia unica con tres pesos. loadFont registra el @font-face desde la OTF
// servida por staticFile (NO usamos Google Fonts: Niveau es de licencia propia).
export const FONT_FAMILY = "Niveau Grotesk";

export const FONT_WEIGHTS = {
  black: 900,
  bold: 700,
  medium: 500,
} as const;

let _fontsLoaded: Promise<void> | null = null;

/** Registra los tres pesos de Niveau. Idempotente: cachea la promesa. */
export const ensureFonts = (): Promise<void> => {
  if (_fontsLoaded) return _fontsLoaded;
  _fontsLoaded = Promise.all([
    loadFont({
      family: FONT_FAMILY,
      url: staticFile("fonts/NiveauGrotesk-Black.otf"),
      weight: "900",
      format: "opentype",
    }),
    loadFont({
      family: FONT_FAMILY,
      url: staticFile("fonts/NiveauGrotesk-Bold.otf"),
      weight: "700",
      format: "opentype",
    }),
    loadFont({
      family: FONT_FAMILY,
      url: staticFile("fonts/NiveauGrotesk-Medium.otf"),
      weight: "500",
      format: "opentype",
    }),
  ]).then(() => undefined);
  return _fontsLoaded;
};

// ---------------------------------------------------------------------------
// 3. Assets de marca (line-art + monograma, en public/assets)
// ---------------------------------------------------------------------------
export const ASSETS = {
  monogramaD: staticFile("assets/d-blue.png"),
  lineCroissant: staticFile("assets/line-croissant.png"),
  lineSun: staticFile("assets/line-sun.png"),
} as const;

// Heroe de prueba (clip + fallback foto). Reemplazar por el clip real del Drive.
export const MEDIA = {
  heroVideo: staticFile("media/hero.mp4"),
  heroImage: staticFile("media/hero.jpg"),
} as const;

// Clips y estaticas reales para el Reel (copiados de ~/Downloads/dimanche-slides).
//  - croissants     : test-kling3.mp4  (croissants en canasta, movimiento)
//  - humito         : humito-medialuna.mp4 (medialuna + vapor, plato cobalto)
//  - cinnaEscena    : cinna-escena.png (lifestyle: mano + canasta + cafe)
//  - macroLateral   : angle-macro-lateral.png (macro glossy)
//  - cierreBg       : frame congelado de croissants para la placa de cierre
export const REEL_MEDIA = {
  croissants: staticFile("media/croissants.mp4"),
  humito: staticFile("media/humito-medialuna.mp4"),
  cinnaEscena: staticFile("media/cinna-escena.png"),
  macroLateral: staticFile("media/angle-macro-lateral.png"),
  cierreBg: staticFile("media/cierre-bg.png"),
} as const;

// ---------------------------------------------------------------------------
// 4. Copy de marca (filo deadpan, sin emojis)
// ---------------------------------------------------------------------------
export const SELLO = "con olorcito a domingo";
