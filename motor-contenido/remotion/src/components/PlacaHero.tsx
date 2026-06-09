/**
 * PlacaHero — placa HERO del loop de TV (16:9).
 *
 * El producto a COLOR a sangre (full-bleed) con push-in lento; scrim abajo para
 * que respire el texto. Encima: monograma D (toque, esquina) + titular Niveau con
 * filo + sello. El cobalto NO tine la foto: entra solo en la capsula del sello.
 *
 * Uso esta semana: "frio -> producto caliente" (medialuna/criollos con vapor).
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import { Hero } from "./Hero";
import { Titular } from "./Titular";
import { Sello } from "./Sello";
import { Monograma } from "./Monograma";
import { CREMA } from "../brand";

type PlacaHeroProps = {
  titular: string;
  bajada?: string;
  videoSrc?: string;
  imageSrc?: string;
};

export const PlacaHero: React.FC<PlacaHeroProps> = ({
  titular,
  bajada,
  videoSrc,
  imageSrc,
}) => {
  return (
    <AbsoluteFill>
      <Hero
        videoSrc={videoSrc}
        imageSrc={imageSrc}
        zoomTo={1.06}
        scrimAbajo={0.62}
      />

      <AbsoluteFill style={{ padding: 96, justifyContent: "space-between" }}>
        {/* Monograma D arriba-izq (toque de identidad) */}
        <div>
          <Monograma size={92} delay={6} maxOpacity={0.95} />
        </div>

        {/* Lockup de texto abajo-izq */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 26,
          }}
        >
          <Titular
            texto={titular}
            size={104}
            color={CREMA}
            weight="black"
            delay={10}
            align="left"
            maxWidth="76%"
          />
          {bajada ? (
            <Titular
              texto={bajada}
              size={42}
              color={CREMA}
              weight="medium"
              delay={24}
              align="left"
              maxWidth="70%"
            />
          ) : null}
          <div style={{ marginTop: 8 }}>
            <Sello delay={38} height={72} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
