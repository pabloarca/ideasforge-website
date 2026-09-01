import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/*
  Medidas reales de una imagen de `public/`, leídas del propio fichero en
  tiempo de compilación.

  Por qué así y no escribiendo `width` y `height` a mano en cada `<img>`: los
  números a mano se quedan viejos en cuanto alguien cambia un logotipo por otro
  de proporción distinta, y nadie se entera hasta que la página da un salto.
  Derivarlos del fichero hace imposible esa deriva, que es el mismo criterio
  con el que el mapa de grupos del blog se deriva de los enlaces en vez de
  mantenerse en una lista aparte.

  Para qué sirven: reservan el hueco antes de que la imagen llegue. Sin ellos
  el navegador no sabe cuánto va a ocupar y el contenido salta cuando carga,
  que es lo que mide Google como CLS. **Solo hacen falta de verdad cuando el
  CSS deja libre una de las dos dimensiones** (una franja `h-8 w-auto`, por
  ejemplo). Cuando el CSS fija las dos, o el contenedor ya tiene proporción,
  el hueco está reservado igual. Se ponen en todas por uniformidad y porque
  así la regla del verificador no necesita excepciones.

  El valor devuelto es la proporción, no el tamaño de pintado: el CSS sigue
  mandando sobre cuánto ocupa en pantalla.
*/

type Medidas = { width: number; height: number };

const cache = new Map<string, Medidas | null>();

/** Lee las dimensiones de PNG, JPEG, WebP y GIF de la cabecera del fichero. */
function delBinario(b: Buffer): Medidas | null {
  // PNG: firma de 8 bytes y luego la cabecera IHDR.
  if (b.length > 24 && b[0] === 0x89 && b[1] === 0x50) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }

  // JPEG: hay que recorrer los marcadores hasta el SOF, que es el que trae
  // las medidas. Los marcadores 0xc4, 0xc8 y 0xcc caen en el rango pero no
  // son SOF, así que se saltan.
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length - 9) {
      if (b[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marca = b[i + 1];
      if (marca >= 0xc0 && marca <= 0xcf && marca !== 0xc4 && marca !== 0xc8 && marca !== 0xcc) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
    return null;
  }

  // WebP: tres variantes de contenedor, cada una con las medidas en un sitio.
  if (b.length > 30 && b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP') {
    const tipo = b.subarray(12, 16).toString();
    if (tipo === 'VP8 ') {
      return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    }
    if (tipo === 'VP8L') {
      const n = b.readUInt32LE(21);
      return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
    }
    if (tipo === 'VP8X') {
      return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    }
    return null;
  }

  // GIF: las medidas van en la cabecera, en little endian.
  if (b.length > 10 && b.subarray(0, 3).toString() === 'GIF') {
    return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  }

  return null;
}

/** Un SVG no tiene píxeles: la proporción sale del `viewBox`. */
function delSvg(txt: string): Medidas | null {
  const vb = txt.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
  const w = txt.match(/\bwidth\s*=\s*["'](\d+)/i);
  const h = txt.match(/\bheight\s*=\s*["'](\d+)/i);
  return w && h ? { width: +w[1], height: +h[1] } : null;
}

/**
 * Medidas de una imagen servida desde `public/`, por su ruta pública
 * (`/logos/savian.png`). Devuelve `{}` si el fichero no existe o el formato no
 * se sabe leer, para que el `<img>` se pinte igual sin los atributos: una
 * imagen sin medir es un aviso del verificador, no una página rota.
 */
export function medidas(rutaPublica?: string): Partial<Medidas> {
  if (!rutaPublica || !rutaPublica.startsWith('/')) return {};
  if (cache.has(rutaPublica)) return cache.get(rutaPublica) ?? {};

  const fichero = join(process.cwd(), 'public', rutaPublica.replace(/^\//, '').split('?')[0]);
  let m: Medidas | null = null;
  if (existsSync(fichero)) {
    m = rutaPublica.toLowerCase().endsWith('.svg')
      ? delSvg(readFileSync(fichero, 'utf8'))
      : delBinario(readFileSync(fichero));
  }
  cache.set(rutaPublica, m);
  return m ?? {};
}
