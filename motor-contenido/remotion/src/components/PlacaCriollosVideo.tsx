/**
 * PlacaCriollosVideo — version EN MOVIMIENTO de la placa Criollos (16:9, 10 s).
 *
 * Movimiento:
 *  1. Entrada coreografiada en beats: logo -> "¿frío?" (solo, ~1s) -> "con estos
 *     criollitos, imposible" (con "imposible" RESALTADO) -> precios escalonados.
 *  2. Push-in lento sobre la pila (texto fijo -> parallax).
 *  3. Vapor visible subiendo de los criollos (recien salidos, calientes).
 *
 * Jerarquia tipografica: "¿frío?" grande (apertura) + "imposible" en capsula crema
 * invertida (golpe). Export mudo para la TV.
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
  staticFile,
} from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, ASSETS } from "../brand";

type Precio = { nombre: string; valor: string };

export type PlacaCriollosVideoProps = {
  imageSrc: string;
  gancho: { apertura: string; linea: string; resaltado: string };
  precios: Precio[];
  unidad: string;
};

export const placaCriollosVideoDefaultProps: PlacaCriollosVideoProps = {
  imageSrc: staticFile("media/tv/pila-v2-3.png"),
  gancho: {
    apertura: "¿frío?",
    linea: "con estos criollitos,",
    resaltado: "imposible",
  },
  precios: [
    { nombre: "criollo común", valor: "$7.500" },
    { nombre: "criollo de hojaldre", valor: "$8.500" },
  ],
  unidad: "el kilo",
};

/** Vapor visible: columnas blandas que suben y se desvanecen, en loop. */
const Vapor: React.FC = () => {
  const frame = useCurrentFrame();
  const wisps = [
    { x: 430, baseY: 560, delay: 0, dur: 150, sway: 30, w: 90, h: 360 },
    { x: 700, baseY: 520, delay: 60, dur: 165, sway: 24, w: 80, h: 400 },
    { x: 980, baseY: 540, delay: 30, dur: 155, sway: 28, w: 95, h: 370 },
    { x: 1250, baseY: 525, delay: 95, dur: 170, sway: 22, w: 80, h: 390 },
    { x: 1520, baseY: 555, delay: 45, dur: 160, sway: 26, w: 90, h: 360 },
  ];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {wisps.map((w, i) => {
        const t = (((frame - w.delay) % w.dur) + w.dur) % w.dur;
        const p = t / w.dur; // 0..1
        const y = interpolate(p, [0, 1], [0, -300]);
        const op = interpolate(p, [0, 0.22, 0.7, 1], [0, 0.42, 0.32, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const sway = Math.sin(p * Math.PI * 2 + i) * w.sway;
        const grow = interpolate(p, [0, 1], [0.7, 1.25]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: w.x + sway,
              top: w.baseY + y,
              width: w.w * grow,
              height: w.h,
              transform: "translateX(-50%)",
              background:
                "radial-gradient(ellipse 50% 50% at center, rgba(255,252,246,0.9) 0%, rgba(255,252,246,0) 70%)",
              filter: "blur(16px)",
              opacity: op,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const PlacaCriollosVideo: React.FC<PlacaCriollosVideoProps> = ({
  imageSrc,
  gancho,
  precios,
  unidad,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Push-in lento sobre la pila (texto fijo).
  const pushScale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Helper de entrada (fade + leve subida) por spring.
  const enter = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
    return { opacity: interpolate(s, [0, 1], [0, 1]), y: interpolate(s, [0, 1], [20, 0]) };
  };

  // Logo: pop.
  const logo = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });
  const logoScale = interpolate(logo, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logo, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  // Beats del gancho.
  const A = enter(12); // "¿frío?" (apertura, sola ~1s)
  const B = enter(48); // "con estos criollitos,"
  // "imposible": capsula que entra con escala (golpe), ~10 frames despues de B.
  const hl = spring({ frame: frame - 60, fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });
  const hlScale = interpolate(hl, [0, 1], [0.7, 1]);
  const hlOpacity = interpolate(hl, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Pila con push-in */}
      <AbsoluteFill
        style={{ transform: `scale(${pushScale})`, transformOrigin: "50% 100%" }}
      >
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
      </AbsoluteFill>

      {/* Vapor */}
      <Vapor />

      {/* Capa grafica (fija) */}
      <AbsoluteFill
        style={{
          padding: "70px 120px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* IZQUIERDA: logo + gancho en beats */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Logo */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              backgroundColor: CREMA,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
              transform: `scale(${logoScale})`,
              transformOrigin: "left center",
              opacity: logoOpacity,
              boxShadow: "0 8px 26px rgba(0,0,0,0.16)",
            }}
          >
            <Img src={ASSETS.monogramaD} style={{ width: 70, height: "auto" }} />
          </div>

          {/* Beat 1: "¿frío?" (grande) */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 104,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: CREMA,
              opacity: A.opacity,
              transform: `translateY(${A.y}px)`,
            }}
          >
            {gancho.apertura}
          </div>

          {/* Beat 2: "con estos criollitos," */}
          <div
            style={{
              marginTop: 14,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              color: CREMA,
              opacity: B.opacity,
              transform: `translateY(${B.y}px)`,
            }}
          >
            {gancho.linea}
          </div>

          {/* Beat 2 (golpe): "imposible" RESALTADO (capsula crema invertida) */}
          <div style={{ marginTop: 14 }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: CREMA,
                color: COBALTO,
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 72,
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                padding: "4px 22px",
                borderRadius: 16,
                transform: `scale(${hlScale})`,
                transformOrigin: "left center",
                opacity: hlOpacity,
              }}
            >
              {gancho.resaltado}
            </span>
          </div>
        </div>

        {/* DERECHA: precios escalonados */}
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
          {precios.map((p, i) => {
            const e = enter(78 + i * 14);
            return (
              <div key={p.nombre} style={{ opacity: e.opacity, transform: `translateY(${e.y}px)` }}>
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
                      fontSize: 78,
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
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
