/**
 * PlacaDeliveryVideo — secuencia de delivery para la TV (16:9, ~17 s). v2 COBALTO.
 *
 * Guion (definido con Luciano):
 *  1) Calle de Villa Allende ILUSTRADA (flat, vista lateral) sobre cobalto:
 *     casas + arboles + el LOCAL Dimanche. La Vespa (de perfil, con conductor y
 *     caja de delivery) cruza de IZQUIERDA a DERECHA y SALE del cuadro.
 *  2) "La realidad se mete en el dibujo": baja la BOLSA REAL desde arriba con una
 *     mano real, se apoya en el borde de abajo; la mano se va y la bolsa queda.
 *  3) Entra el texto (crema) con aire + el QR grande, fijo un buen rato.
 *
 * Sobre cobalto, la ilustracion va en crema/blanco + cobalto-claro. Export mudo.
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
} from "remotion";
import {
  FONT_FAMILY,
  FONT_WEIGHTS,
  COBALTO,
  CREMA,
  COLORS,
  TV_DELIVERY,
} from "../brand";

export type PlacaDeliveryVideoProps = {
  titular: string[];
  resalte: string;
  ctaLabel: string;
  numero: string;
};

export const placaDeliveryVideoDefaultProps: PlacaDeliveryVideoProps = {
  titular: ["con olorcito a domingo,", "hasta tu casa"],
  resalte: "te lo llevamos",
  ctaLabel: "pedí por WhatsApp",
  numero: "+54 9 351 663 9003",
};

const GROUND = 728; // donde apoyan las casas / vereda
const ROAD_TOP = 800;

const CL = COLORS.cobaltoClaro; // #D6DEFB
const CD = COLORS.cobaltoOscuro; // #2843A8

/** Una casa flat (pared + techo a dos aguas + ventanas + puerta). */
const Casa: React.FC<{
  x: number;
  w: number;
  h: number;
  wall: string;
  roof: string;
}> = ({ x, w, h, wall, roof }) => {
  const roofH = Math.round(w * 0.42);
  return (
    <div style={{ position: "absolute", left: x, top: GROUND - h, width: w, height: h }}>
      {/* techo a dos aguas */}
      <div
        style={{
          position: "absolute",
          left: -12,
          top: -roofH,
          width: 0,
          height: 0,
          borderLeft: `${w / 2 + 12}px solid transparent`,
          borderRight: `${w / 2 + 12}px solid transparent`,
          borderBottom: `${roofH}px solid ${roof}`,
        }}
      />
      {/* pared */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: wall, borderRadius: 3 }} />
      {/* ventanas */}
      <div style={{ position: "absolute", left: w * 0.18, top: h * 0.22, width: w * 0.22, height: w * 0.22, backgroundColor: COBALTO, borderRadius: 3, opacity: 0.85 }} />
      <div style={{ position: "absolute", right: w * 0.18, top: h * 0.22, width: w * 0.22, height: w * 0.22, backgroundColor: COBALTO, borderRadius: 3, opacity: 0.85 }} />
      {/* puerta */}
      <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: w * 0.24, height: h * 0.42, backgroundColor: CD, borderRadius: "4px 4px 0 0" }} />
    </div>
  );
};

/** Arbol flat (copa + tronco). */
const Arbol: React.FC<{ x: number; size: number; color: string }> = ({ x, size, color }) => (
  <div style={{ position: "absolute", left: x, top: GROUND - size * 1.45 }}>
    <div style={{ position: "absolute", left: size * 0.42, top: size, width: size * 0.16, height: size * 0.55, backgroundColor: CD, borderRadius: 3 }} />
    <div style={{ width: size, height: size * 1.1, backgroundColor: color, borderRadius: "50%" }} />
  </div>
);

