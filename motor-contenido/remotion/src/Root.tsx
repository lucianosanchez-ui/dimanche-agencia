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
import {
  PlacaSanguchitoVideo,
  placaSanguchitoVideoDefaultProps,
  placaSanguchitoCajaDefaultProps,
} from "./components/PlacaSanguchitoVideo";
import {
  PlacaPadreVideo,
  placaPadreVideoDefaultProps,
} from "./components/PlacaPadreVideo";
import {
  PlacaCookiesVideo,
  placaCookiesMacroProps,
  placaCookiesPosterProps,
  placaCookiesPanelProps,
} from "./components/PlacaCookiesVideo";
import {
  PlacaMasasVideo,
  placaMasasVideoDefaultProps,
} from "./components/PlacaMasasVideo";
import {
  PlacaMedialunasVideo,
  placaMedialunasVideoDefaultProps,
} from "./components/PlacaMedialunasVideo";
import {
  PlacaEscenaVideo,
  placaChipaEscenaProps,
  placaMedialunaCafeProps,
} from "./components/PlacaEscenaVideo";
import {
  PlacaPromoVideo,
  placaChipaKraftProps,
  placaChipaAceroProps,
  placaMedialunaPromoProps,
} from "./components/PlacaPromoVideo";
import { PLACAS_PRODUCTO } from "./placasProducto";
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
        id="PadreVideo"
        component={PlacaPadreVideo}
        durationInFrames={540} // 18 s @ 30fps
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaPadreVideoDefaultProps}
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
        durationInFrames={516} // 17.2 s @ 30fps (acto1 4.8s + 6 budines 1.6s c/u + cierre 2.8s)
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
        id="SanguchitoVideo"
        component={PlacaSanguchitoVideo}
        durationInFrames={240} // 8 s (clip squeeze 5s + hold de lectura)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaSanguchitoVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      <Composition
        id="SanguchitoCajaVideo"
        component={PlacaSanguchitoVideo}
        durationInFrames={240} // 8 s (push-in por código + hold)
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaSanguchitoCajaDefaultProps}
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

      {/* COOKIES — 3 conceptos con mecanismos distintos (macro / poster / panel).
          Bocetos para elegir uno; ver PlacaCookiesVideo.tsx. */}
      {[
        ["CookiesMacro", placaCookiesMacroProps],
        ["CookiesPoster", placaCookiesPosterProps],
        ["CookiesPanel", placaCookiesPanelProps],
      ].map(([id, props]) => (
        <Composition
          key={id as string}
          id={id as string}
          component={PlacaCookiesVideo}
          durationInFrames={240} // 8 s @ 30fps
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={props as typeof placaCookiesMacroProps}
          calculateMetadata={async ({ props: p }) => {
            await ensureFonts();
            return { props: p };
          }}
        />
      ))}

      {/* MASAS FINAS retrabajada — mecanismo editorial (tipografía dentro de la
          pared cobalto de la foto), sin precio. Reemplaza a `ProductoMasasFinas`. */}
      <Composition
        id="MasasVideo"
        component={PlacaMasasVideo}
        durationInFrames={240} // 8 s @ 30fps
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaMasasVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      {/* MEDIALUNAS retrabajada — mecanismo de MONTAJE (3 tomas reales, corte
          seco, copy sincronizado con los cortes), sin precio. Reemplaza a
          `ProductoMedialunas`. */}
      <Composition
        id="MedialunasVideo"
        component={PlacaMedialunasVideo}
        durationInFrames={240} // 8 s @ 30fps — cortes en el 66 y el 132
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={placaMedialunasVideoDefaultProps}
        calculateMetadata={async ({ props }) => {
          await ensureFonts();
          return { props };
        }}
      />

      {/* ESCENAS (contexto de uso, fondo crudo, packaging + manos) — el formato
          post-29/08; el "monumento" de chipa quedó rechazado ("un espanto"). */}
      {[
        ["ChipaEscena", placaChipaEscenaProps],
        ["MedialunaCafe", placaMedialunaCafeProps],
      ].map(([id, props]) => (
        <Composition
          key={id as string}
          id={id as string}
          component={PlacaEscenaVideo}
          durationInFrames={240} // 8 s @ 30fps
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={props as typeof placaChipaEscenaProps}
          calculateMetadata={async ({ props: p }) => {
            await ensureFonts();
            return { props: p };
          }}
        />
      ))}

      {/* PROMO BOARDS (3ª ronda 29/08): fondo sólido + marco + tipografía gigante
          bicolor + precio — lenguaje copiado de las refs de menu board. */}
      {[
        ["ChipaKraft", placaChipaKraftProps],
        ["ChipaAcero", placaChipaAceroProps],
        ["MedialunaPromo", placaMedialunaPromoProps],
      ].map(([id, props]) => (
        <Composition
          key={id as string}
          id={id as string}
          component={PlacaPromoVideo}
          durationInFrames={240} // 8 s @ 30fps
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={props as typeof placaChipaKraftProps}
          calculateMetadata={async ({ props: p }) => {
            await ensureFonts();
            return { props: p };
          }}
        />
      ))}

      {/* Las 6 placas de PRODUCTO del lote (TV izquierda), una composición por
          producto — estática + video. Props y precios en `placasProducto.ts`
          (que toma los números de `precios.ts`), para que re-renderizar sea
          `npx remotion render ProductoMedialunas ...` y no haya que volver a
          pasar `--props` a mano. */}
      {PLACAS_PRODUCTO.map(({ id, ...props }) => (
        <React.Fragment key={id}>
          <Composition
            id={`Producto${id}`}
            component={PlacaProducto}
            durationInFrames={150}
            fps={FPS}
            width={1920}
            height={1080}
            defaultProps={props}
            calculateMetadata={async ({ props: p }) => {
              await ensureFonts();
              return { props: p };
            }}
          />
          <Composition
            id={`Producto${id}Video`}
            component={PlacaProductoVideo}
            durationInFrames={300}
            fps={FPS}
            width={1920}
            height={1080}
            defaultProps={props}
            calculateMetadata={async ({ props: p }) => {
              await ensureFonts();
              return { props: p };
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
