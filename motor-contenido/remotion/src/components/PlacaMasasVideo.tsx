/**
 * Placa MASAS FINAS — retrabajada (29/08). Mecanismo: **EDITORIAL / la mesa**.
 *
 * La versión del lote 10/06 era el molde `PlacaProducto` (producto recortado a la
 * derecha, columna de texto a la izquierda, precio grande) y quedó plana como las
 * otras 5. Acá el mecanismo es otro: **la tipografía vive DENTRO de la foto**, en
 * la pared cobalto real de la sesión de marca — no hay banda crema, no hay panel,
 * no hay recorte sobre fondo pleno. La placa es una foto editorial con el texto
 * puesto en el aire que la foto ya tiene.
 *
 * Hero: `01_Fotos/Masas-finas/masas-finas_04.jpg` (sesión propia: pared cobalto +
 * mantel crema + plato de masas + taza). Recorte 16:9 en
 * `public/media/tv/masas/mesa.jpg`. Regla de oro: foto real, cero IA.
 *
 * Movimiento: push-in muy lento (la mesa se acerca), titular palabra×palabra en la
 * pared, bajada en fade y sello estampado sobre el mantel (cobalto, que es lo que
 * se lee sobre crema). SIN PRECIO — pedido de Luciano 29/08: el precio queda solo
 * en café, criollos y sanguchitos.
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

export type PlacaMasasVideoProps = {
  heroSrc: string;
  titular: string[];
  bajada: string;
};

export const placaMasasVideoDefaultProps: PlacaMasasVideoProps = {
  heroSrc: "media/tv/masas/mesa.jpg",
  titular: ["para cuando cae", "alguien sin avisar"],
  bajada: "masas finas",
};

export const PlacaMasasVideo: React.FC<PlacaMasasVideoProps> = ({
  heroSrc,
  titular,
  bajada,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  // Push-in muy lento: la mesa se acerca, nadie lo nota, pero la placa respira.
  const heroScale = interpolate(t, [0, 1], [1.0, 1.055]);

  const selloS = spring({
    frame: frame - 96,
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      <Img
        src={staticFile(heroSrc)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${heroScale})`,
        }}
      />

      {/* Refuerzo mínimo SOLO en la pared (arriba): sube el contraste del texto sin
          tocar el producto ni el mantel. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(28,50,140,0.28) 0%, rgba(28,50,140,0.10) 30%, rgba(28,50,140,0) 46%)",
        }}
      />

      {/* Bloque de texto DENTRO de la pared cobalto de la foto */}
      <div style={{ position: "absolute", top: 96, left: 112, maxWidth: 1180 }}>
        <Img
          src={TV_GRAFICA.monedaCrema}
          style={{
            width: 92,
            marginBottom: 26,
            opacity: interpolate(frame, [6, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Titular
          texto={titular.join("\n")}
          size={94}
          color={CREMA}
          delay={22}
          // `Titular` no parte por \n: el quiebre se fuerza con el ancho.
          maxWidth={1030}
        />
        <div
          style={{
            marginTop: 20,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 40,
            color: CREMA,
            opacity: interpolate(frame, [58, 78], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textShadow: "0 3px 14px rgba(0,0,0,0.28)",
          }}
        >
          {bajada}
        </div>
      </div>

      {/* Sello COBALTO estampado sobre el mantel crema (el crema desaparecería) */}
      <Img
        src={TV_GRAFICA.selloDomingo}
        style={{
          position: "absolute",
          right: 66,
          bottom: 52,
          width: 300,
          opacity: interpolate(selloS, [0, 0.35], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(selloS, [0, 1], [1.18, 1])}) rotate(${interpolate(
            selloS,
            [0, 1],
            [-12, -5],
          )}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
