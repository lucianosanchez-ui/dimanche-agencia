/**
 * PlacaDesayunoVideo — version EN MOVIMIENTO de la placa Desayuno (16:9).
 *
 * Igual al estatico aprobado (placa-desayuno-v2), pero:
 *  - el hero es el CLIP con vapor (image->video Seedance sobre la base V1 limpia),
 *  - el texto/precio/sello ENTRAN con animacion suave (microanimaciones).
 *
 * El movimiento "de ambiente" (vapor + push-in sutil) ya viene en el clip; aca solo
 * sumamos la entrada de la capa grafica. Se exporta como video corto para la TV.
 */

import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA } from "../brand";
import { Titular } from "./Titular";
import { Sello } from "./Sello";

export type PlacaDesayunoVideoProps = {
  videoSrc: string;
  titular: string;
  bajada: string;
  precio: string;
};

export const placaDesayunoVideoDefaultProps: PlacaDesayunoVideoProps = {
  videoSrc: staticFile("media/tv/desayuno-hero.mp4"),
  titular: "primero, el café",
  bajada: "café + factura, medialuna o dos criollitos",
  precio: "$3.700",
};

export const PlacaDesayunoVideo: React.FC<PlacaDesayunoVideoProps> = ({
  videoSrc,
  titular,
  bajada,
  precio,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bajada: fade + leve subida.
  const be = spring({ frame: frame - 18, fps, config: { damping: 200 } });
  const bOpacity = interpolate(be, [0, 1], [0, 0.92]);
  const bY = interpolate(be, [0, 1], [16, 0]);

  // Precio: fade + leve escala (entra como protagonista).
  const pe = spring({ frame: frame - 30, fps, config: { damping: 200, mass: 0.6 } });
  const pOpacity = interpolate(pe, [0, 1], [0, 1]);
  const pScale = interpolate(pe, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Hero en movimiento (vapor). El clip dura ~5s; a 0.5x llena los 10s de la
          placa con vapor continuo (sin corte ni loop visible). */}
      <OffthreadVideo
        src={videoSrc}
        muted
        playbackRate={0.5}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Capa grafica izquierda */}
      <AbsoluteFill
        style={{
          padding: 112,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 770 }}>
          {/* Titular: entra palabra por palabra (Titular) */}
          <Titular
            texto={titular}
            size={104}
            color={CREMA}
            weight="black"
            delay={6}
            align="left"
            maxWidth="100%"
            shadow={false}
          />

          {/* Bajada */}
          <div
            style={{
              marginTop: 30,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 37,
              lineHeight: 1.25,
              color: CREMA,
              maxWidth: 600,
              opacity: bOpacity,
              transform: `translateY(${bY}px)`,
            }}
          >
            {bajada}
          </div>

          {/* Precio */}
          <div
            style={{
              marginTop: 46,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: CREMA,
              opacity: pOpacity,
              transform: `scale(${pScale})`,
              transformOrigin: "left center",
            }}
          >
            {precio}
          </div>
        </div>
      </AbsoluteFill>

      {/* Sello firma — pie izquierdo */}
      <div style={{ position: "absolute", left: 112, bottom: 70 }}>
        <Sello delay={42} height={66} fill={CREMA} textColor={COBALTO} />
      </div>
    </AbsoluteFill>
  );
};
