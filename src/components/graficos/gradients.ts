/**
 * Fondos del kit de gráficos.
 *
 * Cada familia declara dos cosas, no una: el fondo y **la tinta**. La tinta es
 * el color con el que se dibuja todo lo que va encima (el marco, los rótulos,
 * la cuadrícula, los nodos del diagrama). Sin ese dato, elegir un fondo claro
 * dejaría el gráfico en blanco sobre blanco, porque el kit nació dando por
 * hecho que el fondo siempre sería oscuro.
 *
 * Añadir una familia es una sola edición aquí: el tipo `FondoName` sale del
 * propio objeto, así que el componente la acepta sin tocar nada más.
 */
export interface Fondo {
  /** Cualquier valor válido de `background`: un color plano o degradados. */
  css: string;
  /** Con qué color se dibuja lo que va encima. */
  tinta: 'clara' | 'oscura';
}

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
  /** Fondo con el que se apagan las familias, para que el título blanco de la
   *  portada mantenga contraste en la banda inferior. */
  fondo: '#02041c',
};

/** Tinta de cada tono. Se aplican con `color-mix` para las capas suaves. */
export const TINTAS = {
  clara: '#ffffff',
  oscura: diamante.fondo,
};

export const fondos = {
  // ---------- Oscuros, los de siempre ----------
  azul: {
    tinta: 'clara',
    css:
      'radial-gradient(80% 110% at 14% 0%, rgba(0,45,253,.5) 0%, rgba(0,45,253,0) 55%),' +
      'radial-gradient(90% 120% at 100% 110%, rgba(2,4,26,.9) 0%, rgba(2,4,26,0) 60%),' +
      'linear-gradient(126deg, #0b2fd6 0%, #0721a6 42%, #04116b 72%, #02061f 100%)',
  },
  noche: {
    tinta: 'clara',
    css:
      'radial-gradient(75% 105% at 20% 0%, rgba(90,110,190,.4) 0%, rgba(90,110,190,0) 55%),' +
      'linear-gradient(140deg, #1a1e33 0%, #0d1020 50%, #05060d 100%)',
  },
  teal: {
    tinta: 'clara',
    css:
      'radial-gradient(80% 110% at 14% 0%, rgba(40,180,160,.45) 0%, rgba(40,180,160,0) 55%),' +
      'linear-gradient(126deg, #0d4f4a 0%, #093b3c 45%, #05242a 100%)',
  },

  // ---------- Oscuros del diamante ----------
  // Los tres comparten base azul y banda inferior apagada, y se distinguen por
  // el reflejo que domina arriba: cian, magenta o cálido. Los usa también el
  // blog para las portadas generadas, rotando entre ellos.
  //
  // El suelo subió de #02041c a #071049 (22 ago 2026). El anterior era RGB
  // (2, 4, 28): azul solo de nombre, negro a efectos prácticos. Con diez de
  // las catorce entradas sin fotografía propia, la home abría con diez
  // tarjetas negras seguidas y se leía como un fallo de carga. El nuevo suelo
  // conserva 17.9:1 de contraste con el título blanco, muy por encima del
  // 4.5:1 exigido, así que la banda inferior sigue haciendo su trabajo.
  // El radial del pie pasa a ser del MISMO color que el final del degradado:
  // así apaga hacia el azul profundo en vez de arrastrarlo hacia el negro.
  prisma: {
    tinta: 'clara',
    css:
      'radial-gradient(65% 85% at 14% 2%, rgba(0,226,250,.50) 0%, rgba(0,226,250,0) 58%),' +
      'radial-gradient(55% 70% at 88% 8%, rgba(202,11,189,.32) 0%, rgba(202,11,189,0) 62%),' +
      'radial-gradient(120% 130% at 50% 120%, rgba(7,16,73,.72) 0%, rgba(7,16,73,0) 58%),' +
      'linear-gradient(128deg, #1a3bf0 0%, #1226cc 38%, #0c1490 70%, #071049 100%)',
  },
  iris: {
    tinta: 'clara',
    css:
      'radial-gradient(60% 80% at 84% 4%, rgba(232,87,178,.45) 0%, rgba(232,87,178,0) 58%),' +
      'radial-gradient(55% 75% at 10% 14%, rgba(86,0,211,.45) 0%, rgba(86,0,211,0) 60%),' +
      'radial-gradient(120% 130% at 50% 120%, rgba(7,16,73,.72) 0%, rgba(7,16,73,0) 58%),' +
      'linear-gradient(140deg, #3a14e0 0%, #2109bc 42%, #120573 74%, #071049 100%)',
  },
  espectro: {
    tinta: 'clara',
    css:
      'radial-gradient(50% 65% at 92% 6%, rgba(249,245,138,.28) 0%, rgba(249,245,138,0) 55%),' +
      'radial-gradient(70% 90% at 6% 10%, rgba(65,169,246,.45) 0%, rgba(65,169,246,0) 60%),' +
      'radial-gradient(120% 130% at 50% 120%, rgba(7,16,73,.72) 0%, rgba(7,16,73,0) 58%),' +
      'linear-gradient(120deg, #1734e8 0%, #1410c4 44%, #0b0a85 74%, #071049 100%)',
  },

  // ---------- Claros ----------
  // Para gráficos que tienen que convivir con una sección blanca sin abrir un
  // agujero oscuro en mitad de la página. La tinta se invierte sola.
  hielo: {
    tinta: 'oscura',
    css:
      'radial-gradient(70% 100% at 12% 0%, rgba(0,45,253,.12) 0%, rgba(0,45,253,0) 60%),' +
      'linear-gradient(130deg, #eef0ff 0%, #e6e9fb 45%, #f5f5f7 100%)',
  },
  papel: {
    tinta: 'oscura',
    css: 'linear-gradient(130deg, #f7f6f2 0%, #efeee9 55%, #e7e6e0 100%)',
  },
  lienzo: {
    tinta: 'oscura',
    css: '#f5f5f7',
  },
} satisfies Record<string, Fondo>;

export type FondoName = keyof typeof fondos;

/**
 * Las tres del diamante, en el orden en que rotan las portadas del blog.
 * Se derivan del catálogo para que no haya dos listas que mantener.
 */
export const coverFamilies = [fondos.prisma.css, fondos.iris.css, fondos.espectro.css];

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
