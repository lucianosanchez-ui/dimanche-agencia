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

import { staticFile, delayRender, continueRender } from "remotion";
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

// IMPORTANTE: ademas de awaitear en calculateMetadata, disparamos la carga al
// IMPORTAR el modulo. El registro de fuentes hecho solo en calculateMetadata no
// siempre persiste al contexto donde se rasterizan los frames (caia a un serif
// por fallback). Al cargar aca y retener el primer frame con delayRender, la
// Niveau queda registrada en la pagina de render. El guard de `window` evita
// tocar FontFace/document en el lado Node (getCompositions / metadata).
if (typeof window !== "undefined") {
  const _fontHandle = delayRender("Cargando Niveau Grotesk");
  ensureFonts()
    .then(() => continueRender(_fontHandle))
    .catch((err) => {
      // No bloquear el render si una OTF falla; logueamos para diagnosticar.
      console.error("[brand] error cargando Niveau Grotesk:", err);
      continueRender(_fontHandle);
    });
}

// ---------------------------------------------------------------------------
// 3. Assets de marca (line-art + monograma, en public/assets)
// ---------------------------------------------------------------------------
export const ASSETS = {
  monogramaD: staticFile("assets/d-blue.png"),
  lineCroissant: staticFile("assets/line-croissant.png"),
  lineSun: staticFile("assets/line-sun.png"),
} as const;

// Elementos graficos REALES de marca (PNG del set Elementos_Graficos/Logos),
// copiados a public/assets/tv. Son los oficiales (no line-art SVG inventado):
//  - emblema    : Perfil-04, anillo "panaderia · pasteleria" + D, cobalto.
//  - selloDomingo: "con olorcito a domingo", capsula cobalto (blue sign1).
//  - solAzul    : sol cobalto (blue sun) — sirve de textura/watermark.
export const TV_GRAFICA = {
  emblema: staticFile("assets/tv/emblema.png"),
  selloDomingo: staticFile("assets/tv/sello-domingo.png"),
  solAzul: staticFile("assets/tv/sol-azul.png"),
  croissant: staticFile("assets/tv/croissant-cobalto.png"), // medialuna cobalto (elemento real)
} as const;

// Placa DELIVERY: piezas generadas/recortadas (regla de oro: la bolsa parte de
// la foto real del packaging Dimanche).
//  - bolsa : mano real desde abajo levantando la bolsa Dimanche real (recortada).
//  - vespa : ilustracion plana cobalto con conductor (estilo marca, recortada).
//  - qr    : QR a wa.me/5493516639003 con mensaje precargado (cobalto sobre blanco).
export const TV_DELIVERY = {
  // v1 (mano desde abajo / vespa ¾ frente) — quedaron en desuso al pivotar.
  bolsa: staticFile("assets/tv/delivery-bolsa.png"),
  vespa: staticFile("assets/tv/delivery-vespa.png"),
  qr: staticFile("assets/tv/qr-delivery.png"),
  // v2 (escena cobalto, vista lateral):
  vespaSide: staticFile("assets/tv/delivery-vespa-side.png"), // vespa de perfil + conductor + caja
  manoArriba: staticFile("assets/tv/delivery-mano-arriba.png"), // mano real que baja la bolsa desde arriba
  manoVacia: staticFile("assets/tv/delivery-mano-vacia.png"), // misma mano, abierta/vacía (suelta y se va)
  bolsaParada: staticFile("assets/tv/delivery-bolsa-parada.png"), // bolsa real apoyada (cuando la mano se va)
  emblemaCrema: staticFile("assets/tv/emblema-crema.png"), // logo crema (para el local sobre cobalto)
  wordmarkCrema: staticFile("assets/tv/wordmark-crema.png"),
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

// Media para las pantallas TV del local (16:9). Por ahora reusa material REAL
// que ya vive en el motor; se reemplaza por el del Drive / celu cuando llegue.
//  - frio*  : medialuna con vapor (plato cobalto) -> "frio -> producto caliente".
//  - lifestyle : mano + canasta + cafe (registro lifestyle alternativo).
export const TV_MEDIA = {
  frioVideo: staticFile("media/humito-medialuna.mp4"),
  frioImage: staticFile("media/hero.jpg"),
  lifestyleImage: staticFile("media/cinna-escena.png"),
} as const;

// Los 3 locales (placa de servicio de la TV).
// Villa Allende y Boulevares confirmados por Luciano (09-10/06). Gauss PROVISORIO.
export const LOCALES = [
  { zona: "Villa Allende", horario: "lun a sáb 7 a 22 h · dom 8 a 20 h" },
  { zona: "Gauss", horario: "todos los días · 7 a 21 h" }, // PROVISORIO — confirmar
  { zona: "Boulevares", horario: "lun a sáb 6 a 22 h · dom 7 a 20 h" },
] as const;

// ---------------------------------------------------------------------------
// 4. Copy de marca (filo deadpan, sin emojis)
// ---------------------------------------------------------------------------
export const SELLO = "con olorcito a domingo";
