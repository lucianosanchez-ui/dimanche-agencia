/**
 * PlacaSanguchitoVideo — placas de PRODUCTO de mini sanguchitos (16:9, 8s, mudas).
 *
 * Dos placas hermanas (aprobadas por Luciano 2026-06-11), estilo "cartel de
 * producto" calcado de la placa café: producto ENORME a un lado sobre cobalto
 * pleno, y del otro lado SOLO: moneda D crema (PNG real del set Off_white_blue)
 * + titular Black + descriptor + precio grande + sello "con olorcito a domingo"
 * en su versión CREMA (PNG real, estampado). Sin gradientes, sin bajadas largas.
 *
 *  - Placa 1 "sanguchito": hero = clip Seedance del SQUEEZE (la mano aprieta el
 *    pan de papa y el pan se recupera), espejado para que el producto quede a la
 *    derecha. Texto a la izquierda. $1.200.
 *  - Placa 2 "caja x 9": hero = caja de 9 sobre cobalto (imagen + push-in por
 *    código). Texto a la derecha. "para el partido" · $10.000.
 *
 * Handoff clip→still sin glitch (técnica delivery/budines): el still del ÚLTIMO
 * frame del clip vive DETRÁS a opacidad plena; el clip corre en una Sequence de
 * 150f y al terminar queda el still. Export mudo. Estática = frame asentado.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, TV_GRAFICA } from "../brand";

export type PlacaSanguchitoVideoProps = {
  /** Imagen hero (placa caja) o still inicial (placa squeeze). */
  heroSrc: string;
  /** Clip del hero (squeeze). Si está, corre en Sequence de 150f sobre el endStill. */
  heroClipSrc: string | null;
  /** Último frame del clip (queda de fondo tras la Sequence). */
  heroEndStillSrc: string | null;
  textSide: "left" | "right";
  titularLines: string[];
  descriptor: string;
  precio: string;
};

export const placaSanguchitoVideoDefaultProps: PlacaSanguchitoVideoProps = {
  heroSrc: staticFile("media/tv/sanguchitos/hero-squeeze-mirrored.png"),
  heroClipSrc: staticFile("media/tv/sanguchitos/squeeze-clip.mp4"),
  heroEndStillSrc: staticFile("media/tv/sanguchitos/squeeze-end.png"),
  textSide: "left",
  titularLines: ["sanguchito"],
  descriptor: "pan de papa, jamón y queso",
  precio: "$1.200",
};

export const placaSanguchitoCajaDefaultProps: PlacaSanguchitoVideoProps = {
  heroSrc: staticFile("media/tv/sanguchitos/hero-caja-cobalto.png"),
  heroClipSrc: null,
  heroEndStillSrc: null,
  textSide: "right",
  titularLines: ["para", "el partido"],
  descriptor: "caja x 9",
  precio: "$10.000",
};

const CLIP_DUR = 150; // 5s @ 30fps

export const PlacaSanguchitoVideo: React.FC<PlacaSanguchitoVideoProps> = ({
  heroSrc,
  heroClipSrc,
  heroEndStillSrc,
  textSide,
  titularLines,
  descriptor,
  precio,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const x0 = textSide === "left" ? 120 : 1060;

  // Push-in por código SOLO cuando el hero es imagen fija (placa caja).
  const pushScale = heroClipSrc
    ? 1
    : interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.ease),
      });

  const enter = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
    return {
      opacity: interpolate(s, [0, 1], [0, 1]),
      y: interpolate(s, [0, 1], [22, 0]),
    };
  };

  // Moneda D: pop.
  const logo = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const logoScale = interpolate(logo, [0, 1], [0.6, 1]);
  const logoOp = interpolate(logo, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  // Precio: pop con peso propio.
  const precioSpring = spring({ frame: frame - 58, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const precioScale = interpolate(precioSpring, [0, 1], [0.75, 1]);
  const precioOp = interpolate(precioSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // Sello crema: se ESTAMPA.
  const sello = spring({ frame: frame - 80, fps, config: { damping: 11, mass: 0.7, stiffness: 130 } });
  const selloScale = interpolate(sello, [0, 1], [1.18, 1.0]);
  const selloRot = interpolate(sello, [0, 1], [-12, -5]);
  const selloOp = interpolate(sello, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });

  const heroStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Hero: clip con handoff a still, o imagen con push-in */}
      {heroClipSrc ? (
        <>
          {heroEndStillSrc ? <Img src={heroEndStillSrc} style={heroStyle} /> : null}
          <Sequence from={0} durationInFrames={CLIP_DUR}>
            <Img src={heroSrc} style={heroStyle} />
            <OffthreadVideo src={heroClipSrc} muted style={heroStyle} />
          </Sequence>
        </>
      ) : (
        <AbsoluteFill style={{ transform: `scale(${pushScale})`, transformOrigin: "30% 60%" }}>
          <Img src={heroSrc} style={heroStyle} />
        </AbsoluteFill>
      )}

      {/* Capa gráfica */}
      <AbsoluteFill>
        {/* Moneda D crema (PNG real) */}
        <Img
          src={TV_GRAFICA.monedaCrema}
          style={{
            position: "absolute",
            left: x0,
            top: 116,
            width: 125,
            height: "auto",
            transform: `scale(${logoScale})`,
            transformOrigin: "left center",
            opacity: logoOp,
          }}
        />

        {/* Titular en beats */}
        <div style={{ position: "absolute", left: x0 - 4, top: 330 }}>
          {titularLines.map((line, i) => {
            const e = enter(16 + i * 10);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.black,
                  fontSize: 116,
                  lineHeight: "128px",
                  letterSpacing: "-0.02em",
                  color: CREMA,
                  opacity: e.opacity,
                  transform: `translateY(${e.y}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Descriptor */}
        {(() => {
          const e = enter(42);
          return (
            <div
              style={{
                position: "absolute",
                left: x0,
                top: 330 + titularLines.length * 128 + 26,
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.medium,
                fontSize: 44,
                color: CREMA,
                opacity: e.opacity,
                transform: `translateY(${e.y}px)`,
              }}
            >
              {descriptor}
            </div>
          );
        })()}

        {/* Precio */}
        <div
          style={{
            position: "absolute",
            left: x0 - 4,
            top: 330 + titularLines.length * 128 + 26 + 96,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.black,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: CREMA,
            transform: `scale(${precioScale})`,
            transformOrigin: "left center",
            opacity: precioOp,
          }}
        >
          {precio}
        </div>

        {/* Sello crema real, estampado */}
        <Img
          src={TV_GRAFICA.selloCrema}
          style={{
            position: "absolute",
            left: textSide === "left" ? 110 : 1490,
            top: 870,
            width: 330,
            height: "auto",
            transform: `rotate(${selloRot}deg) scale(${selloScale})`,
            transformOrigin: "center",
            opacity: selloOp,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
