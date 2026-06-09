/**
 * Reel — 1080x1920 (9:16, IG/TikTok), 30fps, ~13s.
 *
 * Estructura de reel REAL (no slideshow): HOOK + 3 TOMAS con transiciones suaves
 * (cross-dissolve solapado) + CIERRE de marca. Ritmo de cortes ~2.5-3s, sin
 * tiempos muertos. La ONDA Dimanche:
 *   - el PRODUCTO a color es el heroe (clips/estaticas a color, sin filtro);
 *   - la identidad entra como TOQUE: monograma D, titular Niveau con filo deadpan
 *     (entra con spring y SALE con timing), sello "con olorcito a domingo";
 *   - el cobalto vive en la capa grafica / placa de cierre, NUNCA tinendo la foto.
 *
 * Timeline (30fps):
 *   HOOK    0   - 78   (2.6s)  croissants.mp4, push-in, "recien salida"
 *   TOMA 1  72  - 162  (3.0s)  humito-medialuna.mp4 (plato cobalto), "con olorcito a domingo"
 *   TOMA 2  156 - 252  (3.2s)  cinna-escena.png Ken Burns, "no es de ayer"
 *   TOMA 3  246 - 324  (2.6s)  macro-lateral.png Ken Burns, "medialuna de manteca"
 *   CIERRE  318 - 390  (2.4s)  placa de marca (monograma D + sello + wordmark)
 * (las tomas se solapan ~6f para el cross-dissolve)
 */

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { Toma } from "./components/Toma";
import { Titular } from "./components/Titular";
import { Cierre } from "./components/Cierre";
import { Monograma } from "./components/Monograma";
import { REEL_MEDIA, CREMA } from "./brand";

export type ReelProps = {
  /** Titular del hook (gancho del primer segundo). */
  hook: string;
  /** Deadpan corto de cada toma intermedia (3 tomas). */
  tomas: [string, string, string];
  wordmark: string;
};

export const reelDefaultProps: ReelProps = {
  hook: "recién salida",
  tomas: ["con olorcito a domingo", "no es de ayer", "medialuna de manteca"],
  wordmark: "Dimanche",
};

const MARGEN = 96;

/** Bloque de titular abajo-izquierda (registro reel: texto que respira). */
const TextoAbajo: React.FC<{
  texto: string;
  delay: number;
  out?: number;
  size?: number;
}> = ({ texto, delay, out, size = 116 }) => (
  <AbsoluteFill
    style={{
      padding: MARGEN,
      justifyContent: "flex-end",
      alignItems: "flex-start",
    }}
  >
    <div style={{ marginBottom: 196 }}>
      <Titular
        texto={texto}
        size={size}
        color={CREMA}
        weight="black"
        delay={delay}
        out={out}
        align="left"
      />
    </div>
  </AbsoluteFill>
);

export const Reel: React.FC<ReelProps> = ({ hook, tomas, wordmark }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* ===================== HOOK (0 - 78) ===================== */}
      <Sequence from={0} durationInFrames={78} name="Hook">
        <Toma
          videoSrc={REEL_MEDIA.croissants}
          startFrom={0}
          fadeIn={0}
          fadeOut={12}
          scrim="ambos"
          scrimStrength={0.5}
        >
          {/* Monograma D — toque, arriba derecha */}
          <AbsoluteFill style={{ padding: MARGEN }}>
            <div style={{ position: "absolute", top: MARGEN, right: MARGEN }}>
              <Monograma size={132} delay={4} maxOpacity={0.95} />
            </div>
          </AbsoluteFill>
          {/* Gancho del primer segundo */}
          <TextoAbajo texto={hook} delay={8} size={132} />
        </Toma>
      </Sequence>

      {/* ===================== TOMA 1 (72 - 162) ===================== */}
      <Sequence from={72} durationInFrames={90} name="Toma 1 — humito">
        <Toma
          videoSrc={REEL_MEDIA.humito}
          startFrom={1.2}
          fadeIn={10}
          fadeOut={12}
          scrim="abajo"
          scrimStrength={0.55}
        >
          <TextoAbajo texto={tomas[0]} delay={12} out={66} size={104} />
        </Toma>
      </Sequence>

      {/* ===================== TOMA 2 (156 - 252) ===================== */}
      <Sequence from={156} durationInFrames={96} name="Toma 2 — lifestyle">
        <Toma
          imageSrc={REEL_MEDIA.cinnaEscena}
          kenBurns={{
            // Zoom mas cerrado + foco bajo/izquierda: encuadra mano+canasta+cafe
            // y deja FUERA el libro naranja del fondo (regla: sin naranja).
            from: 1.5,
            to: 1.64,
            panX: [4, 0],
            panY: [-6, -10],
            focus: "46% 86%",
          }}
          fadeIn={12}
          fadeOut={12}
          scrim="abajo"
          scrimStrength={0.5}
        >
          <TextoAbajo texto={tomas[1]} delay={14} out={72} size={120} />
        </Toma>
      </Sequence>

      {/* ===================== TOMA 3 (246 - 324) ===================== */}
      <Sequence from={246} durationInFrames={78} name="Toma 3 — macro">
        <Toma
          imageSrc={REEL_MEDIA.macroLateral}
          kenBurns={{
            from: 1.05,
            to: 1.2,
            panX: [-2, 2],
            panY: [2, -3],
            focus: "center 45%",
          }}
          fadeIn={12}
          fadeOut={12}
          scrim="abajo"
          scrimStrength={0.5}
        >
          <TextoAbajo texto={tomas[2]} delay={12} out={58} size={108} />
        </Toma>
      </Sequence>

      {/* ===================== CIERRE (318 - 390) ===================== */}
      <Sequence from={318} durationInFrames={72} name="Cierre — placa de marca">
        <AbsoluteFill style={{ backgroundColor: "#000" }}>
          <FadeIn frames={10}>
            <Cierre imageSrc={REEL_MEDIA.cierreBg} wordmark={wordmark} />
          </FadeIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

/** Pequeño wrapper de fade-in para el cierre (evita corte seco al entrar). */
const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({
  frames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
