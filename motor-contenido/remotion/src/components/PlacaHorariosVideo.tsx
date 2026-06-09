/**
 * PlacaHorariosVideo — version EN MOVIMIENTO de la placa de horarios (16:9).
 *
 * No hay foto/clip: el movimiento es la ENTRADA que arma la placa al aparecer
 * (consistente con el flujo: cada placa se revela al entrar en la rotacion).
 * Coreografia, sutil y editorial:
 *   1. marco + emblema entran (fade / pop)
 *   2. "horarios" -> "Villa Allende" (palabra x palabra)
 *   3. la hairline se DIBUJA (ancho 0 -> 760)
 *   4. los horarios suben escalonados
 *   5. el sello "con olorcito a domingo" se ESTAMPA (escala + leve rebote/rotacion)
 * Despues queda fijo para lectura. Export mudo.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, TV_GRAFICA } from "../brand";
import { Titular } from "./Titular";

type Fila = { dia: string; abre: string; cierra: string };

export type PlacaHorariosVideoProps = {
  local: string;
  antetitulo: string;
  filas: Fila[];
  emblemaSrc: string;
  selloSrc: string;
};

export const placaHorariosVideoDefaultProps: PlacaHorariosVideoProps = {
  local: "Villa Allende",
  antetitulo: "horarios",
  filas: [
    { dia: "lunes a sábado", abre: "7", cierra: "22" },
    { dia: "domingos", abre: "8", cierra: "20" },
  ],
  emblemaSrc: TV_GRAFICA.emblema,
  selloSrc: TV_GRAFICA.selloDomingo,
};

const Numero: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.black,
      fontSize: 92,
      lineHeight: 0.9,
      letterSpacing: "-0.02em",
      color: COBALTO,
    }}
  >
    {children}
  </span>
);

const Conector: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.medium,
      fontSize: 38,
      color: COBALTO,
      opacity: 0.55,
    }}
  >
    {children}
  </span>
);

export const PlacaHorariosVideo: React.FC<PlacaHorariosVideoProps> = ({
  local,
  antetitulo,
  filas,
  emblemaSrc,
  selloSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Helper de entrada (fade + leve subida) por spring.
  const enter = (delay: number, rise = 18) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
    return {
      opacity: interpolate(s, [0, 1], [0, 1]),
      y: interpolate(s, [0, 1], [rise, 0]),
    };
  };

  // Marco: fade suave.
  const marco = interpolate(frame, [0, 24], [0, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Emblema: pop.
  const emb = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const embScale = interpolate(emb, [0, 1], [0.7, 1]);
  const embOpacity = interpolate(emb, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  // Antetitulo.
  const ante = enter(18, 14);

  // Hairline: se dibuja (ancho 0 -> 760).
  const lineW = interpolate(frame, [40, 64], [0, 760], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Sello: se estampa (escala con rebote + leve rotacion overshoot).
  const sello = spring({ frame: frame - 86, fps, config: { damping: 11, mass: 0.7, stiffness: 120 } });
  const selloScale = interpolate(sello, [0, 1], [1.18, 1.0]);
  const selloRot = interpolate(sello, [0, 1], [-12, -5]);
  const selloOpacity = interpolate(sello, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: CREMA, overflow: "hidden" }}>
      {/* Marco fino tipo menu board */}
      <div
        style={{
          position: "absolute",
          inset: 46,
          border: `2px solid ${COBALTO}`,
          opacity: marco,
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />

      {/* Columna de contenido */}
      <AbsoluteFill
        style={{
          padding: "0 130px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* (el emblema va GRANDE a la derecha, no arriba) */}

        {/* Antetitulo */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 30,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: COBALTO,
            opacity: ante.opacity * 0.7,
            transform: `translateY(${ante.y}px)`,
            marginBottom: 8,
          }}
        >
          {antetitulo}
        </div>

        {/* Local — palabra x palabra */}
        <div style={{ marginBottom: 40 }}>
          <Titular
            texto={local}
            size={116}
            color={COBALTO}
            weight="black"
            delay={24}
            align="left"
            maxWidth="100%"
            shadow={false}
          />
        </div>

        {/* Hairline (se dibuja) */}
        <div
          style={{
            width: lineW,
            height: 2,
            backgroundColor: COBALTO,
            opacity: 0.25,
            marginBottom: 40,
          }}
        />

        {/* Horarios (escalonados) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {filas.map((f, i) => {
            const e = enter(54 + i * 14);
            return (
              <div
                key={f.dia}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  width: 760,
                  opacity: e.opacity,
                  transform: `translateY(${e.y}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHTS.medium,
                    fontSize: 42,
                    color: COBALTO,
                    opacity: 0.78,
                  }}
                >
                  {f.dia}
                </span>
                <span style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <Numero>{f.abre}</Numero>
                  <Conector>a</Conector>
                  <Numero>{f.cierra}</Numero>
                  <Conector>h</Conector>
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Emblema grande: ancla del lado derecho (entra con pop) */}
      <Img
        src={emblemaSrc}
        style={{
          position: "absolute",
          right: 150,
          top: "50%",
          height: 500,
          width: "auto",
          transform: `translateY(-56%) scale(${embScale})`,
          transformOrigin: "center center",
          opacity: embOpacity,
        }}
      />

      {/* Sello: estampa abajo-derecha */}
      <Img
        src={selloSrc}
        style={{
          position: "absolute",
          right: 120,
          bottom: 96,
          width: 500,
          height: "auto",
          opacity: selloOpacity,
          transform: `rotate(${selloRot}deg) scale(${selloScale})`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
};
