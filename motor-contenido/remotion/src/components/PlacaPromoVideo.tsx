/**
 * Placa PROMO — formato copiado de las referencias de menu board que cargó
 * Luciano (Starbucks, en `menu board/_ (*).jpeg`), 29/08 tercera ronda:
 *
 *  - FONDO SÓLIDO de marca (crema o cobalto) + marco hairline fino,
 *  - producto EN CONTEXTO pero recortado: mano que entra desde el borde,
 *    packaging real (bolsa kraft de estampas / vaso), bandeja de ACERO
 *    INOXIDABLE — nada de canastos de mimbre ni utilería fea de las fotos,
 *  - tipografía GIGANTE apilada en DOS COLORES alternados (no todo azul),
 *  - cápsula de PRECIO donde corresponde,
 *  - sello estampado.
 *
 * Feedback que define este formato (29/08): "aburrido, muy IA → buscá
 * referencias y copiá" · "criterio estético: nada de mimbre, más acero" · "la
 * bolsa grande es de delivery, para esto hay bolsas kraft" · "no todo el texto
 * azul" · "fondos sólidos me gustan; contexto = el PRODUCTO en uso, no el
 * fondo" · "no te olvides de los precios para algunas cosas".
 *
 * Heroes: escenas nano_banana_2 (refs reales: chipas del celu + bolsa kraft
 * oficial + vaso oficial) → remove_background → PNG con alpha, compuesto acá
 * sobre el color EXACTO de marca.
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
  COLORS,
  COBALTO,
  CREMA,
  FONT_FAMILY,
  FONT_WEIGHTS,
  TV_GRAFICA,
} from "../brand";

/** Tinta editorial: negro puro vibra contra el crema en TV, esto asienta. */
const TINTA = "#1E1E1E";

type Palabra = { texto: string; color: string };

export type PlacaPromoVideoProps = {
  /** Escena 16:9 generada YA sobre el crema (full-bleed, con sombras reales). */
  heroSrc: string;
  /** Palabras apiladas, cada una con su color (alternar cobalto/tinta). */
  palabras: Palabra[];
  /** Dónde va el bloque de palabras. */
  palabrasStyle: React.CSSProperties;
  /** Etiqueta chica sobre las palabras (qué producto es). */
  etiqueta: string;
  /** Tamaño de las palabras grandes (default 148). */
  palabraSize?: number;
  /** Cápsula de precio; null = sin precio. */
  precio: { label: string; valor: string } | null;
  precioStyle: React.CSSProperties;
  selloStyle: React.CSSProperties;
};

export const placaChipaKraftProps: PlacaPromoVideoProps = {
  // Bolsa kraft oficial volcando chipas reales, generado YA sobre crema con
  // sombras reales (job 8b5f8256) — full-bleed, sin recorte.
  heroSrc: "media/tv/promo/chipa-kraft-full.png",
  palabras: [
    { texto: "se sirven", color: COBALTO },
    { texto: "solas.", color: TINTA },
  ],
  palabrasStyle: { left: 120, top: 330 },
  etiqueta: "chipa queso",
  precio: { label: "el kilo", valor: "$21.000" },
  precioStyle: { left: 120, bottom: 150 },
  selloStyle: { left: 120, top: 108 },
};

export const placaChipaAceroProps: PlacaPromoVideoProps = {
  // Pila humeante en bandeja de acero inoxidable, sobre crema (job 03afdd80).
  heroSrc: "media/tv/promo/chipa-acero-full.png",
  palabras: [
    { texto: "salen", color: COBALTO },
    { texto: "calientes.", color: TINTA },
  ],
  palabrasStyle: { left: 120, top: 210 },
  etiqueta: "chipa queso",
  precio: { label: "el kilo", valor: "$21.000" },
  precioStyle: { left: 120, bottom: 150 },
  selloStyle: { right: 110, top: 108 },
};

export const placaMedialunaPromoProps: PlacaPromoVideoProps = {
  // La medialuna real entrando al vaso oficial — el "se moja" literal
  // (job 115e8e9a). Dos manos desde las esquinas de abajo.
  heroSrc: "media/tv/promo/medialuna-manos-full.png",
  palabras: [
    { texto: "se moja.", color: COBALTO },
    { texto: "no se discute.", color: TINTA },
  ],
  palabrasStyle: { left: 120, top: 96 },
  palabraSize: 126,
  etiqueta: "medialunas",
  precio: { label: "la docena", valor: "$12.000" },
  precioStyle: { right: 120, top: 140 },
  selloStyle: { right: 130, top: 300 },
};

export const PlacaPromoVideo: React.FC<PlacaPromoVideoProps> = ({
  heroSrc,
  palabras,
  palabrasStyle,
  palabraSize = 148,
  etiqueta,
  precio,
  precioStyle,
  selloStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  // La escena ya trae el fondo y las sombras: solo un push-in lento.
  const heroScale = interpolate(t, [0, 1], [1.0, 1.05]);
  const marcoOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const selloS = spring({ frame: frame - 132, fps, config: { damping: 11, mass: 0.7, stiffness: 120 } });
  const precioS = spring({ frame: frame - 96, fps, config: { damping: 13, mass: 0.6, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ backgroundColor: CREMA, overflow: "hidden" }}>
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

      {/* Marco hairline (lenguaje menu board) */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: `3px solid ${COBALTO}`,
          opacity: 0.28 * marcoOp,
          pointerEvents: "none",
        }}
      />

      {/* Palabras gigantes apiladas, colores alternados */}
      <div style={{ position: "absolute", ...palabrasStyle }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: 36,
            color: TINTA,
            opacity: interpolate(frame, [26, 44], [0, 0.62], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {etiqueta}
        </div>
        {palabras.map((p, i) => {
          const sp = spring({
            frame: frame - (34 + i * 16),
            fps,
            config: { damping: 16, mass: 0.7, stiffness: 100 },
          });
          return (
            <div
              key={p.texto}
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: palabraSize,
                lineHeight: 1.0,
                letterSpacing: "-0.015em",
                color: p.color,
                opacity: interpolate(sp, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px)`,
              }}
            >
              {p.texto}
            </div>
          );
        })}
      </div>

      {/* Cápsula de precio */}
      {precio && (
        <div
          style={{
            position: "absolute",
            ...precioStyle,
            display: "inline-flex",
            alignItems: "baseline",
            gap: 18,
            backgroundColor: COBALTO,
            color: CREMA,
            borderRadius: 68,
            padding: "18px 44px",
            opacity: interpolate(precioS, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(precioS, [0, 1], [0.8, 1])})`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.black,
              fontSize: 64,
            }}
          >
            {precio.valor}
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: 34,
              opacity: 0.85,
            }}
          >
            {precio.label}
          </span>
        </div>
      )}

      {/* Sello estampado */}
      <Img
        src={TV_GRAFICA.selloDomingo}
        style={{
          position: "absolute",
          width: 290,
          ...selloStyle,
          opacity: interpolate(selloS, [0, 0.35], [0, 1], { extrapolateRight: "clamp" }),
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
