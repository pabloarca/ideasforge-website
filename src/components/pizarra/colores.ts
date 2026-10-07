/**
 * Los colores de rotulador de la pizarra. Valores fijos y no variables CSS,
 * porque van en atributos de SVG (`fill`, `stroke`) y ahí `var()` no es fiable
 * en todos los navegadores.
 *
 * Tinta y gris son los del sistema de diseño de octubre de 2026 (la tinta
 * del texto y su neutral-700). El azul es el acento de la casa: en la
 * pizarra se reserva para lo que hace el modelo. El rojo, solo para el fallo,
 * y poco: es el único color del sitio que no sale de la paleta, y se
 * conserva porque aquí significa algo que el acento no puede decir.
 */
export const TINTA = '#201e1d';
export const GRIS = '#605d5d';
export const AZUL = '#002dfd';
export const ROJO = '#d1242f';

/**
 * Tono de una pieza: qué color de rotulador lleva. El gris es para lo que
 * queda fuera del sistema o no se usa: la salida más barata, lo que se compra.
 */
export type Tono = 'tinta' | 'azul' | 'rojo' | 'gris';

export const COLOR_TONO: Record<Tono, string> = {
  tinta: TINTA,
  azul: AZUL,
  rojo: ROJO,
  gris: GRIS,
};

/** Papel y borde de la ficha según su tono. */
export const PAPEL_TONO: Record<Tono, { fondo: string; borde: string }> = {
  tinta: { fondo: '#eae9e9', borde: '#c9c6c5' },
  azul: { fondo: '#e9edff', borde: '#a9baff' },
  rojo: { fondo: '#fbeceb', borde: '#f3b4b8' },
  gris: { fondo: '#f3f2f2', borde: '#c9c6c5' },
};
