/**
 * Placa ESCENA — el formato post-29/08. Mecanismo: **CONTEXTO DE USO**.
 *
 * Dirección de Luciano (29/08, tras rechazar el "monumento" de chipa como "un
 * espanto"): las placas de producto van con el producto EN USO — packaging real
 * de la marca (bolsa, vaso, papel), manos/personas, fondo CRUDO (crema), que en
 * pantalla se ve mejor que el cobalto pleno. Nada de producto solo flotando.
 *
 * El hero es una ESCENA generada con nano_banana_2 desde DOS referencias reales
 * (regla de oro): la foto de celu del producto + la foto del packaging oficial.
 * El prompt exige producto y packaging IDÉNTICOS y solo compone la escena
 * (mesa, luz, mano anónima — lo de "gente anónima" ya validado en Día del
 * Padre). El texto vive en la zona calma que el prompt le reservó a propósito
 * ("the left third stays calm for typography").
 *
 * La capa gráfica es un marco quieto: tipografía COBALTO sobre el crudo de la
 * foto, moneda D, sello estampado. Movimiento: push-in lento + entradas — la
 * escena es la protagonista, el texto no compite.
 *
 * SIN PRECIO salvo los tres autorizados (café, criollos, sanguchitos).
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COBALTO, FONT_FAMILY, FONT_WEIGHTS, TV_GRAFICA } from "../brand";
import { Titular } from "./Titular";

type Esquina = "arriba-izquierda" | "arriba-derecha" | "abajo-izquierda" | "abajo-derecha";

export type PlacaEscenaVideoProps = {
  heroSrc: string;
  titular: string[];
  /** Renglón chico de apoyo (qué es). */
  bajada: string;
  /** Dónde está la zona calma de ESTA escena. */
  textoEn: Esquina;
  /** Dónde cae el sello (opuesto al texto). */
  selloEn: Esquina;
  /** Push-in (true) o pull-back (false) — alternar entre placas vecinas. */
  pushIn: boolean;
};

export const placaChipaEscenaProps: PlacaEscenaVideoProps = {
  // Escena: canasta llena real (foto celu 29/08) + bolsa oficial + mano
  // llevándose una. Job e965520a (nano_banana_2, 2 refs).
  heroSrc: "media/tv/escenas/chipa-canasta.png",
  titular: ["nadie agarra", "uno solo"],
  bajada: "chipa queso",
  textoEn: "abajo-izquierda",
  // abajo-derecha está ocupado por la bolsa: el sello iría ENCIMA del logo.
  selloEn: "arriba-derecha",
  pushIn: true,
};

export const placaMedialunaCafeProps: PlacaEscenaVideoProps = {
  // Escena: medialuna real sobre el papel de marca (foto celu 29/08) + vaso
  // cobalto oficial en mano + café con gente de fondo. Job 6b466c7d.
  heroSrc: "media/tv/escenas/medialuna-cafe.png",
  titular: ["se moja.", "no se discute."],
  bajada: "medialunas",
  textoEn: "arriba-izquierda",
  selloEn: "abajo-izquierda",
  pushIn: false,
};

const posiciones: Record<Esquina, React.CSSProperties> = {
  "arriba-izquierda": { top: 88, left: 104 },
  "arriba-derecha": { top: 88, right: 104 },
  "abajo-izquierda": { bottom: 88, left: 104 },
  "abajo-derecha": { bottom: 88, right: 104 },
};

export const PlacaEscenaVideo: React.FC<PlacaEscenaVideoProps> = ({
  heroSrc,
  titular,
  bajada,
  textoEn,
  selloEn,
  pushIn,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const heroScale = pushIn
    ? interpolate(t, [0, 1], [1.0, 1.06])
    : interpolate(t, [0, 1], [1.06, 1.0]);

  const selloS = spring({
    frame: frame - 118,
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#EDE8DF", overflow: "hidden" }}>
      <Img
        src={staticFile(heroSrc)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${heroScale})`,
        }}
      />

      {/* Bloque de texto en la zona calma de la escena, tipografía cobalto */}
      <div style={{ position: "absolute", maxWidth: 860, ...posiciones[textoEn] }}>
        <Img
          src={TV_GRAFICA.emblema}
          style={{
            width: 148,
            marginBottom: 26,
            opacity: interpolate(frame, [8, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        {/* Una línea por Titular: el quiebre lo decide el copy, no el ancho */}
        {titular.map((linea, i) => (
          <Titular
            key={linea}
            texto={linea}
            size={92}
            color={COBALTO}
            delay={24 + i * 14}
            shadow={false}
            maxWidth={860}
          />
        ))}
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 38,
            color: COBALTO,
            opacity: interpolate(frame, [62, 82], [0, 0.75], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {bajada}
        </div>
      </div>

      {/* Sello cobalto estampado sobre el crudo */}
      <Img
        src={TV_GRAFICA.selloDomingo}
        style={{
          position: "absolute",
          width: 300,
          ...posiciones[selloEn],
          opacity: interpolate(selloS, [0, 0.35], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(selloS, [0, 1], [1.18, 1])}) rotate(${interpolate(
            selloS,
            [0, 1],
            [-12, -5],
          )}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
