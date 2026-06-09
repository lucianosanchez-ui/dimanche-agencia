/**
 * Reel — 1080x1920 (9:16, IG/TikTok).
 *
 * Registro: lifestyle / antojo en movimiento. El heroe (clip a color) llena el
 * cuadro; la capa grafica entra como TOQUE:
 *   - titular Niveau con filo (entrada suave, abajo)
 *   - monograma D arriba-derecha
 *   - sello "con olorcito a domingo" como firma al final
 * Cobalto SOLO en la capa grafica/props — NUNCA tinendo la foto.
 */

import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Hero } from "./components/Hero";
import { Titular } from "./components/Titular";
import { Sello } from "./components/Sello";
import { Monograma } from "./components/Monograma";
import { MEDIA, CREMA } from "./brand";

export type ReelProps = {
  titular: string;
  videoSrc?: string;
  imageSrc?: string;
};

export const reelDefaultProps: ReelProps = {
  titular: "no es de ayer",
  videoSrc: MEDIA.heroVideo,
  imageSrc: MEDIA.heroImage,
};

export const Reel: React.FC<ReelProps> = ({ titular, videoSrc, imageSrc }) => {
  const { durationInFrames } = useVideoConfig();
  const margen = 96;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Heroe: producto a color, push-in suave + scrim abajo para el texto */}
      <Hero
        videoSrc={videoSrc}
        imageSrc={imageSrc}
        zoomTo={1.1}
        scrimAbajo={0.62}
      />

      {/* Monograma D — toque, arriba derecha */}
      <AbsoluteFill style={{ padding: margen }}>
        <div style={{ position: "absolute", top: margen, right: margen }}>
          <Monograma size={140} delay={6} maxOpacity={0.92} />
        </div>
      </AbsoluteFill>

      {/* Titular Niveau con filo — abajo, entrada suave */}
      <AbsoluteFill
        style={{
          padding: margen,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <div style={{ marginBottom: 220 }}>
          <Titular
            texto={titular}
            size={132}
            color={CREMA}
            weight="black"
            delay={10}
            align="left"
          />
        </div>
      </AbsoluteFill>

      {/* Sello firma — entra cerca del final */}
      <Sequence from={Math.max(0, durationInFrames - 60)}>
        <AbsoluteFill
          style={{
            padding: margen,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Sello delay={0} height={80} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
