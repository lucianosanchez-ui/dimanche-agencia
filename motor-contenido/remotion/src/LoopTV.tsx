/**
 * LoopTV — loop de pantallas para la TV del local (1920x1080, 16:9).
 *
 * Encadena las placas con cross-dissolve (mismo patron de opacidad que Toma.tsx):
 * cada placa se solapa ~FADE frames con la siguiente; al fundir su opacidad deja
 * ver el cobalto de fondo, asi la transicion pasa por la marca (no por negro).
 * El archivo se reproduce en bucle en la TV; el corte de vuelta (servicio ->
 * mood) tambien cae sobre cobalto, asi que el loop no pega un salto duro.
 *
 * Esta semana (09/06): mood -> frio/producto caliente -> horarios+locales.
 * Mas placas (Dia del Padre, combos, dayparting) se suman despues — ver plan.
 */

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { COBALTO, TV_MEDIA } from "./brand";
import { PlacaMood } from "./components/PlacaMood";
import { PlacaHero } from "./components/PlacaHero";
import { PlacaServicio } from "./components/PlacaServicio";

/** Frames de cross-dissolve entre placas (~0,67 s @ 30fps). */
const FADE = 20;

/** Duraciones por placa (frames @ 30fps). Dwell comodo para leer de lejos. */
const DUR = {
  mood: 240, // 8 s
  hero: 330, // 11 s
  servicio: 300, // 10 s
} as const;

/** Duracion total del loop = suma de placas - los solapes (n-1). */
export const loopTvDuration = DUR.mood + DUR.hero + DUR.servicio - FADE * 2;

/** Envuelve una placa con fundido de entrada/salida sobre su frame LOCAL. */
const Crossfade: React.FC<{
  fadeIn?: number;
  fadeOut?: number;
  children: React.ReactNode;
}> = ({ fadeIn = FADE, fadeOut = FADE, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ease = Easing.inOut(Easing.ease);
  const oIn =
    fadeIn > 0
      ? interpolate(frame, [0, fadeIn], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })
      : 1;
  const oOut =
    fadeOut > 0
      ? interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })
      : 1;
  return (
    <AbsoluteFill style={{ opacity: Math.min(oIn, oOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export type LoopTVProps = {
  heroTitular: string;
  heroBajada?: string;
  heroVideo?: string;
  heroImage?: string;
};

export const loopTvDefaultProps: LoopTVProps = {
  heroTitular: "recién salido",
  heroBajada: "para el frío de hoy",
  heroVideo: TV_MEDIA.frioVideo,
  heroImage: TV_MEDIA.frioImage,
};

export const LoopTV: React.FC<LoopTVProps> = ({
  heroTitular,
  heroBajada,
  heroVideo,
  heroImage,
}) => {
  const placas: { dur: number; node: React.ReactNode }[] = [
    { dur: DUR.mood, node: <PlacaMood /> },
    {
      dur: DUR.hero,
      node: (
        <PlacaHero
          titular={heroTitular}
          bajada={heroBajada}
          videoSrc={heroVideo}
          imageSrc={heroImage}
        />
      ),
    },
    { dur: DUR.servicio, node: <PlacaServicio /> },
  ];

  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {placas.map((p, i) => {
        const from = cursor;
        cursor += p.dur - FADE; // la proxima arranca FADE frames antes -> solape
        return (
          <Sequence key={i} from={from} durationInFrames={p.dur}>
            <Crossfade fadeIn={FADE} fadeOut={FADE}>
              {p.node}
            </Crossfade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
