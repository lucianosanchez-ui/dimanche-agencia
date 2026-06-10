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
import { LoopTV, loopTvDefaultProps, loopTvDuration } from "./LoopTV";
import { PlacaDesayuno } from "./components/PlacaDesayuno";
import {
  PlacaDesayunoVideo,
  placaDesayunoVideoDefaultProps,
} from "./components/PlacaDesayunoVideo";
import { CriollosLluvia } from "./components/CriollosLluvia";
import {
  PlacaCriollos,
  placaCriollosDefaultProps,
} from "./components/PlacaCriollos";
import {
  PlacaCriollosVideo,
  placaCriollosVideoDefaultProps,
} from "./components/PlacaCriollosVideo";
import {
  PlacaHorarios,
  placaHorariosDefaultProps,
} from "./components/PlacaHorarios";
import {
  PlacaHorariosVideo,
  placaHorariosVideoDefaultProps,
} from "./components/PlacaHorariosVideo";
import {
  PlacaDelivery,
  placaDeliveryDefaultProps,
} from "./components/PlacaDelivery";
import {
  PlacaDeliveryVideo,
  placaDeliveryVideoDefaultProps,
} from "./components/PlacaDeliveryVideo";
import {
  PlacaProducto,
  placaProductoDefaultProps,
} from "./components/PlacaProducto";
import {
  PlacaProductoVideo,
  placaProductoVideoDefaultProps,
} from "./components/PlacaProductoVideo";
import { PlacaInfo, placaInfoDefaultProps } from "./components/PlacaInfo";
import {
  PlacaBudinesVideo,
  placaBudinesVideoDefaultProps,
} from "./components/PlacaBudinesVideo";
import { ensureFonts } from "./brand";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={390} // 13 s @ 30fps
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

      <Composition
        id="LoopTV"
        component={LoopTV}
        durationInFrames={loopTvDuration}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={loopTvDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="Desayuno"
        component={PlacaDesayuno}
        durationInFrames={150}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="DesayunoVideo"
        component={PlacaDesayunoVideo}
        durationInFrames={300} // 10 s @ 30fps (clip de ~5s reproducido a 0.5x)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaDesayunoVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="CriollosTest"
        component={CriollosLluvia}
        durationInFrames={170} // ~5.7 s — test de la lluvia/pila
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ count: 52, startAt: 0 }}
      />

      <Composition
        id="Criollos"
        component={PlacaCriollos}
        durationInFrames={150}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaCriollosDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="CriollosVideo"
        component={PlacaCriollosVideo}
        durationInFrames={300} // 10 s @ 30fps
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaCriollosVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="Horarios"
        component={PlacaHorarios}
        durationInFrames={150}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaHorariosDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="HorariosVideo"
        component={PlacaHorariosVideo}
        durationInFrames={180} // 6 s @ 30fps (entrada ~3.7s + hold)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaHorariosVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="Delivery"
        component={PlacaDelivery}
        durationInFrames={150}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaDeliveryDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="Producto"
        component={PlacaProducto}
        durationInFrames={150}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaProductoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="Info"
        component={PlacaInfo}
        durationInFrames={240}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaInfoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="ProductoVideo"
        component={PlacaProductoVideo}
        durationInFrames={300}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaProductoVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="BudinesVideo"
        component={PlacaBudinesVideo}
        durationInFrames={360} // 12 s @ 30fps (acto1 4.2s + 6 budines 1s c/u + cierre)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaBudinesVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="DeliveryVideo"
        component={PlacaDeliveryVideo}
        durationInFrames={540} // 18 s @ 30fps (calle + clip real de la mano + hold largo del QR)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaDeliveryVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />
    </>
  );
};
