/**
 * PlacaCriollos — placa ESTATICA de criollos para la TV (16:9).
 *
 * Base a sangre = la pila generada (heap real de criollos sobre cobalto, mitad
 * superior libre). Capa grafica arriba: gancho con filo + los dos precios (por
 * kilo) + sello. Niveau embebida. Sin video todavia (se le suma push-in despues).
 */

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, ASSETS } from "../brand";

type Precio = { nombre: string; valor: string };

export type PlacaCriollosProps = {
  imageSrc: string;
  gancho: string[]; // lineas del gancho
  precios: Precio[];
  unidad: string;
};

export const placaCriollosDefaultProps: PlacaCriollosProps = {
  imageSrc: staticFile("media/tv/pila-v2-3.png"),
  gancho: ["¿frío? con estos", "criollitos imposible"],
  precios: [
    { nombre: "criollo común", valor: "$7.500" },
    { nombre: "criollo de hojaldre", valor: "$8.500" },
  ],
  unidad: "el kilo",
};

export const PlacaCriollos: React.FC<PlacaCriollosProps> = ({
  imageSrc,
  gancho,
  precios,
  unidad,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Base: pila a sangre, bajada ~95px (cobalto sobre cobalto = no se nota)
          para ganar aire arriba. */}
      <Img
        src={imageSrc}
        style={{
          position: "absolute",
          top: 95,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Capa grafica: gancho (izq) + precios (der), con el logo arriba */}
      <AbsoluteFill
        style={{
          padding: "70px 120px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* IZQUIERDA: logo + gancho */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Logo: monograma D en disco crema (contrasta sobre cobalto) */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              backgroundColor: CREMA,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
              boxShadow: "0 8px 26px rgba(0,0,0,0.16)",
            }}
          >
            <Img src={ASSETS.monogramaD} style={{ width: 70, height: "auto" }} />
          </div>

          {gancho.map((linea, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 76,
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                color: CREMA,
              }}
            >
              {linea}
            </div>
          ))}
        </div>

        {/* DERECHA: precios, separados y con aire */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            alignItems: "flex-end",
            textAlign: "right",
            marginTop: 8,
          }}
        >
          {precios.map((p) => (
            <div key={p.nombre}>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.medium,
                  fontSize: 32,
                  color: CREMA,
                  opacity: 0.9,
                }}
              >
                {p.nombre}
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHTS.black,
                    fontSize: 72,
                    lineHeight: 1,
                    color: CREMA,
                  }}
                >
                  {p.valor}
                </span>
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHTS.medium,
                    fontSize: 28,
                    color: CREMA,
                    opacity: 0.7,
                  }}
                >
                  {unidad}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