const CalleLateral: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  // Casas (la primera, a la izquierda, es el local Dimanche).
  const casas = [
    { x: 470, w: 180, h: 196, wall: CREMA, roof: CD },
    { x: 700, w: 150, h: 150, wall: "#FFFFFF", roof: CL },
    { x: 980, w: 200, h: 214, wall: CREMA, roof: CD },
    { x: 1240, w: 160, h: 168, wall: "#FFFFFF", roof: CL },
    { x: 1470, w: 185, h: 200, wall: CREMA, roof: CD },
    { x: 1720, w: 150, h: 150, wall: "#FFFFFF", roof: CL },
  ];
  const arboles = [
    { x: 388, size: 96, color: CL },
    { x: 905, size: 84, color: CL },
    { x: 1410, size: 92, color: CL },
    { x: 1672, size: 80, color: CL },
  ];

  // Rayas de la calle corriendo a la izquierda (la vespa va a la derecha).
  const dashes = Array.from({ length: 16 });

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      {/* Sol + nubes en el cielo (relleno sutil; el sol a la derecha para no chocar el titular) */}
      <div style={{ position: "absolute", left: 1660, top: 96, width: 120, height: 120, borderRadius: "50%", backgroundColor: CREMA, opacity: 0.85 }} />
      <div style={{ position: "absolute", left: 1320, top: 150, width: 220, height: 50, borderRadius: 40, backgroundColor: CL, opacity: 0.55 }} />
      <div style={{ position: "absolute", left: 980, top: 230, width: 170, height: 42, borderRadius: 30, backgroundColor: CL, opacity: 0.4 }} />

      {/* Arboles atras */}
      {arboles.map((a, i) => (
        <Arbol key={`a${i}`} {...a} />
      ))}

      {/* Casas */}
      {casas.map((c, i) => (
        <Casa key={`c${i}`} {...c} />
      ))}

      {/* LOCAL Dimanche (a la izquierda): facha cobalto + toldo + logo crema */}
      <div style={{ position: "absolute", left: 120, top: GROUND - 232, width: 250, height: 232 }}>
        {/* techo plano */}
        <div style={{ position: "absolute", left: -10, top: -30, width: 270, height: 34, backgroundColor: CD, borderRadius: 6 }} />
        {/* pared cobalto */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: COBALTO, borderRadius: 4, border: `3px solid ${CD}` }} />
        {/* wordmark crema */}
        <Img src={TV_DELIVERY.wordmarkCrema} style={{ position: "absolute", left: 28, top: 30, width: 194, height: "auto" }} />
        {/* vidriera */}
        <div style={{ position: "absolute", left: 30, bottom: 0, width: 86, height: 120, backgroundColor: CL, opacity: 0.85, borderRadius: "4px 4px 0 0" }} />
        {/* puerta */}
        <div style={{ position: "absolute", right: 30, bottom: 0, width: 74, height: 134, backgroundColor: CREMA, borderRadius: "4px 4px 0 0" }} />
        {/* toldo */}
        <div style={{ position: "absolute", left: -6, top: 96, width: 262, height: 26, backgroundColor: CREMA, borderRadius: 6 }} />
      </div>

      {/* Vereda */}
      <div style={{ position: "absolute", left: 0, top: GROUND, width: 1920, height: ROAD_TOP - GROUND, backgroundColor: CREMA, opacity: 0.92 }} />
      {/* Calzada */}
      <div style={{ position: "absolute", left: 0, top: ROAD_TOP, width: 1920, height: 1080 - ROAD_TOP, backgroundColor: CD }} />
      {/* Rayas */}
      {dashes.map((_, i) => {
        const x = (((i * 170 - frame * 7) % 2720) + 2720) % 2720 - 360;
        return (
          <div key={`d${i}`} style={{ position: "absolute", left: x, top: 936, width: 86, height: 13, backgroundColor: CREMA, opacity: 0.85, borderRadius: 3 }} />
        );
      })}
    </AbsoluteFill>
  );
};

