/**
 * Generador pseudoaleatorio con semilla (mulberry32).
 *
 * Todo el azar decorativo del sitio pasa por aquí. La razón es que el sitio se
 * compila estático: con `Math.random()` cada compilación produciría un dibujo
 * distinto y cualquier diferencia sería ruido en los cambios. Con semilla, el
 * mismo número da siempre el mismo resultado.
 */
export function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Trayectoria de entrada de un punto que cristaliza: desde dónde llega, cuánto
 * se encoge y con cuánto retraso se posa.
 *
 * Vive aquí porque la usan los tres sitios que dibujan puntos. Consume del
 * generador que se le pasa, así que el dibujo sigue siendo reproducible.
 */
export function entrada(rand: () => number) {
  const angulo = rand() * Math.PI * 2;
  const distancia = 26 + rand() * 34;
  return {
    dx: `${(Math.cos(angulo) * distancia).toFixed(1)}px`,
    dy: `${(Math.sin(angulo) * distancia).toFixed(1)}px`,
    cs: (2.5 + rand() * 3.5).toFixed(2),
    cd: `${Math.round(rand() * 220)}ms`,
  };
}
