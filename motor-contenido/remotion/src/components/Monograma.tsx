/**
 * Monograma D — toque de identidad (esquina). Usa el PNG real del set (d-blue).
 * Entrada suave por fade + leve escala. Es un TOQUE, no protagoniza.
 */

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";
import { ASSETS } from "../brand";

type MonogramaProps = {
  size?: number;
  delay?: number;
  /** Opacidad maxima (un toque, no a tope). */
  maxOpacity?: number;
};

export const Monograma: React.FC<MonogramaProps> = ({
  size = 120,
  delay = 0,
  maxOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.5 },
  });
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  const opacity = interpolate(enter, [0, 1], [0, maxOpacity]);

  return (
    <Img
      src={ASSETS.monogramaD}
      style={{
        width: size,
        height: "auto",
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
};
