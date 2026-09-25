/**
 * Placa MEDIALUNAS — retrabajada (29/08). Mecanismo: **CORTE, no animación**.
 *
 * Es el producto estrella, así que se lleva la placa más trabajada. Todas las
 * demás placas animan UNA foto; esta se mueve por **montaje**: tres tomas reales
 * de la sesión propia, con corte seco entre ellas, y el copy que se COMPLETA al
 * ritmo de los cortes (la segunda línea cae justo cuando entra el gesto).
 *
 *   1. (0–2.2s)  el producto solo, primer plano, push-in lento. Sin texto.
 *   2. (2.2–4.4s) la mesa servida — corte seco. Entra "se moja."
 *   3. (4.4–8s)  EL GESTO: la mano mojando la medialuna en el café — corte seco.
 *                Cae "no se discute." + sello. Queda fijo para lectura.
 *
 * El texto vive en la pared cobalto REAL de la foto (misma idea que la placa de
 * masas) y en una posición que funciona en las tres tomas, para que el corte no
 * lo mueva de lugar.
 *
 * Heroes: `01_Fotos/Medialunas-y-facturas/medialunas-facturas_16 / _13 / _17`,
 * recortadas a 16:9 en `public/media/tv/medialunas/`. Foto real, cero IA.
 * SIN PRECIO (pedido de Luciano 29/08: precio solo en café, criollos y
 * sanguchitos). Export mudo.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COBALTO, CREMA, TV_GRAFICA } from "../brand";
import { Titular } from "./Titular";

/** Frames de corte (30 fps). */
const CUT_2 = 66;
const CUT_3 = 132;

export type PlacaMedialunasVideoProps = {
  beat1Src: string;
  beat2Src: string;
  beat3Src: string;
  /** Primera mitad del copy: entra con el corte 2. */
  linea1: string;
  /** Remate: cae con el corte 3, junto al gesto. */
  linea2: string;
};

export const placaMedialunasVideoDefaultProps: PlacaMedialunasVideoProps = {
  beat1Src: "media/tv/medialunas/beat1-hero.jpg",
  beat2Src: "media/tv/medialunas/beat2-mesa.jpg",
  beat3Src: "media/tv/medialunas/beat3-mojar.jpg",
  linea1: "se moja.",
  linea2: "no se discute.",
};

/** Toma: foto a sangre con su propio push (cada corte cambia de dirección). */
const Toma: React.FC<{ src: string; from: number; to: number; zoom: [number, number] }> = ({
  src,
  from,
  to,
  zoom,
}) => {
  const frame = useCurrentFrame();
  const local = interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${interpolate(local, [0, 1], zoom)})`,
      }}
    />
  );
};

export const PlacaMedialunasVideo: React.FC<PlacaMedialunasVideoProps> = ({
  beat1Src,
  beat2Src,
  beat3Src,
  linea1,
  linea2,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const selloS = spring({
    frame: frame - (CUT_3 + 62),
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {/* Las tres tomas, corte seco (sin crossfade: el corte ES el movimiento) */}
      <Sequence durationInFrames={CUT_2}>
        <Toma src={beat1Src} from={0} to={CUT_2} zoom={[1.0, 1.06]} />
      </Sequence>
      <Sequence from={CUT_2} durationInFrames={CUT_3 - CUT_2}>
        <Toma src={beat2Src} from={CUT_2} to={CUT_3} zoom={[1.05, 1.0]} />
      </Sequence>
      <Sequence from={CUT_3}>
        <Toma src={beat3Src} from={CUT_3} to={durationInFrames} zoom={[1.0, 1.05]} />
      </Sequence>

      {/* Refuerzo mínimo en la pared (arriba-izquierda), donde va el texto */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, rgba(28,50,140,0.40) 0%, rgba(28,50,140,0.12) 34%, rgba(28,50,140,0) 52%)",
        }}
      />

      {/* Columna de texto: MISMA posición en las tres tomas, así el corte no la mueve */}
      <div style={{ position: "absolute", top: 104, left: 112, maxWidth: 900 }}>
        <Img
          src={TV_GRAFICA.monedaCrema}
          style={{
            width: 92,
            marginBottom: 30,
            opacity: interpolate(frame, [8, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        {/* Línea 1: entra con el corte 2 */}
        {frame >= CUT_2 && (
          <Titular
            texto={linea1}
            size={96}
            color={CREMA}
            delay={CUT_2 + 8}
            maxWidth={860}
          />
        )}

        {/* Remate: cae con el corte 3, sincronizado con el gesto */}
        {frame >= CUT_3 && (
          <Titular
            texto={linea2}
            size={96}
            color={CREMA}
            delay={CUT_3 + 6}
            maxWidth={860}
          />
        )}

        {/* Sello CREMA (va sobre la pared cobalto, no sobre el mantel) */}
        {frame >= CUT_3 + 55 && (
          <Img
            src={TV_GRAFICA.selloCrema}
            style={{
              width: 320,
              marginTop: 34,
              opacity: interpolate(selloS, [0, 0.35], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(selloS, [0, 1], [1.18, 1])}) rotate(${interpolate(
                selloS,
                [0, 1],
                [-12, -5],
              )}deg)`,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
