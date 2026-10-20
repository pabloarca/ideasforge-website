import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

/*
  Portadas sociales, una por página, generadas al compilar.

  El problema que resuelve: 49 de las 57 páginas compartían la misma imagen
  azul con el logotipo. Compartieras lo que compartieras por WhatsApp o
  LinkedIn, salía siempre la misma tarjeta, así que la vista previa no decía
  nada de a dónde llevaba el enlace.

  Cómo funciona. `satori` monta un SVG a partir de una descripción de nodos,
  igual que si fuera HTML, y resuelve por su cuenta el salto de línea de un
  título largo, que es justo lo que ninguna herramienta de imagen sabe hacer.
  Luego `resvg` lo rasteriza a PNG, que es lo único que aceptan las redes.

  Las tipografías van en `.og-assets/`, en OTF estático y no en el WOFF2 que
  sirve la web: satori no lee WOFF2, y una variable le hace escoger el peso por
  defecto del eje en vez del que se le pide. Son ficheros de compilación,
  nunca se sirven, y por eso viven fuera de `public/`.

  ASPECTO DESDE OCTUBRE DE 2026. Las portadas hablan el lenguaje del sitio
  nuevo: fondo gris claro, tinta, Geist, una regla de 2 px y el acento solo en
  el rótulo. Antes cada familia de página llevaba su propio fondo oscuro, con
  siete colores entre todas. El sistema de diseño tiene un solo acento, así
  que ahora lo que distingue un caso de una guía es lo que dice el rótulo, no
  el color de la tarjeta.
*/

const DIR = join(process.cwd(), '.og-assets');
const fuente = (n) => readFileSync(join(DIR, n));

/** La marca va como texto, en la misma Geist del logotipo nuevo, para no
 *  depender de cargar un fichero externo. */
const MARCA = 'Ideasforge';

export const OG = { ancho: 1200, alto: 630 };

/** @typedef {'guia'|'servicio'|'caso'|'blog'|'vertical'|'home'|'legal'} Familia */

/* La paleta del sitio, la misma de `src/styles/global.css`. */
const COLOR = {
  fondo: '#f3f2f2',
  tinta: '#201e1d',
  apagado: '#605d5d',
  regla: '#c9c6c5',
  acento: '#002dfd',
};

/** @type {Record<Familia,{es:string,en:string}>} */
const ETIQUETA = {
  /* La portada ya lleva la marca a la izquierda: repetirla como rótulo no
     diría nada. Lleva el mismo rótulo que su héroe. */
  home: { es: 'Inteligencia artificial a medida', en: 'Custom artificial intelligence' },
  guia: { es: 'Guía', en: 'Guide' },
  servicio: { es: 'Servicio', en: 'Service' },
  caso: { es: 'Caso en producción', en: 'Case in production' },
  blog: { es: 'Blog', en: 'Blog' },
  vertical: { es: 'Sector', en: 'Sector' },
  legal: { es: 'Legal', en: 'Legal' },
};

/**
 * Genera el PNG de una página. Devuelve el búfer listo para servir.
 * @param {{titulo:string, familia:Familia, lang:'es'|'en', pie?:string}} o
 * @returns {Promise<Buffer>}
 */
export async function portadaSocial({ titulo, familia, lang, pie }) {
  const etiqueta = ETIQUETA[familia][lang];

  /*
    El tamaño del título baja por tramos según lo largo que venga. Sin esto,
    un título de nueve palabras se sale de la caja y satori lo recorta por
    abajo sin avisar.
  */
  const tam = titulo.length > 85 ? 52 : titulo.length > 60 ? 62 : titulo.length > 38 ? 72 : 84;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 80px',
          /*
            Fondo plano y no degradado, por dos razones que apuntan al mismo
            sitio. La primera es de peso: un degradado obliga al PNG a guardar
            miles de tonos y cada portada pasaba de 111 KB, que rompía el
            presupuesto del propio verificador. En plano son unos 30 KB. La
            segunda es de lenguaje: el sitio no usa degradados.
          */
          backgroundColor: COLOR.fondo,
          fontFamily: 'Geist',
          color: COLOR.tinta,
        },
        children: [
          /* Arriba: la marca a la izquierda y el rótulo de la familia a la
             derecha, en mayúsculas y acento, como los rótulos del sitio. */
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '28px',
                borderBottom: `2px solid ${COLOR.tinta}`,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em' },
                    children: MARCA,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 20,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: COLOR.acento,
                    },
                    children: etiqueta,
                  },
                },
              ],
            },
          },
          /* En medio, el título. Peso 500 y espaciado negativo: es el
             titular del sitio, no una negrita. */
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: tam,
                fontWeight: 500,
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
              },
              children: titulo,
            },
          },
          /* Abajo, la entradilla o el dominio, sobre la regla gris. */
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                paddingTop: '26px',
                borderTop: `2px solid ${COLOR.regla}`,
                fontSize: 24,
                color: COLOR.apagado,
              },
              children: pie ? (pie.length > 96 ? pie.slice(0, 93) + '…' : pie) : 'ideasforge.io',
            },
          },
        ],
      },
    },
    {
      width: OG.ancho,
      height: OG.alto,
      fonts: [
        { name: 'Geist', data: fuente('Geist-Regular.otf'), weight: 400, style: 'normal' },
        { name: 'Geist', data: fuente('Geist-Medium.otf'), weight: 500, style: 'normal' },
        { name: 'Geist', data: fuente('Geist-SemiBold.otf'), weight: 600, style: 'normal' },
      ],
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: OG.ancho } }).render().asPng();
  return Buffer.from(png);
}
