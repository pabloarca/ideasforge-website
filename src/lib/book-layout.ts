/**
 * Reparto horizontal del acordeón de entradas del blog.
 *
 * Vive aparte porque lo usan los dos lados: el frontmatter, para servir el HTML
 * ya colocado, y el script del navegador, para recolocarlo al pasar de página.
 * Tenerlo escrito una sola vez evita que las dos versiones se separen.
 *
 * Las medidas van en porcentaje del ancho de la fila, no en píxeles, para que
 * el conjunto se adapte al tamaño de la ventana sin recalcular nada.
 */

/** Peso de cada posición contando desde la abierta. Cada canto es la mitad del
 *  anterior hasta el cuarto. */
export const WEIGHTS = [62, 16, 8, 4];

/** Peso del quinto canto en adelante, para que no lleguen a desaparecer. */
export const TAIL = 2;

/** Separación entre hojas, en porcentaje del ancho de la fila. */
export const GAP = 0.9;

/**
 * Lo que engorda una hoja al pasar el ratón por encima. No se resuelve en CSS
 * porque el reparto es acumulativo: al recalcularlo entero, las vecinas se
 * apartan solas en lugar de quedar pisadas, y la hoja crece por los dos lados
 * porque las que tiene delante también ceden ancho.
 */
export const HOVER = 4;

export const weightAt = (pos: number) => WEIGHTS[pos] ?? TAIL;

export interface BookSlot {
  /** Posición en la rotación: 0 es la abierta. */
  pos: number;
  /** Borde izquierdo, en porcentaje. */
  left: number;
  /** Ancho, en porcentaje. */
  width: number;
  /** Separacion del borde derecho de la fila, en porcentaje. Se anima este y
   *  no el ancho: asi cada canto viaja de su sitio al siguiente en linea
   *  recta, en vez de salir de sumar dos valores que se mueven a la vez. */
  right: number;
}

/**
 * Devuelve, para cada panel en orden del documento, dónde y cuánto ocupa
 * cuando la abierta es `active`. Si `hovered` apunta a un panel, ese recibe el
 * ancho extra y el resto se reparte lo que queda.
 */
export function layoutFor(n: number, active: number, hovered = -1): BookSlot[] {
  const posOf = (i: number) => (((i - active) % n) + n) % n;
  const hoveredPos = hovered >= 0 ? posOf(hovered) : -1;

  const weights = Array.from(
    { length: n },
    (_, pos) => weightAt(pos) + (pos === hoveredPos ? HOVER : 0)
  );
  const total = weights.reduce((a, b) => a + b, 0);
  const usable = 100 - GAP * (n - 1);
  const widths = weights.map((w) => (w / total) * usable);

  const lefts: number[] = [];
  let x = 0;
  for (let pos = 0; pos < n; pos += 1) {
    lefts.push(x);
    x += widths[pos] + GAP;
  }

  return Array.from({ length: n }, (_, i) => {
    const pos = posOf(i);
    const left = lefts[pos];
    const width = widths[pos];
    return { pos, left, width, right: 100 - left - width };
  });
}

/**
 * Qué hojas cruzan el extremo al pasar de `before` a `after`. Esas no viajan
 * por delante de las demás: se repliegan contra su borde izquierdo donde
 * estaban y se despliegan al otro lado.
 *
 * La dirección es explícita y no se deduce del camino más corto. Si se
 * dedujera, pulsar el último canto se resolvería como un paso hacia atrás y la
 * fila se movería hacia la derecha, cuando el gesto de pasar página siempre
 * tiene que leerse hacia la izquierda. Solo el botón de anterior va al revés.
 */
export function wrappingSet(
  n: number,
  before: number,
  after: number,
  forward = true
): Set<number> {
  const steps = forward
    ? (((after - before) % n) + n) % n
    : (((before - after) % n) + n) % n;

  const out = new Set<number>();
  if (steps === 0) return out;

  for (let i = 0; i < n; i += 1) {
    const pos = (((i - before) % n) + n) % n;
    if (forward ? pos < steps : pos >= n - steps) out.add(i);
  }
  return out;
}