export const PlacaDeliveryVideo: React.FC<PlacaDeliveryVideoProps> = ({
  titular,
  resalte,
  ctaLabel,
  numero,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // Calle: full hasta que aterriza la bolsa, despues se atenua para dar aire al texto.
  const calleOp = interpolate(frame, [0, 12, 205, 245], [0, 1, 1, 0.28], cl);

  // Vespa: cruza de izq a der y sale.
  const vespaX = interpolate(frame, [0, 150], [-460, 2320], { ...cl, easing: Easing.inOut(Easing.sin) });
  const vespaBob = Math.sin(frame / 6) * 4;

  // Mano+bolsa: baja desde arriba (135) y apoya (~205); luego la mano se va (215->255).
  const bagDownY = interpolate(frame, [135, 205], [-1180, 0], { ...cl, easing: Easing.out(Easing.cubic) });
  const handLeaveY = interpolate(frame, [216, 256], [0, -1260], { ...cl, easing: Easing.in(Easing.cubic) });
  const manoY = bagDownY + handLeaveY;

  // Bolsa parada: aparece cuando la mano la suelta.
  const standOp = interpolate(frame, [206, 230], [0, 1], cl);

  // Texto
  const tEnter = (d: number) => {
    const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
    return { opacity: interpolate(s, [0, 1], [0, 1]), y: interpolate(s, [0, 1], [22, 0]) };
  };
  const chip = spring({ frame: frame - 286, fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });
  const chipScale = interpolate(chip, [0, 1], [0.7, 1]);
  const chipOp = interpolate(chip, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // CTA / QR
  const ctaS = spring({ frame: frame - 308, fps, config: { damping: 16 } });
  const qrScale = interpolate(ctaS, [0, 1], [0.6, 1]);
  const ctaOp = interpolate(ctaS, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const BAG_CX = 1330; // centro horizontal del aterrizaje

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {/* 1) Calle ilustrada */}
      <CalleLateral opacity={calleOp} />

      {/* 1) Vespa cruzando */}
      <div
        style={{
          position: "absolute",
          left: vespaX,
          top: GROUND - 250 + vespaBob,
        }}
      >
        <Img src={TV_DELIVERY.vespaSide} style={{ height: 330, width: "auto", display: "block" }} />
      </div>

      {/* 2) Bolsa parada (queda cuando la mano se va) */}
      <Img
        src={TV_DELIVERY.bolsaParada}
        style={{
          position: "absolute",
          left: BAG_CX,
          bottom: 8,
          height: 560,
          width: "auto",
          transform: "translateX(-50%)",
          opacity: standOp,
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.28))",
        }}
      />

      {/* 2) Mano real bajando la bolsa desde arriba */}
      <Img
        src={TV_DELIVERY.manoArriba}
        style={{
          position: "absolute",
          left: BAG_CX,
          bottom: -20,
          height: 1000,
          width: "auto",
          transform: `translateX(-50%) translateY(${manoY}px)`,
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.25))",
        }}
      />

      {/* 3) Texto (crema, izquierda, en el cielo despejado) */}
      <div style={{ position: "absolute", left: 130, top: 150 }}>
        {titular.map((linea, i) => {
          const e = tEnter(250 + i * 10);
          return (
            <div
              key={i}
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 76,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: CREMA,
                opacity: e.opacity,
                transform: `translateY(${e.y}px)`,
              }}
            >
              {linea}
            </div>
          );
        })}
        <div style={{ marginTop: 24 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: CREMA,
              color: COBALTO,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 56,
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              padding: "12px 30px",
              borderRadius: 16,
              transform: `scale(${chipScale})`,
              transformOrigin: "left center",
              opacity: chipOp,
            }}
          >
            {resalte}
          </span>
        </div>
      </div>

      {/* 4) CTA: QR grande + numero (abajo-izquierda) */}
      <div
        style={{
          position: "absolute",
          left: 130,
          bottom: 86,
          display: "flex",
          alignItems: "center",
          gap: 34,
          opacity: ctaOp,
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 22,
            boxShadow: "0 14px 36px rgba(0,0,0,0.3)",
            transform: `scale(${qrScale})`,
            transformOrigin: "left bottom",
          }}
        >
          <Img src={TV_DELIVERY.qr} style={{ width: 300, height: 300, display: "block" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHTS.medium, fontSize: 30, letterSpacing: "0.18em", textTransform: "uppercase", color: CREMA, opacity: 0.78, marginBottom: 10 }}>
            {ctaLabel}
          </div>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHTS.black, fontSize: 56, lineHeight: 1.0, letterSpacing: "-0.01em", color: CREMA }}>
            {numero}
          </div>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHTS.medium, fontSize: 26, color: CREMA, opacity: 0.65, marginTop: 8 }}>
            escaneá el código y escribinos
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
