/**
 * PlacaDeliveryVideo — secuencia de delivery para la TV (16:9, ~17 s). v3 COBALTO.
 *
 * Guion (Luciano):
 *  1) Calle de Villa Allende ILUSTRADA y PLANA (vista lateral) sobre cobalto:
 *     casas CREMA/BLANCO (contraste, no azul sobre azul) + arboles + el LOCAL
 *     Dimanche (blanco, con el emblema cobalto bien visible). La Vespa de perfil
 *     (con conductor y caja) cruza de IZQUIERDA a DERECHA y SALE del cuadro; la
 *     calle se FRENA cuando se va.
 *  2) "La realidad entra al dibujo": baja la BOLSA REAL desde arriba con la mano,
 *     se apoya en el borde de abajo; la mano se ABRE, SUELTA y se va VACIA; la
 *     bolsa queda (sin duplicarse).
 *  3) Entra el texto (crema, con aire) + el QR grande, fijo un buen rato.
 *
 * Texto crema. Export mudo.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import {
  FONT_FAMILY,
  FONT_WEIGHTS,
  COBALTO,
  CREMA,
  COLORS,
  TV_DELIVERY,
  TV_GRAFICA,
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

const GROUND = 760;
const ROAD_TOP = 832;
const CL = COLORS.cobaltoClaro; // #D6DEFB
const CD = COLORS.cobaltoOscuro; // #2843A8
const WHITE = "#FFFFFF";

/** Casa flat: pared crema/blanco, techo light-cobalt, ventanas/puerta cobalto. */
const Casa: React.FC<{ x: number; w: number; h: number; wall: string }> = ({ x, w, h, wall }) => {
  const roofH = Math.round(w * 0.4);
  return (
    <div style={{ position: "absolute", left: x, top: GROUND - h, width: w, height: h }}>
      <div
        style={{
          position: "absolute",
          left: -12,
          top: -roofH,
          width: 0,
          height: 0,
          borderLeft: `${w / 2 + 12}px solid transparent`,
          borderRight: `${w / 2 + 12}px solid transparent`,
          borderBottom: `${roofH}px solid ${CL}`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, backgroundColor: wall, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: w * 0.18, top: h * 0.24, width: w * 0.2, height: w * 0.2, backgroundColor: COBALTO, borderRadius: 3 }} />
      <div style={{ position: "absolute", right: w * 0.18, top: h * 0.24, width: w * 0.2, height: w * 0.2, backgroundColor: COBALTO, borderRadius: 3 }} />
      <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: w * 0.22, height: h * 0.4, backgroundColor: CD, borderRadius: "4px 4px 0 0" }} />
    </div>
  );
};

const Arbol: React.FC<{ x: number; size: number }> = ({ x, size }) => (
  <div style={{ position: "absolute", left: x, top: GROUND - size * 1.5 }}>
    <div style={{ position: "absolute", left: size * 0.42, top: size, width: size * 0.16, height: size * 0.6, backgroundColor: CD, borderRadius: 3 }} />
    <div style={{ width: size, height: size * 1.05, backgroundColor: CREMA, borderRadius: "50%" }} />
  </div>
);

