/**
 * PlacaMood — placa de MARCA / mood para el loop de TV (16:9).
 *
 * Fondo cobalto pleno + lockup centrado: monograma D (en disco crema, para que
 * contraste sobre el cobalto) + wordmark + sello "con olorcito a domingo". Todo
 * entra con spring escalonado. Es el ancla/respiro del loop (placa sin precio),
 * estilo "mood" de Starbucks. El cobalto vive en la capa grafica; no hay foto.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import {
  FONT_FAMILY,
  FONT_WEIGHTS,
  COBALTO,
  CREMA,
  SELLO,
  ASSETS,
} from "../brand";

type PlacaMoodProps = {
  wordmark?: string;
};

export const PlacaMood: React.FC<PlacaMoodProps> = ({
  wordmark = "Dimanche",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Monograma D: escala + fade (toque con vida, no rebote barato).
  const mono = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 110 },
  });
  const monoScale = interpolate(mono, [0, 1], [0.6, 1]);
  const monoOpacity = interpolate(mono, [0, 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Wordmark.
  const word = spring({ frame: frame - 18, fps, config: { damping: 200 } });
  const wordOpacity = interpolate(word, [0, 1], [0, 1]);
  const wordY = interpolate(word, [0, 1], [18, 0]);

  // Sello.
  const sello = spring({ frame: frame - 28, fps, config: { damping: 200 } });
  const selloOpacity = interpolate(sello, [0, 1], [0, 1]);
  const selloY = interpolate(sello, [0, 1], [14, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COBALTO,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* D en disco crema -> alto contraste sobre el cobalto */}
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor: CREMA,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${monoScale})`,
            opacity: monoOpacity,
            boxShadow: "0 14px 50px rgba(0,0,0,0.18)",
          }}
        >
          <Img src={ASSETS.monogramaD} style={{ width: 232, height: "auto" }} />
        </div>

        {/* Wordmark */}
        <div
          style={{
            marginTop: 34,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.black,
            fontSize: 120,
            letterSpacing: "0.005em",
            color: CREMA,
            lineHeight: 1,
            opacity: wordOpacity,
            transform: `translateY(${wordY}px)`,
          }}
        >
          {wordmark}
        </div>

        {/* Sello: linea fina, crema */}
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 50,
            letterSpacing: "0.04em",
            color: CREMA,
            opacity: selloOpacity * 0.92,
            transform: `translateY(${selloY}px)`,
            whiteSpace: "nowrap",
          }}
        >
          {SELLO}
        </div>
      </div>
    </AbsoluteFill>
  );
};
