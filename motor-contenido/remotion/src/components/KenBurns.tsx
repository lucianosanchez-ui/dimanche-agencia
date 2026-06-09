/**
 * KenBurns: estatica que "respira" — zoom + pan lento y suave sobre una Img.
 *
 * La ONDA: la foto a color es el heroe; NO le aplicamos filtro de color. Solo un
 * movimiento sutil (escala + desplazamiento) para que la toma no quede muerta.
 * El movimiento es relativo a la duracion de la Sequence donde vive (usa el frame
 * local), asi cada toma tiene su propio recorrido independiente.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type KenBurnsProps = {
  src: string;
  /** Escala inicial -> final (1 = sin zoom). */
  from?: number;
  to?: number;
  /** Pan en % del cuadro (origen del movimiento). */
  panX?: [number, number];
  panY?: [number, number];
  /** object-position para encuadrar (ej. "center 35%"). */
  focus?: string;
};

export const KenBurns: React.FC<KenBurnsProps> = ({
  src,
  from = 1.06,
  to = 1.18,
  panX = [0, 0],
  panY = [0, 0],
  focus = "center center",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const ease = Easing.inOut(Easing.ease);
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const scale = interpolate(progress, [0, 1], [from, to]);
  const tx = interpolate(progress, [0, 1], panX);
  const ty = interpolate(progress, [0, 1], panY);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focus,
          transform: `scale(${scale}) translate(${tx}%, ${ty}%)`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
};
