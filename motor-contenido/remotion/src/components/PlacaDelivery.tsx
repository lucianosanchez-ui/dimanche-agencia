/**
 * PlacaDelivery — placa de delivery para la TV (16:9). Estado FINAL (estatico).
 *
 * Enfoque: comunicar que Dimanche hace delivery PROPIO y empujar el canal DIRECTO
 * (WhatsApp), sin mencionar plataformas. Cliente como heroe ("quedate, te lo
 * llevamos"). Fondo crudo (crema), todo cobalto Niveau.
 *
 * Piezas:
 *  - bolsa real (mano desde abajo levantando el packaging Dimanche) = heroe, der.
 *  - Vespa cobalto con conductor (ilustracion plana) = acento "llega manejando".
 *  - QR a WhatsApp (mensaje precargado) + numero = CTA.
 *
 * La version con movimiento (PlacaDeliveryVideo) anima la llegada de la Vespa,
 * la mano que sube la bolsa, y la entrada del texto + QR.
 */

import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, TV_DELIVERY } from "../brand";

export type PlacaDeliveryProps = {
  titular: string[];
  resalte: string;
  ctaLabel: string;
  numero: string;
  bolsaSrc: string;
  vespaSrc: string;
  qrSrc: string;
};

export const placaDeliveryDefaultProps: PlacaDeliveryProps = {
  titular: ["con olorcito a domingo,", "hasta tu casa"],
  resalte: "te lo llevamos",
  ctaLabel: "pedí por WhatsApp",
  numero: "+54 9 351 663 9003",
  bolsaSrc: TV_DELIVERY.bolsa,
  vespaSrc: TV_DELIVERY.vespa,
  qrSrc: TV_DELIVERY.qr,
};

export const PlacaDelivery: React.FC<PlacaDeliveryProps> = ({
  titular,
  resalte,
  ctaLabel,
  numero,
  bolsaSrc,
  vespaSrc,
  qrSrc,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: CREMA, overflow: "hidden" }}>
      {/* HEROE: mano real levantando la bolsa Dimanche, sangrando por abajo-derecha */}
      <Img
        src={bolsaSrc}
        style={{
          position: "absolute",
          right: 140,
          bottom: -8,
          height: 960,
          width: "auto",
          filter: "drop-shadow(0 24px 48px rgba(40,67,168,0.18))",
        }}
      />

      {/* ACENTO: Vespa cobalto con conductor (espejada para "entrar" hacia la escena) */}
      <Img
        src={vespaSrc}
        style={{
          position: "absolute",
          left: 110,
          top: 96,
          height: 280,
          width: "auto",
          transform: "scaleX(-1)",
        }}
      />

      {/* CONTENIDO izquierda */}
      <AbsoluteFill
        style={{
          padding: "0 130px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Titular */}
        <div style={{ marginTop: 70 }}>
          {titular.map((linea, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 78,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: COBALTO,
              }}
            >
              {linea}
            </div>
          ))}
        </div>

        {/* Resalte: "te lo llevamos" en capsula cobalto (texto crema) */}
        <div style={{ marginTop: 26 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: COBALTO,
              color: CREMA,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 56,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              padding: "12px 30px",
              borderRadius: 16,
            }}
          >
            {resalte}
          </span>
        </div>
      </AbsoluteFill>

      {/* CTA: QR + numero, abajo-izquierda */}
      <div
        style={{
          position: "absolute",
          left: 130,
          bottom: 90,
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* QR en tarjeta blanca */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 18,
            boxShadow: "0 10px 30px rgba(40,67,168,0.16)",
            display: "flex",
          }}
        >
          <Img src={qrSrc} style={{ width: 188, height: 188, display: "block" }} />
        </div>

        {/* Label + numero */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COBALTO,
              opacity: 0.7,
              marginBottom: 8,
            }}
          >
            {ctaLabel}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 52,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: COBALTO,
            }}
          >
            {numero}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 24,
              color: COBALTO,
              opacity: 0.6,
              marginTop: 6,
            }}
          >
            escaneá el código y escribinos
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
