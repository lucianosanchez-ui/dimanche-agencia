/**
 * Precios de las placas de TV — FUENTE ÚNICA.
 *
 * Verificados contra Odoo en vivo (`dimanche.odoo.com`) el **2026-08-29**.
 * Cada entrada lleva el código de Odoo para poder re-verificarla sin adivinar.
 *
 * Cómo se lee un precio de Odoo (importante):
 *  - `product.template.list_price` está en **NETO**. El precio de mostrador es
 *    `list_price × (1 + IVA)` — panificados 10,5%, pastelería/salado 21%.
 *  - Los **combos** (`product.combo`) cobran un total propio que se reparte
 *    entre los componentes; el precio real se confirma mirando lo que cobró el
 *    POS (`pos.order.line.price_subtotal_incl` de las líneas hijas), NO sumando
 *    los sueltos. Ej.: Desayuno chico = 2.090,71 + 1.909,29 = $4.000 exactos.
 *  - **OJO con el IVA de un combo MIXTO:** el reparto es 50/50 sobre el neto, así
 *    que el multiplicador efectivo es el PROMEDIO de las alícuotas de las patas,
 *    no la del cabecera. Desayuno = café 21% + panificado 10,5% → ×1,1575.
 *    `list_price 3.801,28 × 1,1575 = $4.400`. Aplicarle 21% da $4.599 y es MAL:
 *    así me equivoqué el 30/08 antes de que Luciano pasara los precios buenos.
 *
 * Actualizar acá y re-renderizar; no volver a hardcodear precios en los
 * componentes ni pasarlos sueltos por `--props` (así se perdieron los del lote
 * del 10/06: quedaron solo dentro de los PNG entregados).
 */

export const PRECIOS_VERIFICADOS = "2026-08-30";

export const PRECIOS = {
  /**
   * CO0011 Desayuno chico = **promo café chica** (así la llama Luciano y el
   * equipo): café 8oz + factura, medialuna o 2 criollitos.
   */
  promoCafeChica: "$4.400",
  /** CO0012 Desayuno grande = **promo café grande**: café 16oz + acompañamiento. */
  promoCafeGrande: "$5.200",

  /** CA0002 Cafe nescafe 8 oz. */
  cafeChico: "$3.300",
  /** CA0001 Cafe nescafe 16 oz. */
  cafeGrande: "$4.300",

  /** PA0004 Criollo comun · el kilo. (PA0003 Chipaca va al mismo precio.) */
  criolloComun: "$8.600",
  /** PA0005 Criollo hojaldre · el kilo. */
  criolloHojaldre: "$9.800",

  /** SA0016 Minisanguchito Jamón y queso · la unidad. */
  sanguchito: "$1.600",
  /** CO0015 Box sanguchitos x9. */
  sanguchitoCaja: "$14.000",

  /** PE0002/PE0005/PE0034 (chips · limón · manzana) · la unidad. */
  budinSimple: "$5.500",
  /** PE0001/PE0003/PE0004 (chocolatoso · frutos secos · carrot) · la unidad. */
  budinPremium: "$7.000",

  /** CO0001 Media docena facturas — el combo también toma medialunas (PA0010). */
  mediaDocena: "$6.000",
  /** CO0002 Docena facturas — idem, sirve para medialunas. */
  docena: "$12.000",

  /** Familia masas: 21 SKU a un solo $/kg (MA0002, MA0006, MA0015, MA0017…). */
  masasFinas: "$25.000",
  /** MA0010 Coquitos con cereza · el kilo (mismo $/kg que la familia masas). */
  coquitos: "$25.000",

  /**
   * MA0020 Muffins de arándano $1.600 · MA0021 vainilla rellenos de DDL $1.700.
   * Dos sabores a distinto precio → la placa dice "desde" (decisión de Luciano,
   * 29/08) para no mentir en ninguno de los dos.
   */
  muffinDesde: "$1.600",

  /** PE0007–PE0014 Porción de torta · todas al mismo precio. */
  tortaPorcion: "$5.200",
  /** PE0030 Torta bombón de chocolate · la entera (confirmado por Luciano). */
  tortaEntera: "$46.500",
} as const;
