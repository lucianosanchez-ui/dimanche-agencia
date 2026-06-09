/**
 * PlacaServicio — placa de SERVICIO (horarios + locales) del loop de TV (16:9).
 *
 * Fondo cobalto (placa-texto: aca SI manda el azul). Antetitulo chico + titular
 * con filo + los 3 locales en fila (zona grande + horario). Alto contraste
 * (crema sobre cobalto) para leerse desde la cola del mostrador.
 *
 * Datos en brand.ts -> LOCALES. Horarios PROVISORIOS (confirmar con Anto).
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, LOCALES } from "../brand";
import { Titular } from "./Titular";

type PlacaServicioProps = {
  antetitulo?: string;
  titulo?: string;
};

export const PlacaServicio: React.FC<PlacaServicioProps> = ({
  antetitulo = "dónde y cuándo",
  titulo = "siempre cerca",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Antetitulo (etiqueta chica MAYUS).
  const head = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const headOpacity = interpolate(head, [0, 1], [0, 1]);
  const headY = interpolate(head, [0, 1], [16, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COBALTO,
        padding: 110,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Antetitulo */}
      <div
        style={{
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          fontFamily: FONT_FAMILY,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: 32,
          letterSpacing: "0.14em",
          color: CREMA,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        {antetitulo}
      </div>

      {/* Titular con filo */}
      <Titular
        texto={titulo}
        size={108}
        color={CREMA}
        weight="black"
        delay={10}
        align="left"
        maxWidth="100%"
        shadow={false}
      />

      {/* Fila de locales */}
      <div style={{ marginTop: 86, display: "flex", gap: 96 }}>
        {LOCALES.map((l, i) => {
          const e = spring({
            frame: frame - (30 + i * 7),
            fps,
            config: { damping: 200 },
          });
          const o = interpolate(e, [0, 1], [0, 1]);
          const y = interpolate(e, [0, 1], [22, 0]);
          return (
            <div
              key={l.zona}
              style={{ opacity: o, transform: `translateY(${y}px)` }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.bold,
                  fontSize: 66,
                  color: CREMA,
                  lineHeight: 1.04,
                }}
              >
                {l.zona}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.medium,
                  fontSize: 34,
                  color: CREMA,
                  opacity: 0.82,
                }}
              >
                {l.horario}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
