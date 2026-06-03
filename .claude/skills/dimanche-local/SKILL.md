---
name: dimanche-local
description: Baja una campaña o acción de marketing de Dimanche AL LOCAL — material de punto de venta (cartelería de mostrador, exhibición, señalética) y el comunicado al equipo de ventas (foco de la semana, argumentario, qué ofrecer). Usar SIEMPRE que una campaña, promo o pieza tenga que activarse en el local físico, o cuando se pida "bajar esto al local", "qué ponemos en el mostrador", "qué le decimos al equipo".
---

# dimanche-local — Bajar la campaña al local

Una campaña vive a medias si no baja al local. Esta skill traduce una campaña (de *Objetivos & Campañas*) en lo que pasa en el mostrador: **lo que se ve** (punto de venta) y **lo que se dice** (equipo de ventas).

Regla del sistema: **toda campaña pasa por acá antes de ejecutarse.** El orquestador me llama después de `dimanche-campana`.

## Proceso
1. Tomo la campaña: objetivo, KPI (POL-016), pilar (POL-015), buyer persona, fechas y piezas del Calendario.
2. Cargo marca (tono POL-010, mensajes maestros REF-029) + buenas prácticas → `references/punto-de-venta.md`.
3. Produzco los **dos entregables** (abajo), aterrizados a la panadería: mostrador, vitrina, horario pico, equipo real.
4. Paso por `dimanche-brand-check`. Todo nace **Propuesto** → gate de Luciano/Anto.

## Entregable 1 — Punto de venta (lo que se VE)
- **Foco del mostrador/vitrina:** qué producto-héroe va a la vista (altura de los ojos, abundancia, producto real).
- **Cartelería:** 1-3 piezas concretas — qué dice y dónde va (mostrador, pizarra, puerta). Copy on-brand, sin marketinería.
- **Exhibición / cross-merchandising:** qué se ubica junto a qué para subir el ticket (el combo a la vista, lo dulce cerca de la caja).
- **Regla visual de oro:** nada de producto/local real generado con IA — preparación o foto real.

## Entregable 2 — Comunicado al equipo de ventas (lo que se DICE)
- **Foco de la semana (1 frase):** qué empujamos y por qué, ligado a la campaña.
- **Argumentario corto:** característica → beneficio para el cliente, en lenguaje de mostrador (ajustar a la persona REF-029: Cande / Juan Pablo / Analía).
- **Qué ofrecer / upsell natural:** la pregunta o el gesto concreto en la caja, sin presión.
- **Qué NO hacer:** lo que pisa el posicionamiento o el tono.
- Formato: breve, para leer en 1 minuto antes de abrir. (La bajada real al equipo —grupo del local, impreso— la hace Luciano/Anto; la skill produce el texto.)

## Reglas que no rompo
- Objetivo de fondo: **posicionar la marca**, no vender productos sueltos. Respetar T2 (poco volumen, alta calidad).
- Tono POL-010, mensajes maestros REF-029, sin marketinería ni emojis.
- El cliente es el héroe. Producto y local reales **nunca** con IA.
- Nada se ejecuta sin gate humano. Output **Propuesto** en Notion, vinculado a la campaña.