const Calle: React.FC<{ opacity: number; freezeFrame: number }> = ({ opacity, freezeFrame }) => {
  const frame = useCurrentFrame();
  const motionF = Math.min(frame, freezeFrame); // la calle se FRENA al llegar la bolsa

  const casas = [
    { x: 470, w: 175, h: 188, wall: CREMA },
    { x: 690, w: 150, h: 150, wall: WHITE },
    { x: 980, w: 195, h: 205, wall: WHITE },
    { x: 1240, w: 160, h: 165, wall: CREMA },
    { x: 1470, w: 180, h: 195, wall: WHITE },
    { x: 1720, w: 150, h: 150, wall: CREMA },
  ];
  const arboles = [
    { x: 392, size: 92 },
    { x: 905, size: 80 },
    { x: 1418, size: 88 },
    { x: 1676, size: 78 },
  ];
  const dashes = Array.from({ length: 16 });

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      {/* sol + nubes (crema/blanco) a la derecha para no chocar el titular */}
      <div style={{ position: "absolute", left: 1670, top: 90, width: 116, height: 116, borderRadius: "50%", backgroundColor: CREMA }} />
      <div style={{ position: "absolute", left: 1330, top: 150, width: 210, height: 48, borderRadius: 40, backgroundColor: WHITE, opacity: 0.85 }} />

      {arboles.map((a, i) => (
        <Arbol key={`a${i}`} {...a} />
      ))}
      {casas.map((c, i) => (
        <Casa key={`c${i}`} {...c} />
      ))}

      {/* LOCAL Dimanche: facha BLANCA + toldo cobalto + emblema cobalto grande */}
      <div style={{ position: "absolute", left: 120, top: GROUND - 250, width: 268, height: 250 }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: WHITE, borderRadius: 4 }} />
        {/* toldo */}
        <div style={{ position: "absolute", left: -8, top: 92, width: 284, height: 24, backgroundColor: COBALTO, borderRadius: 5 }} />
        {/* emblema cobalto grande (la marca, bien visible) */}
        <Img src={TV_GRAFICA.emblema} style={{ position: "absolute", left: "50%", top: 14, transform: "translateX(-50%)", height: 78, width: "auto" }} />
        {/* vidriera + puerta */}
        <div style={{ position: "absolute", left: 26, bottom: 0, width: 78, height: 116, backgroundColor: CL, borderRadius: "4px 4px 0 0" }} />
        <div style={{ position: "absolute", right: 30, bottom: 0, width: 68, height: 128, backgroundColor: COBALTO, borderRadius: "4px 4px 0 0" }} />
      </div>

      {/* vereda + calzada */}
      <div style={{ position: "absolute", left: 0, top: GROUND, width: 1920, height: ROAD_TOP - GROUND, backgroundColor: CREMA, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 0, top: ROAD_TOP, width: 1920, height: 1080 - ROAD_TOP, backgroundColor: CD }} />
      {dashes.map((_, i) => {
        const x = (((i * 170 - motionF * 7) % 2720) + 2720) % 2720 - 360;
        return (
          <div key={`d${i}`} style={{ position: "absolute", left: x, top: 952, width: 86, height: 13, backgroundColor: CREMA, opacity: 0.85, borderRadius: 3 }} />
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

  const BAG_CX = 1300; // la bolsa queda a la derecha (deja la izquierda al texto)
  const CLIP_START = 150; // arranca el clip real de la mano (tras salir la vespa)
  const CLIP_LEN = 152; // ~5 s del clip real (121f @24fps)
  const CLIP_END = CLIP_START + CLIP_LEN;

  // Calle: full durante el viaje; se atenua para dar aire al texto.
  const calleOp = interpolate(frame, [0, 12, CLIP_END - 6, CLIP_END + 24], [0, 1, 1, 0.18], cl);

  // Vespa cruza y sale.
  const vespaX = interpolate(frame, [0, 150], [-460, 2320], { ...cl, easing: Easing.inOut(Easing.sin) });
  const vespaBob = Math.sin(frame / 6) * 4;
  const vespaOp = interpolate(frame, [0, 8, 150, 156], [0, 1, 1, 0], cl);

  // Bolsa final (queda apoyada): aparece justo cuando termina el clip → continuidad.
  const holdOp = interpolate(frame, [CLIP_END - 4, CLIP_END + 2], [0, 1], cl);

  // Texto (entra cuando la mano ya soltó / se va)
  const tEnter = (d: number) => {
    const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
    return { opacity: interpolate(s, [0, 1], [0, 1]), y: interpolate(s, [0, 1], [22, 0]) };
  };
  const chip = spring({ frame: frame - (CLIP_END + 28), fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });
  const chipScale = interpolate(chip, [0, 1], [0.7, 1]);
  const chipOp = interpolate(chip, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // CTA / QR
  const ctaS = spring({ frame: frame - (CLIP_END + 46), fps, config: { damping: 16 } });
  const qrScale = interpolate(ctaS, [0, 1], [0.6, 1]);
  const ctaOp = interpolate(ctaS, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const bagBox = { left: BAG_CX, bottom: 56, width: 858, height: 968 } as const;

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {/* 1) Calle */}
      <Calle opacity={calleOp} freezeFrame={150} />

      {/* 1) Vespa cruzando */}
      <div style={{ position: "absolute", left: vespaX, top: GROUND - 248 + vespaBob, opacity: vespaOp }}>
        <Img src={TV_DELIVERY.vespaSide} style={{ height: 320, width: "auto", display: "block" }} />
      </div>

      {/* 2) Clip REAL: la mano baja la bolsa, la apoya, suelta y se va (verde keyeado → webm alfa) */}
      <Sequence from={CLIP_START} durationInFrames={CLIP_LEN}>
        <OffthreadVideo
          src={staticFile("assets/tv/delivery-mano-real.webm")}
          transparent
          muted
          style={{
            position: "absolute",
            left: bagBox.left,
            bottom: bagBox.bottom,
            width: bagBox.width,
            height: bagBox.height,
            transform: "translateX(-50%)",
            filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.3))",
          }}
        />
      </Sequence>

      {/* 2b) Bolsa apoyada (ultimo frame del clip) — queda fija para el hold */}
      <Img
        src={staticFile("assets/tv/delivery-bolsa-final.png")}
        style={{
          position: "absolute",
          left: bagBox.left,
          bottom: bagBox.bottom,
          width: bagBox.width,
          height: bagBox.height,
          transform: "translateX(-50%)",
          opacity: holdOp,
          filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.3))",
        }}
      />

      {/* 3) Texto (crema, izquierda) */}
      <div style={{ position: "absolute", left: 130, top: 150 }}>
        {titular.map((linea, i) => {
          const e = tEnter(CLIP_END + 4 + i * 10);
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

      {/* 4) CTA: QR + numero (abajo-izquierda) */}
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
            backgroundColor: WHITE,
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
