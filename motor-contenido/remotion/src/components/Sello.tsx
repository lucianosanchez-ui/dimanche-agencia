/**
 * Sello "con olorcito a domingo" — capsula DIRECTA (sin recuadro blanco atras).
 *
 * Regla de la ONDA: el sello es una capsula cobalto con el texto en crema, pegado
 * directo sobre la pieza. NUNCA una caja blanca de fondo. Entrada suave (escala +
 * fade) hacia el final, como firma.
 *
 * Se dibuja por codigo (no imagen) para que el texto sea nitido a cualquier escala
 * y editable; la tipografia es Niveau medium.
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, SELLO } from "../brand";

type SelloProps = {
  /** Frame en el que aparece. */
  delay?: number;
  /** Altura de la capsula en px. */
  height?: number;
  /** Color de la capsula / del texto (default cobalto sobre crema). */
  fill?: string;
  text?: string;
  textColor?: string;
};

export const Sello: React.FC<SelloProps> = ({
  delay = 0,
  height = 64,
  fill = COBALTO,
  text = SELLO,
  textColor = CREMA,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.5 },
  });
  const scale = interpolate(enter, [0, 1], [0.92, 1]);
  const opacity = interpolate(enter, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height,
        padding: `0 ${Math.round(height * 0.5)}px`,
        borderRadius: height / 2,
        backgroundColor: fill,
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "left center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: Math.round(height * 0.42),
          letterSpacing: "0.01em",
          color: textColor,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};
