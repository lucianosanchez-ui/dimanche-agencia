/**
 * Catálogo de las placas de PRODUCTO del TV izquierda (lote 10/06).
 *
 * Antes estas 6 placas se renderizaban pasando `--props` a mano, así que los
 * precios quedaban SOLO dentro del PNG/MP4 entregado: para actualizarlas había
 * que leerlos de la imagen. Ahora viven acá, tomando el número de `precios.ts`
 * (fuente única, verificada contra Odoo), y cada una tiene su composición
 * registrada en `Root.tsx` — se re-renderiza con:
 *
 *   npx remotion render ProductoMedialunas out/producto-medialunas.png
 *   npx remotion render ProductoMedialunasVideo out/producto-medialunas.mp4
 *
 * Recordatorio del método (docs/placas-tv.md): estas 6 salieron en lote y
 * quedaron PLANAS. El plan sigue siendo retrabajarlas DE A UNA; esto solo pone
 * los precios al día y hace el lote reproducible.
 */

import { PRECIOS } from "./precios";
import type { PlacaProductoProps } from "./components/PlacaProducto";

export type PlacaProductoSpec = PlacaProductoProps & {
  /** Sufijo del id de composición: `Producto<Id>` / `Producto<Id>Video`. */
  id: string;
};

export const PLACAS_PRODUCTO: PlacaProductoSpec[] = [
  {
    // Pan: Luciano lo dejó AFUERA de la actualización del 29/08 — no está
    // confirmado qué pan es "pan casero" (el único pan por kilo a $5.500 en
    // Odoo es PA0021 Pan salvado, que no cambió). Precio tal cual se entregó.
    id: "Pan",
    heroSrc: "media/tv/producto-pan.png",
    gancho: ["se hace todos", "los días. todos"],
    nombre: "pan casero",
    precios: [{ label: "el kilo", valor: "$5.500" }],
  },
  {
    // Café: estaba en `TV medio — info/` pero usa el molde de PRODUCTO, y sus
    // props también se habían perdido dentro del PNG. Recuperadas del entregado.
    id: "Cafe",
    heroSrc: "media/tv/producto-cafe.png",
    gancho: ["un café,", "para arrancar"],
    nombre: "café",
    precios: [
      { label: "16 oz", valor: PRECIOS.cafeGrande },
      { label: "8 oz", valor: PRECIOS.cafeChico },
    ],
  },
  {
    id: "Medialunas",
    heroSrc: "media/tv/producto-medialunas.png",
    gancho: ["recién salidas", "del horno"],
    nombre: "medialunas",
    precios: [
      { label: "media docena", valor: PRECIOS.mediaDocena },
      { label: "docena", valor: PRECIOS.docena },
    ],
  },
  {
    id: "MasasFinas",
    heroSrc: "media/tv/producto-masas.png",
    gancho: ["la bandeja", "de la visita"],
    nombre: "masas finas",
    precios: [{ label: "el kilo", valor: PRECIOS.masasFinas }],
  },
  {
    id: "Coquitos",
    heroSrc: "media/tv/producto-cookies.png",
    gancho: ["se terminan", "primero"],
    nombre: "coquitos con cereza",
    precios: [{ label: "el kilo", valor: PRECIOS.coquitos }],
  },
  {
    id: "Muffin",
    heroSrc: "media/tv/producto-muffin.png",
    gancho: ["entra en la mano,", "y en el bolso"],
    nombre: "muffin",
    // Arándano $1.600 · vainilla DDL $1.700 → "desde" (decisión Luciano 29/08).
    precios: [{ label: "la unidad, desde", valor: PRECIOS.muffinDesde }],
  },
  {
    id: "Torta",
    heroSrc: "media/tv/producto-torta.png",
    gancho: ["una porción", "es una porción"],
    nombre: "torta de chocolate",
    precios: [
      { label: "porción", valor: PRECIOS.tortaPorcion },
      { label: "entera", valor: PRECIOS.tortaEntera },
    ],
  },
];
