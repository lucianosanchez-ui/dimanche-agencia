/**
 * Placa COOKIES — 3 CONCEPTOS, tres mecanismos distintos a propósito.
 *
 * El molde `PlacaProducto` (producto a la derecha · columna de texto a la
 * izquierda · precio grande) salió plano y repetido en las 6 del lote. Acá cada
 * concepto tiene su propia arquitectura y su propio movimiento:
 *
 *  A · "macro"    — MACRO A SANGRE + BANDA. La textura de la cookie ocupa todo el
 *                   cuadro (no hay producto chiquito recortado); el texto vive en
 *                   una banda crema que sube desde abajo. Movimiento: pull-back
 *                   lento (la cámara se aleja y aparece más producto) + banda que
 *                   entra + sello estampado.
 *  B · "poster"   — POSTER CENTRADO. Título centrado arriba sobre scrim cobalto,
 *                   producto abajo a color pleno. Movimiento: push-in + título que
 *                   baja palabra×palabra. Es la placa de COLOR (confites).
 *  C · "panel"    — PANEL DERECHO. Espejo del molde: el texto va en un panel crema
 *                   a la derecha, con hairline, y el producto entra desde la
 *                   izquierda. Movimiento: el panel se abre (ancho 0→560).
 *
 * Regla de oro: los 3 heroes son FOTO REAL del banco (`01_Fotos/Masas-finas`,
 * sesion_074 / sesion_003 / sesion_027), recortadas a 16:9 — cero producto
 * inventado. Productos verificados vivos en Odoo el 29/08 (venta últimos 60 días):
 * `MA0024` Cookies con rocklets $291.744 · `MA0016` Cookies con chips $234.048.
 * OJO: la más vendida es `MA0017` Cookies de chocolate rellenas de nutella
 * ($457.632) y NO tiene foto en el banco — es la que más merece placa. Sin precio (pedido de Luciano 29/08: precio solo en café, criollos
 * y sanguchitos).
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
import {
  COBALTO,
  CREMA,
  FONT_FAMILY,
  FONT_WEIGHTS,
  TV_GRAFICA,
} from "../brand";
import { Titular } from "./Titular";

export type PlacaCookiesConcepto = "macro" | "poster" | "panel";

export type PlacaCookiesVideoProps = {
  concepto: PlacaCookiesConcepto;
  heroSrc: string;
  /** Titular con filo, una línea por elemento. */
  titular: string[];
  /** Renglón chico de apoyo (qué es). Sin precio. */
  bajada: string;
};

export const placaCookiesMacroProps: PlacaCookiesVideoProps = {
  concepto: "macro",
  heroSrc: "media/tv/cookies/macro-chips.jpg",
  titular: ["esto no es", "una galletita."],
  bajada: "cookies con chips",      // MA0016, producto vigente
};

export const placaCookiesPosterProps: PlacaCookiesVideoProps = {
  concepto: "poster",
  heroSrc: "media/tv/cookies/confites.jpg",
  titular: ["la que se pide", "señalando"],
  bajada: "cookies con rocklets",   // MA0024, producto vigente (2ª en venta)
};

export const placaCookiesPanelProps: PlacaCookiesVideoProps = {
  concepto: "panel",
  heroSrc: "media/tv/cookies/partida.jpg",
  titular: ["por dentro", "también"],
  bajada: "cookies con chips",      // MA0016, producto vigente
};

