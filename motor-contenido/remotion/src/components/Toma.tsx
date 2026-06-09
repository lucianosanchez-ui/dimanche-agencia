/**
 * Toma: una unidad de plano dentro del reel (clip o estatica con Ken Burns).
 *
 * Envuelve el contenido con un cross-dissolve de entrada y salida calculado sobre
 * el frame LOCAL de su Sequence, para que las tomas se solapen suavemente sin
 * cortes secos. La capa de marca (texto/sello) se pasa como children y se anima
 * por separado.
 *
 * La ONDA: el video va a color, sin filtro. El scrim (gradiente negro sutil) es
 * solo para que el texto respire — no tine el producto.
 */

import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { KenBurns } from "./KenBurns";

type KenBurnsConfig = {
  from?: number;
  to?: number;
  panX?: [number, number];
  panY?: [number, number];
  focus?: string;
};

type TomaProps = {
  /** Clip de video (staticFile) — tiene prioridad si se pasa. */
  videoSrc?: string;
  /** Estatica (staticFile) — se anima con Ken Burns. */
  imageSrc?: string;
  kenBurns?: KenBurnsConfig;
  /** Frames de fundido al entrar / al salir. */
  fadeIn?: number;
  fadeOut?: number;
  /** Posicion del clip en su archivo, en segundos (para elegir el tramo lindo). */
  startFrom?: number;
  /** Scrim: gradiente negro sutil para legibilidad del texto. */
  scrim?: "abajo" | "arriba" | "ambos" | "none";
  scrimStrength?: number;
  children?: React.ReactNode;
};

export const Toma: React.FC<TomaProps> = ({
  videoSrc,
  imageSrc,
  kenBurns,
  fadeIn = 12,
  fadeOut = 12,
  startFrom = 0,
  scrim = "abajo",
  scrimStrength = 0.55,
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const ease = Easing.inOut(Easing.ease);
  const opacityIn =
    fadeIn > 0
      ? interpolate(frame, [0, fadeIn], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })
      : 1;
  const opacityOut =
    fadeOut > 0
      ? interpolate(
          frame,
          [durationInFrames - fadeOut, durationInFrames],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
        )
      : 1;
  const opacity = Math.min(opacityIn, opacityOut);

  const scrimCss = (() => {
    const s = scrimStrength;
    switch (scrim) {
      case "abajo":
        return `linear-gradient(to top, rgba(0,0,0,${s}) 0%, rgba(0,0,0,0) 42%)`;
      case "arriba":
        return `linear-gradient(to bottom, rgba(0,0,0,${s}) 0%, rgba(0,0,0,0) 38%)`;
      case "ambos":
        return `linear-gradient(to top, rgba(0,0,0,${s}) 0%, rgba(0,0,0,0) 38%), linear-gradient(to bottom, rgba(0,0,0,${s * 0.7}) 0%, rgba(0,0,0,0) 32%)`;
      default:
        return "none";
    }
  })();

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: "#000" }}>
      {videoSrc ? (
        <OffthreadVideo
          src={videoSrc}
          muted
          startFrom={Math.round(startFrom * fps)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : imageSrc ? (
        <KenBurns src={imageSrc} {...kenBurns} />
      ) : null}

      {scrim !== "none" ? (
        <AbsoluteFill style={{ background: scrimCss }} />
      ) : null}

      {children}
    </AbsoluteFill>
  );
};

/** Helper para staticFile en props (evita importar staticFile en cada toma). */
export const media = (name: string) => staticFile(`media/${name}`);
