/**
 * Cierre: placa de marca al final del reel.
 *
 * Estructura: foto/clip del producto a color arriba (sigue siendo el heroe) que se
 * funde hacia un PANEL cobalto inferior donde vive el lockup de marca — monograma
 * D + wordmark + sello "con olorcito a domingo". El cobalto vive en la capa
 * grafica (el panel), NO tine la foto. Todo entra con spring; termina prolijo.
 *
 * Decision de diseno: el monograma D va sobre el panel cobalto (no flotando sobre
 * el croissant, donde perdia contraste), siguiendo la logica del sello/lockup de
 * las piezas reales.
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
  SELLO,
  ASSETS,
} from "../brand";

type CierreProps = {
  /** Foto de fondo (frame congelado del producto). */
  imageSrc: string;
  /** Wordmark debajo del monograma. */
  wordmark?: string;
  focus?: string;
};

export const Cierre: React.FC<CierreProps> = ({
  imageSrc,
  wordmark = "Dimanche",
  focus = "center 30%",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fondo: leve push-in para que no quede estatico muerto.
  const bgScale = interpolate(frame, [0, durationInFrames], [1.04, 1.12], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  // Panel cobalto: sube desde abajo (wipe) cubriendo ~48% inferior.
  const panel = spring({
    frame: frame - 2,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const panelY = interpolate(panel, [0, 1], [110, 0]); // % de su alto

  // Monograma D: escala + fade, ya sobre el panel cobalto (alto contraste).
  const mono = spring({
    frame: frame - 16,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 110 },
  });
  const monoScale = interpolate(mono, [0, 1], [0.55, 1]);
  const monoOpacity = interpolate(mono, [0, 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Wordmark.
  const word = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const wordOpacity = interpolate(word, [0, 1], [0, 1]);
  const wordY = interpolate(word, [0, 1], [16, 0]);

  // Sello (linea fina sobre el wordmark).
  const sello = spring({ frame: frame - 34, fps, config: { damping: 200 } });
  const selloOpacity = interpolate(sello, [0, 1], [0, 1]);
  const selloY = interpolate(sello, [0, 1], [12, 0]);

  const PANEL_H = 880; // px sobre 1920 -> ~46%

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO, overflow: "hidden" }}>
      {/* Fondo: producto a color (no se tine) */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: focus,
          }}
        />
      </AbsoluteFill>

      {/* Panel cobalto inferior con el lockup de marca */}
      <AbsoluteFill style={{ justifyContent: "flex-end" }}>
        <div
          style={{
            height: PANEL_H,
            transform: `translateY(${panelY}%)`,
            // El panel se funde desde la foto: arriba transparente -> cobalto solido.
            background: `linear-gradient(to bottom, rgba(53,89,224,0) 0%, ${COBALTO} 30%, ${COBALTO} 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 150,
          }}
        >
          {/* Monograma D (cobalto) dentro de un disco crema -> contrasta sobre el
              panel cobalto y lee como lockup contenido, no como mancha azul. */}
          <div
            style={{
              width: 236,
              height: 236,
              borderRadius: "50%",
              backgroundColor: CREMA,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${monoScale})`,
              opacity: monoOpacity,
              boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
            }}
          >
            <Img
              src={ASSETS.monogramaD}
              style={{ width: 188, height: "auto" }}
            />
          </div>

          {/* Wordmark */}
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 96,
              letterSpacing: "0.005em",
              color: CREMA,
              lineHeight: 1,
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
            }}
          >
            {wordmark}
          </div>

          {/* Sello: linea fina, crema, debajo del wordmark */}
          <div
            style={{
              marginTop: 26,
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 44,
              letterSpacing: "0.04em",
              color: CREMA,
              opacity: selloOpacity * 0.92,
              transform: `translateY(${selloY}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {SELLO}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
