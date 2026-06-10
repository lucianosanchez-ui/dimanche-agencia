/**
 * PlacaInfo — molde para placas de INFO del TV medio (16:9).
 *
 * Editorial sobre cobalto, todo crema Niveau. Soporta: antetítulo, titular
 * (palabra×palabra), bajada, una lista de items (ej. medios de pago) y un QR
 * opcional con label + número (ej. seguinos / encargos). Entra coreografiado;
 * después queda fijo. Sirve como estática (frame asentado) y como video.
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
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, COLORS, TV_DELIVERY } from "../brand";
import { Titular } from "./Titular";

export type PlacaInfoProps = {
  antetitulo?: string;
  titular: string;
  bajada?: string;
  items?: string[];
  qrSrc?: string;
  qrLabel?: string;
  numero?: string;
};

export const placaInfoDefaultProps: PlacaInfoProps = {
  antetitulo: "medios de pago",
  titular: "sin vueltas",
  bajada: "acá no se discute con la tarjeta",
  items: [],
};

export const PlacaInfo: React.FC<PlacaInfoProps> = ({
  antetitulo,
  titular,
  bajada,
  items,
  qrSrc,
  qrLabel,
  numero,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = (d: number) => {
    const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
    return { opacity: interpolate(s, [0, 1], [0, 1]), y: interpolate(s, [0, 1], [22, 0]) };
  };

  const emb = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const embScale = interpolate(emb, [0, 1], [0.7, 1]);
  const embOp = interpolate(emb, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  const qr = spring({ frame: frame - 64, fps, config: { damping: 16 } });
  const qrScale = interpolate(qr, [0, 1], [0.6, 1]);
  const qrOp = interpolate(qr, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const ante = enter(20);
  const baj = enter(48);

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {/* marco fino tipo menu board */}
      <div style={{ position: "absolute", inset: 46, border: `2px solid ${CREMA}`, opacity: 0.18, borderRadius: 6 }} />

      <AbsoluteFill style={{ padding: "0 130px", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        {/* emblema crema */}
        <Img
          src={TV_DELIVERY.emblemaCrema}
          style={{ height: 132, width: "auto", marginBottom: 40, transform: `scale(${embScale})`, transformOrigin: "left center", opacity: embOp }}
        />

        {antetitulo ? (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 30,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: CREMA,
              opacity: ante.opacity * 0.7,
              transform: `translateY(${ante.y}px)`,
              marginBottom: 12,
            }}
          >
            {antetitulo}
          </div>
        ) : null}

        <Titular texto={titular} size={104} color={CREMA} weight="black" delay={24} align="left" maxWidth="100%" shadow={false} />

        {bajada ? (
          <div
            style={{
              marginTop: 26,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 40,
              lineHeight: 1.2,
              color: CREMA,
              opacity: baj.opacity * 0.92,
              transform: `translateY(${baj.y}px)`,
              maxWidth: 1000,
            }}
          >
            {bajada}
          </div>
        ) : null}

        {/* items (ej. medios de pago) como chips */}
        {items && items.length ? (
          <div style={{ marginTop: 34, display: "flex", gap: 18, flexWrap: "wrap", maxWidth: 1100 }}>
            {items.map((it, i) => {
              const e = enter(56 + i * 10);
              return (
                <span
                  key={i}
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: FONT_WEIGHTS.bold,
                    fontSize: 40,
                    color: COBALTO,
                    backgroundColor: CREMA,
                    padding: "12px 30px",
                    borderRadius: 14,
                    opacity: e.opacity,
                    transform: `translateY(${e.y}px)`,
                  }}
                >
                  {it}
                </span>
              );
            })}
          </div>
        ) : null}
      </AbsoluteFill>

      {/* QR opcional — abajo derecha */}
      {qrSrc ? (
        <div style={{ position: "absolute", right: 130, bottom: 96, display: "flex", alignItems: "center", gap: 30, opacity: qrOp }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
            {qrLabel ? (
              <div style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHTS.medium, fontSize: 30, letterSpacing: "0.16em", textTransform: "uppercase", color: CREMA, opacity: 0.78, marginBottom: 8 }}>
                {qrLabel}
              </div>
            ) : null}
            {numero ? (
              <div style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHTS.black, fontSize: 50, lineHeight: 1, letterSpacing: "-0.01em", color: CREMA }}>{numero}</div>
            ) : null}
          </div>
          <div style={{ backgroundColor: "#FFFFFF", padding: 18, borderRadius: 20, boxShadow: "0 14px 36px rgba(0,0,0,0.3)", transform: `scale(${qrScale})`, transformOrigin: "right bottom" }}>
            <Img src={staticFile(qrSrc)} style={{ width: 300, height: 300, display: "block" }} />
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
