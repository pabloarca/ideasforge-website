/**
 * Los colores de rotulador de la pizarra. Valores fijos y no variables CSS,
 * porque van en atributos de SVG (`fill`, `stroke`) y ahí `var()` no es fiable
 * en todos los navegadores.
 *
 * El azul es el acento de la casa: en la pizarra, como en los diagramas, se
 * reserva para lo que hace el modelo. El rojo, solo para el fallo, y poco.
 */
export const TINTA = '#1f2430';
export const GRIS = '#6b7280';
export const AZUL = '#002dfd';
export const ROJO = '#d1242f';

/** Tono de una pieza: qué color de rotulador lleva. */
export type Tono = 'tinta' | 'azul' | 'rojo';

export const COLOR_TONO: Record<Tono, string> = {
  tinta: TINTA,
  azul: AZUL,
  rojo: ROJO,
};

/** Papel y borde de la ficha según su tono. */
export const PAPEL_TONO: Record<Tono, { fondo: string; borde: string }> = {
  tinta: { fondo: '#fff', borde: '#e3e6eb' },
  azul: { fondo: '#f4f6ff', borde: '#b3c0fe' },
  rojo: { fondo: '#fff5f5', borde: '#f3b4b8' },
};