/** Sello "con olorcito a domingo" como ESTAMPA (PNG real del set, rebote). */
const Estampa: React.FC<{
  src: string;
  delay: number;
  width: number;
  rot?: number;
}> = ({ src, delay, width, rot = -5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 120 },
  });
  const scale = interpolate(s, [0, 1], [1.18, 1]);
  const rotation = interpolate(s, [0, 1], [rot - 7, rot]);
  const opacity = interpolate(s, [0, 0.35], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <Img
      src={src}
      style={{
        width,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
};

export const PlacaCookiesVideo: React.FC<PlacaCookiesVideoProps> = ({
  concepto,
  heroSrc,
  titular,
  bajada,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Movimiento del hero: distinto por concepto ─────────────────────────────
  const t = frame / durationInFrames;
  const heroScale =
    concepto === "macro"
      ? interpolate(t, [0, 1], [1.12, 1.0]) // pull-back: se aleja y aparece más
      : concepto === "poster"
        ? interpolate(t, [0, 1], [1.0, 1.07]) // push-in
        : interpolate(t, [0, 1], [1.06, 1.0]);
  // El panel empuja el hero hacia la izquierda mientras se abre.
  const heroShift =
    concepto === "panel" ? interpolate(t, [0, 0.35], [40, 0], { extrapolateRight: "clamp" }) : 0;

  const hero = (
    <Img
      src={staticFile(heroSrc)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${heroScale}) translateX(${-heroShift}px)`,
      }}
    />
  );

  // ── A · MACRO: banda crema que sube desde abajo ────────────────────────────
  if (concepto === "macro") {
    const bandS = spring({
      frame: frame - 12,
      fps,
      config: { damping: 200, mass: 0.6 },
    });
    const bandY = interpolate(bandS, [0, 1], [340, 0]);
    return (
      <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
        {hero}

        {/* Moneda D como toque, arriba a la izquierda (identidad, no protagonista) */}
        <Img
          src={TV_GRAFICA.monedaCrema}
          style={{
            position: "absolute",
            top: 72,
            left: 84,
            width: 104,
            opacity: interpolate(frame, [6, 26], [0, 0.96], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
          }}
        />

        {/* Banda crema al pie: el texto no flota sobre la foto, tiene piso */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 340,
            backgroundColor: CREMA,
            transform: `translateY(${bandY}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 96px",
          }}
        >
          <div>
            <Titular
              texto={titular.join("\n")}
              size={92}
              color={COBALTO}
              delay={26}
              shadow={false}
              maxWidth={1180}
            />
            <div
              style={{
                marginTop: 14,
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.medium,
                fontSize: 38,
                color: COBALTO,
                opacity: interpolate(frame, [52, 72], [0, 0.72], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {bajada}
            </div>
          </div>
          <Estampa src={TV_GRAFICA.selloDomingo} delay={84} width={330} />
        </div>
      </AbsoluteFill>
    );
  }

  // ── B · POSTER: título centrado arriba sobre scrim cobalto ─────────────────
  if (concepto === "poster") {
    return (
      <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
        {hero}

        {/* MASTHEAD cobalto sólido arriba (no un scrim degradado): el título tiene
            piso propio y el producto queda a COLOR PLENO abajo. Un scrim sobre los
            confites los apagaba — y el color ES el concepto de esta placa. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 398,
            backgroundColor: COBALTO,
            transform: `translateY(${interpolate(
              spring({ frame: frame - 8, fps, config: { damping: 200, mass: 0.6 } }),
              [0, 1],
              [-400, 0],
            )}px)`,
          }}
        />

        <AbsoluteFill
          style={{
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 58,
          }}
        >
          <Img
            src={TV_GRAFICA.monedaCrema}
            style={{
              width: 96,
              marginBottom: 26,
              opacity: interpolate(frame, [4, 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
          <Titular
            texto={titular.join("\n")}
            size={98}
            color={CREMA}
            delay={26}
            align="center"
            maxWidth={1560}
            shadow={false}
          />
          <div
            style={{
              marginTop: 18,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 40,
              color: CREMA,
              opacity: interpolate(frame, [56, 76], [0, 0.78], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {bajada}
          </div>
        </AbsoluteFill>

        <div style={{ position: "absolute", right: 84, bottom: 72 }}>
          <Estampa src={TV_GRAFICA.selloCrema} delay={88} width={340} rot={-6} />
        </div>
      </AbsoluteFill>
    );
  }

  // ── C · PANEL: columna crema a la DERECHA que se abre ──────────────────────
  const panelS = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const panelW = interpolate(panelS, [0, 1], [0, 620]);
  const hairline = interpolate(
    spring({ frame: frame - 62, fps, config: { damping: 200, mass: 0.6 } }),
    [0, 1],
    [0, 380],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {hero}

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: panelW,
          backgroundColor: CREMA,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 62px",
        }}
      >
        <Img
          src={TV_GRAFICA.emblema}
          style={{
            // El emblema es un anillo de trazo fino: por debajo de ~180px no se
            // lee y parece una manchita.
            width: 186,
            marginBottom: 44,
            opacity: interpolate(frame, [30, 52], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Titular
          texto={titular.join("\n")}
          size={86}
          color={COBALTO}
          delay={34}
          shadow={false}
          maxWidth={500}
        />
        {/* Hairline que se DIBUJA (técnica de la placa horarios) */}
        <div
          style={{
            height: 3,
            width: hairline,
            backgroundColor: COBALTO,
            opacity: 0.28,
            marginTop: 30,
            marginBottom: 26,
          }}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 34,
            color: COBALTO,
            opacity: interpolate(frame, [74, 94], [0, 0.74], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {bajada}
        </div>
      </div>

      <div style={{ position: "absolute", left: 84, bottom: 76 }}>
        <Estampa src={TV_GRAFICA.selloCrema} delay={96} width={330} rot={-5} />
      </div>
    </AbsoluteFill>
  );
};
