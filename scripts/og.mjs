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
  sirve la web: satori no lee WOFF2, y las variables le hacen escoger el eje
  por defecto, que en Space Grotesk es el peso fino. Son ficheros de
  compilación, nunca se sirven, y por eso viven fuera de `public/`.
*/

const DIR = join(process.cwd(), '.og-assets');
const fuente = (n) => readFileSync(join(DIR, n));

/** El logotipo va como trazado para no depender de cargar un fichero externo. */
const MARCA = 'IDEASFORGE';

export const OG = { ancho: 1200, alto: 630 };

/**
 * Qué se pinta. Un color de fondo por familia de página, para que de un
 * vistazo se distinga un caso de una guía sin leer nada. Los tonos salen de
 * los que ya usa el sitio.
 */
/** @typedef {'guia'|'servicio'|'caso'|'blog'|'vertical'|'home'} Familia */

/** @type {Record<Familia,[string,string]>} */
/* Primero el fondo, después el color del filete que lo acompaña. */
const FONDOS = {
  home: ['#001a8c', '#7d92ff'],
  guia: ['#0b1020', '#6f83e8'],
  servicio: ['#12103a', '#a78bfa'],
  caso: ['#0a1a3f', '#5fb3f5'],
  blog: ['#161616', '#9aa0ff'],
  vertical: ['#0a2a2a', '#4fd1a5'],
};

/** @type {Record<Familia,{es:string,en:string}>} */
const ETIQUETA = {
  home: { es: 'Ideasforge', en: 'Ideasforge' },
  guia: { es: 'Guía', en: 'Guide' },
  servicio: { es: 'Servicio', en: 'Service' },
  caso: { es: 'Caso en producción', en: 'Case in production' },
  blog: { es: 'Blog', en: 'Blog' },
  vertical: { es: 'Sector', en: 'Sector' },
};

/**
 * Genera el PNG de una página. Devuelve el búfer listo para servir.
 * @param {{titulo:string, familia:Familia, lang:'es'|'en', pie?:string}} o
 * @returns {Promise<Buffer>}
 */
export async function portadaSocial({ titulo, familia, lang, pie }) {
  const [desde, hasta] = FONDOS[familia];
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
          padding: '72px 80px',
          /*
            Fondo plano y no degradado, por dos razones que apuntan al mismo
            sitio. La primera es de peso: un degradado obliga al PNG a guardar
            miles de tonos y cada portada pasaba de 111 KB, o sea 5,3 MB entre
            las 49, que rompía el presupuesto del propio verificador. En plano
            son 33 KB. La segunda es de lenguaje: el sitio habla en superficies
            planas con filetes, no en degradados.
          */
          backgroundColor: desde,
          fontFamily: 'Space Grotesk',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: '18px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 26,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      color: '#ffffff',
                    },
                    children: MARCA,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 22,
                      color: 'rgba(255,255,255,0.62)',
                      borderLeft: '1px solid rgba(255,255,255,0.28)',
                      paddingLeft: '18px',
                    },
                    children: etiqueta,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '30px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', width: '84px', height: '3px', backgroundColor: hasta },
                    children: '',
                  },
                },
                {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: tam,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              },
              children: titulo,
            },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255,255,255,0.72)',
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
        { name: 'Space Grotesk', data: fuente('SpaceGrotesk-Regular.otf'), weight: 400, style: 'normal' },
        { name: 'Space Grotesk', data: fuente('SpaceGrotesk-Bold.otf'), weight: 700, style: 'normal' },
      ],
    }
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: OG.ancho } }).render().asPng();
  return Buffer.from(png);
}
