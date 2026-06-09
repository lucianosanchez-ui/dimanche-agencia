/**
 * PlacaTV — 1920x1080 (16:9, pantallas del local).
 *
 * Registro placa: split editorial. Heroe (producto a color) a la derecha,
 * panel cobalto a la izquierda con la capa grafica (monograma + titular Niveau
 * con filo + sello). Cobalto vive en el panel grafico, NO tine la foto.
 *
 * Pensado para verse de lejos en una TV: titular grande, jerarquia clara, calma.
 */

import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig, Img } from "remotion";
import { Hero } from "./components/Hero";
import { Titular } from "./components/Titular";
import { Sello } from "./components/Sello";
import { COBALTO, CREMA, ASSETS } from "./brand";
import { MEDIA } from "./brand";

export type PlacaTVProps = {
  titular: string;
  bajada?: string;
  videoSrc?: string;
  imageSrc?: string;
};

export const placaTvDefaultProps: PlacaTVProps = {
  titular: "medialuna de manteca",
  bajada: "recién horneada, todos los días",
  videoSrc: MEDIA.heroVideo,
  imageSrc: MEDIA.heroImage,
};

export const PlacaTV: React.FC<PlacaTVProps> = ({
  titular,
  bajada,
  videoSrc,
  imageSrc,
}) => {
  const { durationInFrames } = useVideoConfig();
  const panelW = 760; // ancho del panel grafico izquierdo
  const pad = 96;

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, flexDirection: "row" }}>
      {/* Panel grafico cobalto (izquierda) */}
      <div
        style={{
          width: panelW,
          height: "100%",
          backgroundColor: COBALTO,
          padding: pad,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Monograma D arriba (line-art real, en crema sobre cobalto) */}
        <Img src={ASSETS.monogramaD} style={{ width: 120, height: "auto" }} />

        {/* Titular Niveau con filo — entrada suave */}
        <div style={{ marginTop: "auto", marginBottom: 40 }}>
          <Titular
            texto={titular}
            size={104}
            color={CREMA}
            weight="black"
            delay={8}
            align="left"
            maxWidth="100%"
          />
          {bajada ? (
            <div style={{ marginTop: 28 }}>
              <Titular
                texto={bajada}
                size={40}
                color={CREMA}
                weight="medium"
                delay={20}
                align="left"
                maxWidth="100%"
              />
            </div>
          ) : null}
        </div>

        {/* Sello firma — entra hacia el final */}
        <Sequence from={Math.max(0, durationInFrames - 50)}>
          <Sello delay={0} height={72} fill={CREMA} textColor={COBALTO} />
        </Sequence>
      </div>

      {/* Heroe: producto a color (derecha), llena el resto */}
      <div style={{ flex: 1, height: "100%", position: "relative" }}>
        <Hero
          videoSrc={videoSrc}
          imageSrc={imageSrc}
          zoomTo={1.06}
          scrimAbajo={0}
        />
      </div>
    </AbsoluteFill>
  );
};
