/**
 * PlacaDesayuno — placa del combo DESAYUNO para la TV (16:9, 1920x1080).
 *
 * Hero a sangre = la base generada (vaso azul con café + vapor, bolsa Dimanche con
 * la medialuna, fondo cobalto, mitad izquierda libre). Encima, la capa grafica a la
 * izquierda en Niveau: titular con filo + bajada (qué incluye) + precio protagonista
 * + sello. Sin video todavia — version estatica para aprobar el armado.
 */

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, CREMA, COBALTO } from "../brand";
import { Sello } from "./Sello";

type PlacaDesayunoProps = {
  heroSrc?: string;
  titular?: string;
  bajada?: string;
  precio?: string;
  /** Sol line-art (crema) como acento arriba del titular. Default OFF:
   *  los iconos line-art sueltos quedan pegoteados; la identidad la llevan la
   *  foto (vaso con D + bolsa) + la Niveau + el sello. */
  mostrarSol?: boolean;
  solSrc?: string;
};

export const PlacaDesayuno: React.FC<PlacaDesayunoProps> = ({
  heroSrc = staticFile("media/tv/desayuno-v1.png"),
  titular = "primero, el café",
  bajada = "café + factura, medialuna o dos criollitos",
  precio = "$3.700",
  mostrarSol = false,
  solSrc = staticFile("assets/tv/sun-line.svg"),
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Base: hero a sangre */}
      <Img
        src={heroSrc}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Capa grafica: columna de texto a la izquierda */}
      <AbsoluteFill
        style={{
          padding: 112,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 770 }}>
          {/* Acento: sol line-art en crema (mañana / domingo) */}
          {mostrarSol ? (
            <Img
              src={solSrc}
              style={{
                width: 150,
                height: "auto",
                opacity: 0.9,
                marginBottom: 28,
                display: "block",
              }}
            />
          ) : null}

          {/* Titular con filo */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: "-0.01em",
              color: CREMA,
            }}
          >
            {titular}
          </div>

          {/* Bajada: qué incluye */}
          <div
            style={{
              marginTop: 30,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 37,
              lineHeight: 1.25,
              color: CREMA,
              opacity: 0.92,
              maxWidth: 600,
            }}
          >
            {bajada}
          </div>

          {/* Precio: protagonista */}
          <div
            style={{
              marginTop: 46,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: CREMA,
            }}
          >
            {precio}
          </div>

          {/* Sello: capsula crema (contrasta sobre el cobalto) */}
          <div style={{ marginTop: 42 }}>
            <Sello delay={0} height={66} fill={CREMA} textColor={COBALTO} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
