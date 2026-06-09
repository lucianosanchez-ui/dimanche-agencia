/**
 * Registro de composiciones Dimanche.
 *
 * - Reel    : 1080x1920 (9:16) — IG/TikTok.
 * - PlacaTV : 1920x1080 (16:9) — pantallas del local.
 *
 * Fuentes Niveau registradas en brand.ts; aca disparamos la carga via
 * calculateMetadata para que esten listas antes de renderizar el primer frame.
 */

import React from "react";
import { Composition } from "remotion";
import { Reel, reelDefaultProps } from "./Reel";
import { PlacaTV, placaTvDefaultProps } from "./PlacaTV";
import { ensureFonts } from "./brand";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={FPS * 8} // 8 s
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={reelDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="PlacaTV"
        component={PlacaTV}
        durationInFrames={FPS * 8} // 8 s
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaTvDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />
    </>
  );
};
