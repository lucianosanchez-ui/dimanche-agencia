/**
 * CriollosLluvia — lluvia de criollos que caen y se APILAN abajo (16:9).
 *
 * Sprites = recortes reales con transparencia (chroma key sobre verde, de fotos
 * reales). Caen escalonados con gravedad (ease-in) + leve rotacion + squash al
 * aterrizar, y se acomodan en una pila por filas (las de abajo aterrizan primero;
 * las de arriba se dibujan despues y solapan). Deterministico (random con seed),
 * apto para render reproducible.
 *
 * La pila ocupa ~la mitad inferior; arriba queda libre para los precios.
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  random,
} from "remotion";
import { COBALTO } from "../brand";

const CUTS = [
  staticFile("media/tv/criollos/criollo-1-cut.png"),
  staticFile("media/tv/criollos/criollo-2-cut.png"),
  staticFile("media/tv/criollos/criollo-3-cut.png"),
];

type Criollo = {
  x: number;
  y: number;
  size: number;
  rot: number;
  delay: number;
  variant: number;
};

const W = 1920;

function buildPile(count: number): Criollo[] {
  const cols = 8;
  const colW = W / cols;
  const rowH = 66; // filas muy solapadas -> pila densa (no grilla)
  const baseY = 1055; // fila inferior pegada al borde
  const arr: Criollo[] = [];
  let i = 0;
  let row = 0;
  while (i < count) {
    const perRow = cols - (row % 2); // ladrillo: filas impares con uno menos
    for (let c = 0; c < perRow && i < count; c++) {
      const jx = (random(`x${i}`) - 0.5) * colW * 0.7;
      const jy = (random(`y${i}`) - 0.5) * 30;
      let x = colW * (c + 0.5) + (row % 2) * (colW * 0.5) + jx;
      x = Math.max(70, Math.min(W - 70, x));
      const y = baseY - row * rowH + jy;
      const size = 150 + random(`s${i}`) * 72;
      const rot = (random(`r${i}`) - 0.5) * 26;
      const delay = i * 2.2; // lluvia tupida (muchos cayendo casi a la vez)
      arr.push({ x, y, size, rot, delay, variant: i % CUTS.length });
      i++;
    }
    row++;
  }
  return arr;
}

export const CriollosLluvia: React.FC<{ count?: number; startAt?: number }> = ({
  count = 18,
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const criollos = buildPile(count);
  const fallDur = 20;

  return (
    <AbsoluteFill style={{ backgroundColor: COBALTO }}>
      {criollos.map((c, i) => {
        const lf = frame - startAt - c.delay;
        const p = interpolate(lf, [0, fallDur], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.quad), // acelera al caer (gravedad)
        });
        const y = interpolate(p, [0, 1], [-320, c.y]);
        // Squash sutil al aterrizar.
        const settle = interpolate(lf, [fallDur, fallDur + 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.ease),
        });
        const squashX = lf >= fallDur ? interpolate(settle, [0, 0.5, 1], [1.08, 1.08, 1]) : 1;
        const squashY = lf >= fallDur ? interpolate(settle, [0, 0.5, 1], [0.92, 0.92, 1]) : 1;
        const rot = interpolate(p, [0, 1], [c.rot * 1.7, c.rot]);
        const opacity = lf < 0 ? 0 : 1;

        return (
          <Img
            key={i}
            src={CUTS[c.variant]}
            style={{
              position: "absolute",
              left: c.x,
              top: y,
              width: c.size,
              height: "auto",
              transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${squashX}, ${squashY})`,
              opacity,
              filter: "drop-shadow(0 8px 11px rgba(0,0,0,0.28))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
