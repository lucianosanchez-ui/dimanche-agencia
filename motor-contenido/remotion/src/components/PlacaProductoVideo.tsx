/**
 * PlacaProductoVideo — versión EN MOVIMIENTO del molde de producto (16:9, 10s).
 *
 * Movimiento sin generar nada (cero créditos): push-in lento sobre el hero
 * (Ken Burns) + la capa gráfica que ENTRA coreografiada (monograma pop, gancho
 * en beats, nombre/precios escalonados, sello que se estampa). Después queda fijo
 * para lectura en la rotación del TV. Export mudo.
 *
 * Mismas props que PlacaProducto.
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
  Easing,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, ASSETS } from "../brand";
import { Sello } from "./Sello";

type Precio = { label: string; valor: string };

export type PlacaProductoVideoProps = {
  heroSrc: string;
  gancho: string[];
  nombre: string;
  precios: Precio[];
};

export const placaProductoVideoDefaultProps: PlacaProductoVideoProps = {
  heroSrc: "media/tv/producto-pan.png",
  gancho: ["se hace todos", "los días. todos"],
  nombre: "pan casero",
  precios: [{ label: "el kilo", valor: "$5.500" }],
};

export const PlacaProductoVideo: React.FC<PlacaProductoVideoProps> = ({
  heroSrc,
  gancho,
  nombre,
  precios,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Push-in lento sobre el hero.
  const pushScale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Helper de entrada (fade + leve subida).
  const enter = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
    return { opacity: interpolate(s, [0, 1], [0, 1]), y: interpolate(s, [0, 1], [22, 0]) };
  };

  // Monograma: pop.
  const logo = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const logoScale = interpolate(logo, [0, 1], [0.6, 1]);
  const logoOp = interpolate(logo, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  // Sello: se estampa.
  const sello = spring({ frame: frame - 70, fps, config: { damping: 12, mass: 0.7, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Hero con push-in */}
      <AbsoluteFill style={{ transform: `scale(${pushScale})`, transformOrigin: "68% 58%" }}>
        <Img
          src={staticFile(heroSrc)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Refuerzo de legibilidad a la izquierda */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(53,89,224,0.92) 0%, rgba(53,89,224,0.72) 34%, rgba(53,89,224,0) 60%)",
        }}
      />

      {/* Capa gráfica izquierda (entra) */}
      <AbsoluteFill style={{ padding: 110, flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 880 }}>
          {/* Monograma */}
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              backgroundColor: CREMA,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
              transform: `scale(${logoScale})`,
              transformOrigin: "left center",
              opacity: logoOp,
              boxShadow: "0 8px 26px rgba(0,0,0,0.18)",
            }}
          >
            <Img src={ASSETS.monogramaD} style={{ width: 66, height: "auto" }} />
          </div>

          {/* Gancho en beats */}
          {gancho.map((linea, i) => {
            const e = enter(14 + i * 10);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.black,
                  fontSize: 86,
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: CREMA,
                  opacity: e.opacity,
                  transform: `translateY(${e.y}px)`,
                }}
              >
                {linea}
              </div>
            );
          })}

          {/* Nombre + precios */}
          <div style={{ marginTop: 40 }}>
            {(() => {
              const e = enter(40);
              return (
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHTS.medium,
                    fontSize: 40,
                    color: CREMA,
                    opacity: e.opacity * 0.9,
                    transform: `translateY(${e.y}px)`,
                    marginBottom: 12,
                  }}
                >
                  {nombre}
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 44, alignItems: "flex-end", flexWrap: "wrap" }}>
              {precios.map((p, i) => {
                const e = enter(52 + i * 12);
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", opacity: e.opacity, transform: `translateY(${e.y}px)` }}>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontWeight: FONT_WEIGHTS.medium,
                        fontSize: 28,
                        color: CREMA,
                        opacity: 0.7,
                        marginBottom: 2,
                      }}
                    >
                      {p.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontWeight: FONT_WEIGHTS.black,
                        fontSize: 92,
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                        color: CREMA,
                      }}
                    >
                      {p.valor}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Sello firma — pie izquierdo (se estampa) */}
      <div
        style={{
          position: "absolute",
          left: 110,
          bottom: 64,
          transform: `scale(${interpolate(sello, [0, 1], [1.18, 1.0])}) rotate(${interpolate(sello, [0, 1], [-8, 0])}deg)`,
          transformOrigin: "left center",
          opacity: interpolate(sello, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <Sello delay={0} height={60} fill={CREMA} textColor={COBALTO} />
      </div>
    </AbsoluteFill>
  );
};
