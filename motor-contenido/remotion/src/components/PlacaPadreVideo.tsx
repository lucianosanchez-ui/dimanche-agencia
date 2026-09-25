/**
 * PlacaPadreVideo — video TV (16:9, 18s, loop) para el Día del Padre.
 *
 * Versión sobria (la emoción manda, la marca acompaña):
 *  1) FOTO HERO emocional (padre+hijo, desayuno de domingo — IA gente anónima,
 *     permitido por la regla de oro) con Ken Burns suave, todo el video.
 *  2) MARCA durante la foto: el SOL de Dimanche (elemento gráfico) centrado debajo
 *     del copy. El nombre "Dimanche" aparece recién en el cierre.
 *  3) CIERRE: placa de fondo CRUDO (crema) con el wordmark Dimanche COMPLETO en
 *     COBALTO (incluye "con olorcito a domingo", una sola vez). Sin moneda ni sello.
 *
 * Todo el texto/logo sale de assets reales del set oficial o de Niveau por código.
 * Sin naranja, sin emojis, sin inventar producto/packaging. Loop limpio.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA } from "../brand";

export const placaPadreVideoDefaultProps = {};

const NEGRO_CALIDO = "#1a140e";
const CRUDO = CREMA; // fondo crudo del cierre

const FOTO = staticFile("assets/tv/padre-foto.png");
const SOL = staticFile("assets/tv/sol-azul.png"); // sol de marca: semicírculo cobalto + rayos crema (ratio 1.72)
const WM_COBALTO = staticFile("assets/tv/wordmark-cobalto.png"); // "Dimanche" + bajada, cobalto (ratio 4.21)

const fade = (f: number, a: number, b: number, c: number, d: number) =>
  interpolate(f, [a, b, c, d], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const ease = (f: number, a: number, b: number, from: number, to: number) =>
  interpolate(f, [a, b], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const Copy: React.FC<{
  frame: number; a: number; b: number; c: number; d: number;
  text: string; size: number; weight: number; bottom: number;
}> = ({ frame, a, b, c, d, text, size, weight, bottom }) => (
  <div
    style={{
      position: "absolute", left: 0, right: 0, bottom,
      textAlign: "center",
      fontFamily: FONT_FAMILY, fontWeight: weight, fontSize: size, color: CREMA,
      opacity: fade(frame, a, b, c, d),
      transform: `translateY(${ease(frame, a, b, 24, 0)}px)`,
      letterSpacing: "0.005em", lineHeight: 1.04,
      textShadow: "0 2px 26px rgba(0,0,0,0.55)",
      zIndex: 30,
    }}
  >
    {text}
  </div>
);

export const PlacaPadreVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Foto: fade-in + Ken Burns suave
  const fotoOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fotoScale = interpolate(frame, [0, 412], [1.0, 1.055], { extrapolateRight: "clamp" });

  // Marca durante la foto: el sol centrado debajo del copy
  const solOp = fade(frame, 18, 42, 392, 406) * 0.95;
  const solY = ease(frame, 18, 42, 12, 0);

  // Bisagra: placa de fondo crudo sube y tapa la foto
  const placaY = ease(frame, 392, 416, 100, 0);

  // Cierre: wordmark cobalto completo aparece sobre el crudo
  const wmBigOp = interpolate(frame, [424, 452], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wmBigScale = interpolate(frame, [424, 452], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Loop: fundido a negro cálido al final (empata con el frame 0)
  const loopBlack = interpolate(frame, [528, 540], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: NEGRO_CALIDO, overflow: "hidden" }}>
      {/* FOTO HERO con Ken Burns */}
      <AbsoluteFill style={{ transform: `scale(${fotoScale})`, opacity: fotoOp }}>
        <Img src={FOTO} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Scrims suaves (arriba-izq para el wordmark, abajo para el copy) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,16,10,0.36) 0%, rgba(20,16,10,0) 18%), " +
            "linear-gradient(to top, rgba(20,16,10,0.60) 0%, rgba(20,16,10,0.24) 26%, rgba(20,16,10,0) 50%)",
          zIndex: 15,
        }}
      />

      {/* Copy emocional */}
      <Copy frame={frame} a={78} b={102} c={150} d={170} text="El mejor plan de hoy" size={84} weight={FONT_WEIGHTS.bold} bottom={188} />
      <Copy frame={frame} a={182} b={206} c={256} d={272} text="es sentarse a la mesa con él." size={80} weight={FONT_WEIGHTS.bold} bottom={188} />
      <Copy frame={frame} a={272} b={302} c={384} d={400} text="Feliz día, Pa." size={120} weight={FONT_WEIGHTS.black} bottom={214} />

      {/* Marca sobre la foto: el sol de Dimanche, centrado debajo del copy */}
      <Img
        src={SOL}
        style={{
          position: "absolute", left: "50%", bottom: 52, width: 146, height: "auto",
          opacity: solOp, transform: `translateX(-50%) translateY(${solY}px)`,
          filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.55))", zIndex: 25,
        }}
      />

      {/* PLACA DE CIERRE — fondo crudo, Dimanche cobalto completo */}
      <AbsoluteFill style={{ transform: `translateY(${placaY}%)`, zIndex: 40 }}>
        <AbsoluteFill style={{ backgroundColor: CRUDO, justifyContent: "center", alignItems: "center" }}>
          <Img
            src={WM_COBALTO}
            style={{
              width: 920, height: "auto",
              opacity: wmBigOp, transform: `scale(${wmBigScale})`,
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Fundido a negro cálido para el loop */}
      <AbsoluteFill style={{ backgroundColor: NEGRO_CALIDO, opacity: loopBlack, zIndex: 60 }} />
    </AbsoluteFill>
  );
};
