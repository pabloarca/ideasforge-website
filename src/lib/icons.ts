/**
 * Iconografía Ideasforge — Set A «Astilla».
 *
 * Construcción heredada del logo: masas sólidas separadas por cortes de
 * negativo, sin trazo, sin curvas y sin radios. Lo que NO hereda es el ángulo:
 * todo diagonal va a 2:1 (63°) o 1:2 (27°), nunca a 45°, para que ningún icono
 * parezca un logotipo mal dibujado ni compita con la marca.
 *
 * Ficha completa en `.private/icons/iconos-ideasforge.md`, incluida la lista
 * de comprobación para dibujar uno nuevo.
 */

export type IconName = keyof typeof ICONS;

export type Icon = {
  paths: string[];
  /** Renderiza con fill-rule="evenodd": el hueco es transparencia real. */
  evenodd?: true;
  /** Gira las rutas alrededor del centro (12 12). */
  rotate?: number;
  /** Píxeles por debajo de los cuales el icono pierde los cortes. */
  minSize?: number;
};

// `satisfies` valida cada entrada contra Icon SIN estrechar el tipo de las
// claves, que es lo que necesita IconName. No usar `as const`: convierte los
// arrays en readonly (incompatibles con paths: string[]) y estrecha cada
// entrada a su propio literal, con lo que icon.rotate e icon.evenodd dejan de
// existir en la unión y el componente no compila.
export const ICONS = {
  // ---------- Navegación e interfaz ----------
  'flecha-derecha': {
    paths: ['M3 11.2 H12.4 V12.8 H3 Z', 'M21.5 12 L14.4 8.45 L14.4 11.2 Z', 'M21.5 12 L14.4 12.8 L14.4 15.55 Z'],
  },
  'flecha-izquierda': {
    paths: ['M21 11.2 H11.6 V12.8 H21 Z', 'M2.5 12 L9.6 8.45 L9.6 11.2 Z', 'M2.5 12 L9.6 12.8 L9.6 15.55 Z'],
  },
  'flecha-arriba': {
    paths: ['M11.2 21 V11.6 H12.8 V21 Z', 'M12 2.5 L8.45 9.6 L11.2 9.6 Z', 'M12 2.5 L12.8 9.6 L15.55 9.6 Z'],
  },
  // Enlace externo: la misma pieza girada al ángulo de marca.
  'flecha-salida': {
    paths: ['M4 11.2 H12.4 V12.8 H4 Z', 'M20.5 12 L13.4 8.45 L13.4 11.2 Z', 'M20.5 12 L13.4 12.8 L13.4 15.55 Z'],
    rotate: -63,
  },
  'chevron-abajo': {
    paths: ['M4 8.2 L11.1 11.75 L11.1 14.75 L4 11.2 Z', 'M20 8.2 L12.9 11.75 L12.9 14.75 L20 11.2 Z'],
  },
  /*
    Expandir. Dos cuñas contrapuestas sobre la diagonal que sube a la derecha:
    una apunta arriba-derecha y la otra abajo-izquierda. Anuncia que el
    elemento se abre en grande, no que lleva a otra página.

    Cómo esquiva el 45°, que es la regla dura del set: la punta clásica de
    expandir es un triángulo isósceles montado sobre la diagonal a 45°, y sus
    dos bordes caen ahí. Aquí la cuña no es isósceles. Sus tres bordes van a
    63°, 27° y horizontal, que son ángulos del set, y aun así el conjunto
    apunta en diagonal. Lo que está prohibido es el borde a 45°, no que una
    composición avance en diagonal.

    Las dos piezas se separan 1,6 en vertical, el corte del set. Al pasar por
    encima se apartan más (ver `.icon-expand` en global.css), que es de donde
    sale la lectura de «esto se abre».
  */
  expandir: {
    paths: ['M20 6.4 L17.6 11.2 L10.4 11.2 Z', 'M4 17.6 L6.4 12.8 L13.6 12.8 Z'],
  },
  menu: {
    paths: ['M4.4 4.6 H21 L19.6 7.4 H3 Z', 'M4.4 10.6 H21 L19.6 13.4 H3 Z', 'M4.4 16.6 H21 L19.6 19.4 H3 Z'],
  },
  /*
    Cerrar. Cuatro brazos macizos que salen del centro hacia las esquinas,
    separados en el cruce por el corte de 1,6 del set.

    Sustituye a la version anterior, que tenia dos fallos medidos. Uno: sus dos
    masas NO se cortaban, se solapaban por completo en el centro (a la altura
    del eje ambas ocupaban exactamente x 10,60-13,40), y la regla 3 dice que
    dos piezas nunca se tocan ni se solapan. Dos: al construirse con barras a
    63 grados la silueta salia de 12,3 x 19, estrecha y volcada hacia arriba,
    porque a ese angulo las dos uves de arriba y abajo se cierran a 54 grados
    mientras las de los lados se abren a 126.

    EXCEPCION DECLARADA A LA REGLA 1. Los brazos van a 45 grados. Es el unico
    icono del set que lo hace y conviene entender por que no contagia al resto.
    La regla existe para que los iconos no parezcan genericos ni imiten las
    facetas del logo, y eso aplica a los iconos que ilustran una idea. La equis
    de cerrar no ilustra nada: es un mando, y su valor esta en que se reconozca
    al instante. A cambio conserva la construccion del set, que es lo que de
    verdad da la familia: masas solidas, sin trazo, separadas por un hueco.
    Aqui el hueco esta en el cruce, que es justo donde la version anterior
    empastaba. La ficha ya admite decisiones asi: no hay icono de idioma
    porque el globo no funcionaba a los angulos del set.

    Resultado: silueta cuadrada de 16,68 x 16,68, cuatro cortes de 1,6 y todo
    dentro del margen de seguridad.
  */
  cerrar: {
    paths: [
      'M12.8 9.36 L18.51 3.66 L20.34 5.49 L14.64 11.2 Z',
      'M11.2 9.36 L5.49 3.66 L3.66 5.49 L9.36 11.2 Z',
      'M12.8 14.64 L18.51 20.34 L20.34 18.51 L14.64 12.8 Z',
      'M11.2 14.64 L5.49 20.34 L3.66 18.51 L9.36 12.8 Z',
    ],
    // Como el resto de iconos con corte de 1,6: por debajo de 20 el hueco del
    // cruce baja de un pixel y los cuatro brazos se empastan en dos barras.
    minSize: 20,
  },
  // NO HAY icono de idioma, y es deliberado: el globo solo se lee cerca de 1:1
  // y a 27°/63° parece un control de ordenar. El cambio de idioma va en texto.

  // ---------- Traduccion de los iconos originales de la navegacion ----------
  // Los cinco que tenia la cabecera (grid, briefcase, spark, file, user),
  // redibujados con la construccion del set en vez de sustituidos por otra
  // metafora. El de usuario no esta aqui: `autor` ya era exactamente eso.

  // 2x2 sin diagonales. No las necesita y meterlas seria decoracion.
  rejilla: {
    minSize: 20,
    paths: ['M2 2 H11.2 V11.2 H2 Z', 'M12.8 2 H22 V11.2 H12.8 Z', 'M2 12.8 H11.2 V22 H2 Z', 'M12.8 12.8 H22 V22 H12.8 Z'],
  },
  // Asa en U dibujada como un solo poligono, y el cuerpo partido en dos por el
  // corte, que hace de cierre.
  maletin: {
    paths: ['M8.6 2 H15.4 V5 H13.6 V3.6 H10.4 V5 H8.6 Z', 'M2 6.6 H22 V12.4 H2 Z', 'M2 14 H22 V21 H2 Z'],
  },
  // Cuatro cometas en vez de una estrella maciza: una estrella de cuatro
  // puntas con lados rectos obliga a 45° en los entrantes, y aqui esta vetado.
  // El centro queda hueco y se lee como destello.
  destello: {
    minSize: 20,
    paths: ['M12 2 L15 8 L12 9.5 L9 8 Z', 'M22 12 L16 9 L14.5 12 L16 15 Z', 'M12 22 L15 16 L12 14.5 L9 16 Z', 'M2 12 L8 9 L9.5 12 L8 15 Z'],
  },
  // Pagina con la esquina cortada. Las dos lineas de texto son hueco real
  // (`evenodd`), no barras encima: sobre una masa solida no se verian.
  documento: {
    evenodd: true,
    paths: ['M4 2 H13 L19 5 V22 H4 Z M7 11 H16 V12.6 H7 Z M7 15 H16 V16.6 H7 Z'],
  },

  // ---------- Servicios · grandes empresas ----------
  documentacion: {
    minSize: 20,
    paths: ['M4 2.5 H15.5 L19.5 10.5 V11.7 H4 Z', 'M4 13.5 H19.5 V15.1 H4 Z', 'M4 16.9 H19.5 V18.5 H4 Z', 'M4 20.3 H13 V21.9 H4 Z'],
  },
  'tus-datos': {
    paths: ['M2.5 14 H6.5 V21.5 H2.5 Z', 'M10 8 H14 V21.5 H10 Z', 'M17.5 6 L19.5 2 L21.5 6 V21.5 H17.5 Z'],
  },
  automatizacion: {
    paths: ['M2.5 4.2 H14 V2.25 L21.5 6 L14 9.75 V7.8 H2.5 Z', 'M21.5 16.2 H10 V14.25 L2.5 18 L10 21.75 V19.8 H21.5 Z'],
  },
  consultoria: {
    minSize: 20,
    paths: ['M2.5 4 H20 L21.5 7 H2.5 Z', 'M2.5 9 H11 V21 H2.5 Z', 'M13 9 H21.5 V14 H13 Z', 'M13 16 H21.5 V21 H13 Z'],
  },

  // ---------- Servicios · pyme ----------
  'atencion-247': {
    paths: ['M12 2.5 L21 7 V13.5 L12 18 L3 13.5 V7 Z', 'M5.5 19.6 H11.5 L5.5 22.6 Z'],
  },
  cualificacion: {
    paths: ['M2.5 3 H21.5 L19 8 H5 Z', 'M6.2 9.6 H17.8 L15.3 14.6 H8.7 Z', 'M9.9 16.2 H14.1 V21.5 H9.9 Z'],
  },
  // Viga apuntalada, no llave inglesa: una herramienta es curva por naturaleza
  // y a 27°/63° se lee como aguja. Esto dice «lo sostenemos contigo».
  soporte: {
    paths: ['M2.5 3 H21.5 V7.5 H2.5 Z', 'M8 9.1 H11 L5 21.1 H2 Z', 'M16 9.1 H13 L19 21.1 H22 Z'],
  },

  // ---------- Compromisos ----------
  observabilidad: {
    paths: ['M12 2 L15 8 H9 Z', 'M8.2 9.6 H15.8 L18.8 15.6 H5.2 Z', 'M4.4 17.2 H19.6 L21.9 21.8 H2.1 Z'],
  },
  'codigo-propio': {
    paths: ['M9.2 3.5 L4.95 12 L9.2 20.5 L11.6 19.3 L7.75 12 L11.6 4.7 Z', 'M14.8 3.5 L19.05 12 L14.8 20.5 L12.4 19.3 L16.25 12 L12.4 4.7 Z'],
  },
  seguridad: {
    paths: ['M11.2 2 L4.4 5.4 V8.4 L11.2 22 Z', 'M12.8 2 L19.6 5.4 V8.4 L12.8 22 Z'],
  },

  // ---------- Metodología ----------
  explorar: {
    paths: ['M2.5 21.5 L5.5 15.5 L8.5 21.5 Z', 'M9.5 18 L13 11 L16.5 18 Z', 'M15 11.5 L18.5 4.5 L22 11.5 Z'],
  },
  priorizar: {
    paths: ['M3 5 H19.5 L21 8 H3 Z', 'M3 10.5 H15 V13.5 H3 Z', 'M3 16 H9 V19 H3 Z'],
  },
  implementar: {
    paths: ['M12 2.5 L16 10.5 H8 Z', 'M2.5 15 H21.5 V21.5 H2.5 Z'],
  },
  optimizar: {
    paths: ['M3 21 H7 V17 H3 Z', 'M8.5 21 H12.5 V12 H8.5 Z', 'M14 21 H18 V7 L16 3 L14 7 Z'],
  },

  // ---------- Integraciones ----------
  integraciones: {
    minSize: 20,
    paths: ['M2.5 3 H13 V21 H2.5 Z', 'M15 6 L21 3 V9 Z', 'M15 12 L21 9 V15 Z', 'M15 18 L21 15 V21 Z'],
  },

  // ---------- Blog ----------
  fecha: {
    minSize: 20,
    paths: ['M7 2 H9.5 V4 H7 Z', 'M14.5 2 H17 V4 H14.5 Z', 'M3 5.5 H21 V9 H3 Z', 'M3 10.6 H21 V19 L20 21 H3 Z'],
  },
  'tiempo-lectura': {
    minSize: 20,
    paths: ['M6.5 1.5 H17.5 V3 H6.5 Z', 'M8.25 4 H15.75 L12 11.5 Z', 'M12 12.5 L15.75 20 H8.25 Z', 'M6.5 21 H17.5 V22.5 H6.5 Z'],
  },
  autor: {
    paths: ['M12 2.5 L14 6.5 L12 10.5 L10 6.5 Z', 'M5 21.5 L9 13.5 H15 L19 21.5 Z'],
  },
  etiqueta: {
    paths: ['M2.5 4.5 H17.75 L21.5 12 L17.75 19.5 H2.5 Z'],
  },

  // ---------- Contacto ----------
  email: {
    evenodd: true,
    paths: ['M2.5 5.5 H21.5 V19.5 H2.5 Z M4.5 7.5 L12 11.25 L19.5 7.5 Z'],
  },
  telefono: {
    evenodd: true,
    paths: ['M6.5 2.5 H15 L17.5 7.5 V21.5 H6.5 Z M9 4.6 H13.5 V6 H9 Z'],
  },
  // Excepción declarada al centro de tinta: offY +2,0 en vez de ±1,5. Un
  // marcador apunta a un punto del suelo, así que tiene que pesar abajo.
  // Es la única excepción del set.
  ubicacion: {
    evenodd: true,
    paths: ['M4 6 H20 L12 22 Z M9.5 8.5 H14.5 L12 13.5 Z'],
  },

  // ---------- Estados ----------
  correcto: {
    paths: ['M2.5 10.6 H5.3 L9.8 19.6 H7 Z', 'M13.6 20.6 L21.4 5 L18.9 3.7 L11.1 19.3 Z'],
  },
  atencion: {
    evenodd: true,
    paths: ['M12 2.5 L22 21.5 H2 Z M11 9 H13 V15 H11 Z M11 17 H13 V19 H11 Z'],
  },
  copiar: {
    paths: ['M3 3 H14 V6 H6 V17 H3 Z', 'M8 8 H18.5 L21 13 V21 H8 Z'],
  },
  descargar: {
    minSize: 20,
    paths: ['M11.2 2.5 V11 H12.8 V2.5 Z', 'M12 18 L8.45 10.9 H11.2 Z', 'M12 18 L12.8 10.9 H15.55 Z', 'M3.5 20 H20.5 V21.8 H3.5 Z'],
  },
} satisfies Record<string, Icon>;
