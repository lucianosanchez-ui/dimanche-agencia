/**
 * Hero: el clip/foto del PRODUCTO a COLOR que llena el fondo (object-fit: cover).
 *
 * La ONDA: el producto a color es el heroe; el cobalto NO tine la foto. Por eso
 * aca NO aplicamos ningun filtro de color sobre el video — solo un leve push-in
 * (Ken Burns) para darle vida, y un scrim opcional abajo para que respire el texto.
 */

import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

type HeroProps = {
  /** Ruta (staticFile) del clip de fondo. */
  videoSrc?: string;
  /** Fallback de imagen si no hay clip (o para placas estaticas). */
  imageSrc?: string;
  /** Zoom final del push-in (1 = sin zoom). */
  zoomTo?: number;
  /** Scrim oscuro abajo (0 = nada). Para legibilidad del titular. */
  scrimAbajo?: number;
};

export const Hero: React.FC<HeroProps> = ({
  videoSrc,
  imageSrc,
  zoomTo = 1.08,
  scrimAbajo = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Push-in lento y suave (sin tirones).
  const scale = interpolate(frame, [0, durationInFrames], [1, zoomTo], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        {videoSrc ? (
          <OffthreadVideo
            src={videoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : imageSrc ? (
          <Img
            src={imageSrc}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </AbsoluteFill>

      {scrimAbajo > 0 ? (
        <AbsoluteFill
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${scrimAbajo}) 0%, rgba(0,0,0,0) 45%)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
