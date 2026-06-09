/**
 * Titular Niveau Grotesk con FILO deadpan + entrada suave.
 *
 * - Niveau embebida (familia registrada en brand.ts desde la OTF local).
 * - "Filo": peso black, tracking justo, line-height ajustado. Sin marketineria.
 * - Entrada suave por palabra (mask-reveal + leve subida), nada brusco.
 * - Color por defecto crema sobre foto; cobalto para placas claras.
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, CREMA } from "../brand";

type TitularProps = {
  texto: string;
  /** px @ canvas real. */
  size: number;
  color?: string;
  weight?: keyof typeof FONT_WEIGHTS;
  /** Frame en el que arranca la entrada. */
  delay?: number;
  /** Alineacion del bloque. */
  align?: "left" | "center";
  maxWidth?: number | string;
};

export const Titular: React.FC<TitularProps> = ({
  texto,
  size,
  color = CREMA,
  weight = "black",
  delay = 0,
  align = "left",
  maxWidth = "82%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palabras = texto.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${Math.round(size * 0.28)}px`,
        maxWidth,
        justifyContent: align === "center" ? "center" : "flex-start",
        textAlign: align,
      }}
    >
      {palabras.map((palabra, i) => {
        const localDelay = delay + i * 4;
        const enter = spring({
          frame: frame - localDelay,
          fps,
          config: { damping: 200, mass: 0.6 },
        });
        const y = interpolate(enter, [0, 1], [size * 0.45, 0]);
        const clip = interpolate(enter, [0, 1], [100, 0]);
        const opacity = interpolate(enter, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS[weight],
              fontSize: size,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color,
              transform: `translateY(${y}px)`,
              opacity,
              // mask-reveal: la palabra entra desde abajo dentro de su caja
              clipPath: `inset(${clip}% 0 0 0)`,
            }}
          >
            {palabra}
          </span>
        );
      })}
    </div>
  );
};
