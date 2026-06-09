/**
 * PlacaHorarios — placa de servicio (horarios de UN local) para la TV (16:9).
 *
 * Esta placa NO parte de una foto: es la cara "editorial / menu board" de la marca.
 * Por eso el fondo es CRUDO (crema) y la identidad se construye con los PNG REALES
 * del set de marca (regla: usar los elementos graficos, no tipear el sello ni
 * dibujar line-art):
 *   - emblema cobalto (anillo "panaderia · pasteleria" + D)  -> arriba, identidad
 *   - sello "con olorcito a domingo" (capsula cobalto PNG)    -> estampa, abajo-der
 *   - sol cobalto (PNG)                                       -> textura al fondo
 *
 * Sobre el crema, todo el texto va en cobalto Niveau. Los horarios son el dato:
 * los numeros (7 / 22) van en grande. Estatica (se le suma movimiento despues).
 */

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, TV_GRAFICA } from "../brand";

type Fila = { dia: string; abre: string; cierra: string };

export type PlacaHorariosProps = {
  local: string;
  antetitulo: string;
  filas: Fila[];
  /** Qué pieza de marca llena el lado derecho. */
  adorno: "croissant" | "emblema";
  emblemaSrc: string;
  selloSrc: string;
  croissantSrc: string;
};

export const placaHorariosDefaultProps: PlacaHorariosProps = {
  local: "Villa Allende",
  antetitulo: "horarios",
  filas: [
    { dia: "lunes a sábado", abre: "7", cierra: "22" },
    { dia: "domingos", abre: "8", cierra: "20" },
  ],
  adorno: "croissant",
  emblemaSrc: TV_GRAFICA.emblema,
  selloSrc: TV_GRAFICA.selloDomingo,
  croissantSrc: TV_GRAFICA.croissant,
};

/** Una fila de horario: dia (medium) + rango con los numeros en grande. */
const FilaHorario: React.FC<{ fila: Fila }> = ({ fila }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      width: 760,
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
      {fila.dia}
    </span>
    <span style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
      <Numero>{fila.abre}</Numero>
      <Conector>a</Conector>
      <Numero>{fila.cierra}</Numero>
      <Conector>h</Conector>
    </span>
  </div>
);

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

export const PlacaHorarios: React.FC<PlacaHorariosProps> = ({
  local,
  antetitulo,
  filas,
  adorno,
  emblemaSrc,
  selloSrc,
  croissantSrc,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: CREMA, overflow: "hidden" }}>
      {/* Marco fino tipo menu board (cobalto tenue) */}
      <div
        style={{
          position: "absolute",
          inset: 46,
          border: `2px solid ${COBALTO}`,
          opacity: 0.22,
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />

      {/* Columna de contenido (izquierda, centrada vertical) */}
      <AbsoluteFill
        style={{
          padding: "0 130px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Emblema cobalto (identidad). Si el adorno grande de la derecha YA es el
            emblema, no lo repetimos arriba. */}
        {adorno !== "emblema" ? (
          <Img
            src={emblemaSrc}
            style={{ height: 170, width: "auto", marginBottom: 48 }}
          />
        ) : null}

        {/* Antetitulo */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 30,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: COBALTO,
            opacity: 0.7,
            marginBottom: 8,
          }}
        >
          {antetitulo}
        </div>

        {/* Local */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.black,
            fontSize: 116,
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: COBALTO,
            marginBottom: 40,
          }}
        >
          {local}
        </div>

        {/* Hairline */}
        <div
          style={{
            width: 760,
            height: 2,
            backgroundColor: COBALTO,
            opacity: 0.25,
            marginBottom: 40,
          }}
        />

        {/* Horarios */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {filas.map((f) => (
            <FilaHorario key={f.dia} fila={f} />
          ))}
        </div>
      </AbsoluteFill>

      {/* Pieza de marca grande que llena el lado derecho (medialuna o emblema) */}
      {adorno === "croissant" ? (
        <Img
          src={croissantSrc}
          style={{
            position: "absolute",
            right: 110,
            top: "50%",
            transform: "translateY(-62%) rotate(-6deg)",
            height: 460,
            width: "auto",
          }}
        />
      ) : (
        <Img
          src={emblemaSrc}
          style={{
            position: "absolute",
            right: 150,
            top: "50%",
            transform: "translateY(-56%)",
            height: 500,
            width: "auto",
          }}
        />
      )}

      {/* Sello "con olorcito a domingo": estampa abajo-derecha, leve rotacion */}
      <Img
        src={selloSrc}
        style={{
          position: "absolute",
          right: 120,
          bottom: 96,
          width: 500,
          height: "auto",
          transform: "rotate(-5deg)",
        }}
      />
    </AbsoluteFill>
  );
};
