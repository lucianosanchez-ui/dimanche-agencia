/**
 * PlacaProducto — molde REUTILIZABLE para el TV de PRODUCTO (16:9).
 *
 * Base a sangre = hero del producto recompuesto sobre cobalto (foto real → nano_banana,
 * producto a la derecha, mitad izquierda libre). Capa gráfica por código a la izquierda:
 * monograma D + gancho deadpan + nombre + precio(s), todo Niveau crema. Sello al pie.
 *
 * Cada producto es la MISMA comp con props distintas (heroSrc + copy). Estilo espejado
 * de Desayuno/Criollos. Estática (se le puede sumar push-in con Seedance después).
 */

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT_FAMILY, FONT_WEIGHTS, COBALTO, CREMA, ASSETS } from "../brand";
import { Sello } from "./Sello";

type Precio = { label: string; valor: string };

export type PlacaProductoProps = {
  heroSrc: string;
  gancho: string[];
  nombre: string;
  precios: Precio[];
};

export const placaProductoDefaultProps: PlacaProductoProps = {
  heroSrc: "media/tv/producto-pan.png",
  gancho: ["se hace todos", "los días. todos"],
  nombre: "pan casero",
  precios: [{ label: "el kilo", valor: "$X.XXX" }],
};

export const PlacaProducto: React.FC<PlacaProductoProps> = ({
  heroSrc,
  gancho,
  nombre,
  precios,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {/* Hero a sangre (producto der + cobalto izq libre) */}
      <Img
        src={staticFile(heroSrc)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Refuerzo sutil de legibilidad a la izquierda (cobalto→transparente) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(53,89,224,0.92) 0%, rgba(53,89,224,0.72) 34%, rgba(53,89,224,0) 60%)",
        }}
      />

      {/* Capa gráfica izquierda */}
      <AbsoluteFill style={{ padding: 110, flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 880 }}>
          {/* Monograma D en disco crema */}
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              backgroundColor: CREMA,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
              boxShadow: "0 8px 26px rgba(0,0,0,0.18)",
            }}
          >
            <Img src={ASSETS.monogramaD} style={{ width: 66, height: "auto" }} />
          </div>

          {/* Gancho deadpan */}
          {gancho.map((linea, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.black,
                fontSize: 86,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: CREMA,
              }}
            >
              {linea}
            </div>
          ))}

          {/* Nombre + precios */}
          <div style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: FONT_WEIGHTS.medium,
                fontSize: 40,
                letterSpacing: "0.01em",
                color: CREMA,
                opacity: 0.9,
                marginBottom: 12,
              }}
            >
              {nombre}
            </div>
            <div style={{ display: "flex", gap: 44, alignItems: "flex-end", flexWrap: "wrap" }}>
              {precios.map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: FONT_WEIGHTS.medium,
                      fontSize: 28,
                      color: CREMA,
                      opacity: 0.7,
                      marginBottom: 2,
                    }}
                  >
                    {p.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: FONT_WEIGHTS.black,
                      fontSize: 92,
                      lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      color: CREMA,
                    }}
                  >
                    {p.valor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Sello firma — pie izquierdo */}
      <div style={{ position: "absolute", left: 110, bottom: 64 }}>
        <Sello delay={0} height={60} fill={CREMA} textColor={COBALTO} />
      </div>
    </AbsoluteFill>
  );
};
