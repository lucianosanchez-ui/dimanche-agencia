/**
 * PlacaBudinesVideo — placa de PRODUCTO (TV izquierda), 16:9, 12 s, muda.
 *
 * Estructura en 3 actos (aprobada por Luciano 2026-06-10):
 *  1. (0–4.2s)  LA JUNTADA — clip Seedance del budín chocolatoso cortado sobre
 *     crema (motion mínimo) + titular palabra×palabra "el que te salva" y
 *     cápsula cobalto "la juntada". Producto grande, solo titular.
 *  2. (4.2–10.2s) LA FAMILIA — los 6 budines en cenital VERTICAL, de a uno
 *     (~1s c/u), bien grandes, con su nombre Niveau al lado. Más estático.
 *  3. (10.2–12s) CIERRE — los 6 en fila + "$4.500 · el que sea" en cápsula +
 *     remate "los mates los pone otro." + sello estampado. Queda FIJO.
 *     La versión ESTÁTICA es un still de este acto asentado (--frame=355).
 *
 * Assets: public/media/tv/budines/ — hero-clip.mp4 (Seedance 1080p), hero-still.png
 * (primer frame, respaldo anti-glitch) y cenital-*.png (recortados, fondo
 * normalizado EXACTO a #E9E3D9, ya rotados a vertical). Regla de oro: todo
 * parte de fotos reales (producciones de mayo + cenital IMG_9603).
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
  staticFile,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, TV_GRAFICA } from "../brand";
import { Titular } from "./Titular";

type Budin = { key: string; src: string; label: string };

export type PlacaBudinesVideoProps = {
  clipSrc: string;
  stillSrc: string;
  titular: { linea: string; capsula: string };
  budines: Budin[];
  precio: string;
  precioSub: string;
  remate: string;
};

export const placaBudinesVideoDefaultProps: PlacaBudinesVideoProps = {
  clipSrc: staticFile("media/tv/budines/hero-clip.mp4"),
  stillSrc: staticFile("media/tv/budines/hero-still.png"),
  titular: { linea: "el que te salva", capsula: "la juntada" },
  budines: [
    { key: "manzana", src: staticFile("media/tv/budines/cenital-manzana.png"), label: "manzana" },
    { key: "frutos-secos", src: staticFile("media/tv/budines/cenital-frutos-secos.png"), label: "frutos secos" },
    { key: "carrot", src: staticFile("media/tv/budines/cenital-carrot.png"), label: "carrot" },
    { key: "chocolatoso", src: staticFile("media/tv/budines/cenital-chocolatoso.png"), label: "chocolatoso" },
    { key: "chips", src: staticFile("media/tv/budines/cenital-chips.png"), label: "chips de chocolate" },
    { key: "limon", src: staticFile("media/tv/budines/cenital-limon.png"), label: "limón" },
  ],
  precio: "$4.500",
  precioSub: "el que sea",
  remate: "los mates los pone otro.",
};

// Timeline (30 fps)
const ACTO1_DUR = 126; // 0–4.2s
const POR_BUDIN = 30; // 1s por budín
const ACTO2_DUR = 6 * POR_BUDIN; // 180 f
const ACTO2_FROM = ACTO1_DUR;
const CIERRE_FROM = ACTO2_FROM + ACTO2_DUR; // f306
// total: 360 f (12 s)

/** Acto 2 — un budín cenital vertical grande + nombre al lado. */
const BudinFocus: React.FC<{ budin: Budin; index: number; total: number }> = ({
  budin,
  index,
  total,
}) => {
  const frame = useCurrentFrame(); // local a la Sequence
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.7 } });
  const y = interpolate(enter, [0, 1], [26, 0]);
  const opacity = interpolate(enter, [0, 0.45], [0, 1], { extrapolateRight: "clamp" });

  const nameIn = spring({ frame: frame - 5, fps, config: { damping: 200, mass: 0.7 } });
  const nameOpacity = interpolate(nameIn, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const nameY = interpolate(nameIn, [0, 1], [18, 0]);

  // hairline que se dibuja
  const lineW = interpolate(frame, [10, 22], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: CREMA }}>
      {/* budín vertical grande, centrado en la mitad izquierda */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 0,
          width: 700,
          height: 1080,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <Img
          src={budin.src}
          style={{
            maxHeight: 1040,
            maxWidth: 700,
            objectFit: "contain",
          }}
        />
      </div>

      {/* nombre + hairline + contador */}
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 0,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.black,
            fontSize: 130,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            color: COBALTO,
            maxWidth: 800,
          }}
        >
          {budin.label}
        </div>
        <div
          style={{
            marginTop: 34,
            width: lineW,
            height: 4,
            backgroundColor: COBALTO,
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 40,
            color: COBALTO,
            opacity: 0.85,
          }}
        >
          {index + 1} de {total}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PlacaBudinesVideo: React.FC<PlacaBudinesVideoProps> = ({
  clipSrc,
  stillSrc,
  titular,
  budines,
  precio,
  precioSub,
  remate,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Acto 1: fade-out al final (a crema) ---
  const acto1Opacity = interpolate(
    frame,
    [ACTO1_DUR - 14, ACTO1_DUR],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // cápsula "la juntada": pop
  const cap = spring({ frame: frame - 34, fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });
  const capScale = interpolate(cap, [0, 1], [0.7, 1]);
  const capOpacity = interpolate(cap, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // --- Cierre ---
  const f3 = frame - CIERRE_FROM; // frame local del cierre
  const precioSpring = spring({ frame: f3 - 14, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const precioScale = interpolate(precioSpring, [0, 1], [0.7, 1]);
  const precioOpacity = interpolate(precioSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(f3, [26, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const remOpacity = interpolate(f3, [32, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // sello: se ESTAMPA (scale 1.18→1, rotación -12°→-5°)
  const selloSpring = spring({ frame: f3 - 38, fps, config: { damping: 11, mass: 0.7, stiffness: 130 } });
  const selloScale = interpolate(selloSpring, [0, 1], [1.18, 1]);
  const selloRot = interpolate(selloSpring, [0, 1], [-12, -5]);
  const selloOpacity = interpolate(selloSpring, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: CREMA }}>
      {/* ================= ACTO 1 — la juntada ================= */}
      <Sequence from={0} durationInFrames={ACTO1_DUR}>
        <AbsoluteFill style={{ opacity: acto1Opacity }}>
          {/* still detrás (respaldo anti-glitch) + clip Seedance encima */}
          <Img src={stillSrc} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <OffthreadVideo
            src={clipSrc}
            muted
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* titular (solo titular: decisión Luciano) */}
          <div style={{ position: "absolute", left: 110, top: 100 }}>
            <Titular
              texto={titular.linea}
              size={140}
              color={COBALTO}
              delay={14}
              shadow={false}
              maxWidth={1500}
            />
            <div style={{ marginTop: 26 }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: COBALTO,
                  color: CREMA,
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.black,
                  fontSize: 140,
                  lineHeight: 1.0,
                  letterSpacing: "-0.01em",
                  padding: "10px 44px 18px",
                  borderRadius: 999,
                  transform: `scale(${capScale})`,
                  transformOrigin: "left center",
                  opacity: capOpacity,
                }}
              >
                {titular.capsula}
              </span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ================= ACTO 2 — la familia, de a uno ================= */}
      {budines.map((b, i) => (
        <Sequence
          key={b.key}
          from={ACTO2_FROM + i * POR_BUDIN}
          durationInFrames={POR_BUDIN}
        >
          <BudinFocus budin={b} index={i} total={budines.length} />
        </Sequence>
      ))}

      {/* ================= CIERRE — familia + precio ================= */}
      <Sequence from={CIERRE_FROM}>
        <AbsoluteFill style={{ backgroundColor: CREMA }}>
          {/* fila de 6 con entrada escalonada rápida */}
          <div
            style={{
              position: "absolute",
              left: 80,
              right: 80,
              top: 110,
              height: 500,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {budines.map((b, i) => {
              const e = spring({ frame: f3 - i * 3, fps, config: { damping: 200, mass: 0.6 } });
              const op = interpolate(e, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
              const ty = interpolate(e, [0, 1], [16, 0]);
              return (
                <div
                  key={b.key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: op,
                    transform: `translateY(${ty}px)`,
                  }}
                >
                  <Img src={b.src} style={{ height: 500, width: "auto" }} />
                  <div
                    style={{
                      marginTop: 26,
                      fontFamily: FONT_FAMILY,
                      fontWeight: FONT_WEIGHTS.medium,
                      fontSize: 30,
                      color: COBALTO,
                    }}
                  >
                    {b.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* precio + remate */}
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 836,
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: COBALTO,
                color: CREMA,
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 110,
                lineHeight: 1.0,
                padding: "16px 46px 24px",
                borderRadius: 999,
                transform: `scale(${precioScale})`,
                transformOrigin: "left center",
                opacity: precioOpacity,
              }}
            >
              {precio}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.medium,
                  fontSize: 48,
                  color: COBALTO,
                  opacity: subOpacity,
                }}
              >
                {precioSub}
              </span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHTS.bold,
                  fontSize: 44,
                  color: COBALTO,
                  opacity: remOpacity,
                }}
              >
                {remate}
              </span>
            </div>
          </div>

          {/* sello que se estampa */}
          <Img
            src={TV_GRAFICA.selloDomingo}
            style={{
              position: "absolute",
              right: 90,
              top: 846,
              width: 380,
              transform: `rotate(${selloRot}deg) scale(${selloScale})`,
              transformOrigin: "center",
              opacity: selloOpacity,
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
