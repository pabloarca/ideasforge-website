/**
 * Degradados del kit de gráficos. Viven aquí y no dentro de GrainFrame.astro
 * porque los usa también PostCover.astro, y dos copias acabarían separándose.
 */
export const gradients = {
  azul:
    'radial-gradient(80% 110% at 14% 0%, rgba(0,45,253,.5) 0%, rgba(0,45,253,0) 55%),' +
    'radial-gradient(90% 120% at 100% 110%, rgba(2,4,26,.9) 0%, rgba(2,4,26,0) 60%),' +
    'linear-gradient(126deg, #0b2fd6 0%, #0721a6 42%, #04116b 72%, #02061f 100%)',
  noche:
    'radial-gradient(75% 105% at 20% 0%, rgba(90,110,190,.4) 0%, rgba(90,110,190,0) 55%),' +
    'linear-gradient(140deg, #1a1e33 0%, #0d1020 50%, #05060d 100%)',
  teal:
    'radial-gradient(80% 110% at 14% 0%, rgba(40,180,160,.45) 0%, rgba(40,180,160,0) 55%),' +
    'linear-gradient(126deg, #0d4f4a 0%, #093b3c 45%, #05242a 100%)',
};

/**
 * Paleta del diamante. No está elegida a ojo: sale de muestrear los píxeles
 * opacos de `public/decor/diamond.png` y agruparlos por familia de tono. Los
 * porcentajes son la parte de la figura que ocupa cada familia, y explican por
 * qué el azul manda y el resto entra como reflejo.
 *
 *   azul        44 %   #0000c4
 *   cian        14 %   #00e2fa
 *   azul claro  13 %   #41a9f6
 *   violeta      8 %   #5600d3
 *   cálido       8 %   #f9f58a
 *   magenta      7 %   #ca0bbd
 *   rosa         2 %   #e857b2
 *
 * El azul dominante cae casi encima del acento de marca (#002dfd), así que la
 * figura y el sitio ya venían afinados; lo que añade es la iridiscencia.
 */
export const diamante = {
  azul: '#0000c4',
  azulClaro: '#41a9f6',
  cian: '#00e2fa',
  violeta: '#5600d3',
  magenta: '#ca0bbd',
  rosa: '#e857b2',
  calido: '#f9f58a',
  /** Fondo con el que se apagan las tres familias, para que el título blanco
   *  de la portada mantenga contraste en la banda inferior. */
  fondo: '#02041c',
};

/**
 * Familias para las portadas generadas del blog. Las tres comparten base azul
 * y banda inferior oscura, y se distinguen por el reflejo que domina arriba:
 * cian, magenta o cálido. Así una fila de portadas varía sin salirse de la
 * figura de la que salen.
 *
 * Van aparte de `gradients` a propósito: aquellas las usa GrainFrame para los
 * diagramas y no deben moverse desde aquí.
 */
export const covers = {
  prisma:
    'radial-gradient(65% 85% at 14% 2%, rgba(0,226,250,.50) 0%, rgba(0,226,250,0) 58%),' +
    'radial-gradient(55% 70% at 88% 8%, rgba(202,11,189,.32) 0%, rgba(202,11,189,0) 62%),' +
    'radial-gradient(120% 130% at 50% 120%, rgba(2,4,28,.92) 0%, rgba(2,4,28,0) 58%),' +
    'linear-gradient(128deg, #1024d9 0%, #0a0bb4 38%, #05036e 70%, #02041c 100%)',
  iris:
    'radial-gradient(60% 80% at 84% 4%, rgba(232,87,178,.45) 0%, rgba(232,87,178,0) 58%),' +
    'radial-gradient(55% 75% at 10% 14%, rgba(86,0,211,.45) 0%, rgba(86,0,211,0) 60%),' +
    'radial-gradient(120% 130% at 50% 120%, rgba(2,4,28,.92) 0%, rgba(2,4,28,0) 58%),' +
    'linear-gradient(140deg, #2a06c8 0%, #16039e 42%, #0a0257 74%, #02041c 100%)',
  espectro:
    'radial-gradient(50% 65% at 92% 6%, rgba(249,245,138,.28) 0%, rgba(249,245,138,0) 55%),' +
    'radial-gradient(70% 90% at 6% 10%, rgba(65,169,246,.45) 0%, rgba(65,169,246,0) 60%),' +
    'radial-gradient(120% 130% at 50% 120%, rgba(2,4,28,.92) 0%, rgba(2,4,28,0) 58%),' +
    'linear-gradient(120deg, #0b1fd0 0%, #0a06a8 44%, #050366 74%, #02041c 100%)',
};

export const coverFamilies = Object.values(covers);

export type GradientName = keyof typeof gradients;
export type CoverName = keyof typeof covers;

/**
 * Número estable a partir de un texto. Sirve para que cada entrada del blog
 * reciba siempre la misma portada generada, en vez de una distinta por
 * compilación.
 */
export function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
