import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, sep, dirname } from 'node:path';
import { portadaSocial } from './og.mjs';

/*
  Integración de Astro que genera una portada social por página, ya terminado
  el build.

  Por qué en un gancho de fin de build y no en un endpoint con
  `getStaticPaths`: un endpoint tendría que volver a enumerar todas las
  páginas y volver a averiguar el título de cada una, duplicando lo que ya
  sabe `ui.ts` y el frontmatter de los posts. En cuanto alguien creara una
  página nueva, su portada faltaría y nadie se enteraría hasta ver un enlace
  compartido sin imagen.

  Aquí la fuente de la verdad es la propia página compilada: se lee su
  `<title>` y su `og:image`, y se genera la imagen solo si esa etiqueta apunta
  a `/og/`. Una página nueva la hereda sin que nadie se acuerde, igual que la
  miga de pan y los datos estructurados.

  Las páginas que traen fotografía propia (los posts con `heroImage`) no pasan
  por aquí: su `og:image` apunta a la foto y se respeta, porque una imagen real
  del asunto vende más que una tarjeta generada.
*/

/** La familia decide el color y la etiqueta. Se deduce de la ruta. */
function familiaDe(ruta) {
  if (ruta === '/' || ruta === '/en') return 'home';
  if (/^\/(en\/)?blog\//.test(ruta)) return 'blog';
  if (/^\/(servicios|en\/services)\//.test(ruta)) return 'servicio';
  if (/^\/casos\//.test(ruta)) return 'caso';
  if (/^\/(pymes|gestorias|inmobiliarias|en\/(smb|accounting-firms|real-estate))$/.test(ruta)) {
    return 'vertical';
  }
  // Las legales caían en el saco de «guía» por defecto y se anunciaban como
  // tal. Nadie comparte una política de cookies, pero salía mal.
  if (/^\/(politica-|en\/(privacy|cookies)-policy)/.test(ruta)) return 'legal';
  return 'guia';
}

const recorre = (d, a = []) => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) recorre(p, a);
    // Desde el 2 sep 2026 el compilado es `gestorias.html` y no
    // `gestorias/index.html` (`build.format: 'file'`, ver astro.config.mjs).
    // Se aceptan las dos formas para que este script no dependa de esa
    // decisión, que es de servidor y puede volver a cambiar.
    else if (f.name.endsWith('.html')) a.push(p);
  }
  return a;
};

/*
  llms.txt, el índice del sitio para modelos de lenguaje.

  Es una convención emergente, no un estándar con respaldo de nadie, y conviene
  decirlo antes de que alguien espere de más: hoy ningún buscador promete
  leerlo. Cuesta veinte líneas y encaja con lo que esta casa predica, así que
  se pone con esa expectativa y no con otra.

  Se genera del sitio compilado por la misma razón que las portadas: una lista
  escrita a mano se queda vieja a la primera página nueva. De cada página salen
  su título y su descripción, que ya pasaron por revisión editorial.
*/
function escribeLlmsTxt(raiz, logger) {
  const paginas = [];
  for (const fichero of recorre(raiz)) {
    const html = readFileSync(fichero, 'utf8');
    const ruta =
      fichero.split(sep).join('/').replace(raiz.split(sep).join('/'), '/').replace(/\/index\.html$/, '').replace(/\.html$/, '') ||
      '/';
    const limpia = ruta.replace(/\/+$/, '') || '/';
    if (limpia === '/404') continue;
    paginas.push({
      ruta: limpia,
      titulo: ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/,\s*Ideasforge$/, ''),
      desc: (html.match(/name="description" content="([^"]*)"/) || [])[1] || '',
      en: limpia === '/en' || limpia.startsWith('/en/'),
    });
  }

  const esBlog = (p) => /^\/(en\/)?blog\//.test(p.ruta);
  const esLegal = (p) => /^\/(politica-|en\/(privacy|cookies)-policy)/.test(p.ruta);

  const bloque = (titulo, filtro) => {
    const items = paginas.filter(filtro).sort((a, b) => a.ruta.localeCompare(b.ruta));
    if (!items.length) return '';
    const lineas = items.map((p) => `- [${p.titulo}](https://ideasforge.io${p.ruta}): ${p.desc}`);
    return [`## ${titulo}`, '', ...lineas, '', ''].join('\n');
  };

  const cabecera = [
    '# Ideasforge',
    '',
    '> Diseñamos, construimos y mantenemos agentes de IA y automatización de',
    '> procesos para empresas. Cinco sistemas en producción con usuarios reales.',
    '> El sitio existe en español, en la raíz, y en inglés bajo /en/.',
    '',
    'Notas para quien lea esto de forma automática. Las cifras que aparecen en',
    'estas páginas salen de sistemas nuestros en producción y están verificadas',
    'una a una. Las que hablan del mundo llevan su fuente nombrada en el propio',
    'texto. Y cuando una página dice que algo puede salir mal, es literal y no',
    'una figura retórica.',
    '',
    '',
  ].join('\n');

  const llms =
    cabecera +
    bloque('Páginas en español', (p) => !p.en && !esBlog(p) && !esLegal(p)) +
    bloque('Blog en español', (p) => !p.en && esBlog(p)) +
    bloque('Pages in English', (p) => p.en && !esBlog(p) && !esLegal(p)) +
    bloque('Blog in English', (p) => p.en && esBlog(p)) +
    bloque('Legal', esLegal);

  writeFileSync(join(raiz, 'llms.txt'), llms, 'utf8');
  logger.info(`llms.txt: ${paginas.length} páginas indexadas`);
}

export default function portadasSociales() {
  return {
    name: 'portadas-sociales',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = dir.pathname.replace(/^\/([A-Za-z]:)/, '$1');
        let hechas = 0;

        for (const fichero of recorre(raiz)) {
          const html = readFileSync(fichero, 'utf8');
          const og = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || '';
          // Solo las que piden portada generada. El resto trae foto propia.
          const m = og.match(/\/og\/(.+)\.png$/);
          if (!m) continue;

          const titulo = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '')
            .replace(/,\s*Ideasforge$/, '')
            .replace(/&#39;/g, '’')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
          const ruta =
            fichero.split(sep).join('/').replace(raiz.split(sep).join('/'), '/').replace(/\/index\.html$/, '').replace(/\.html$/, '') ||
            '/';
          const limpia = ruta.replace(/\/+$/, '') || '/';
          const lang = limpia === '/en' || limpia.startsWith('/en/') ? 'en' : 'es';

          const png = await portadaSocial({
            titulo,
            familia: familiaDe(limpia),
            lang,
            pie: 'ideasforge.io' + (limpia === '/' ? '' : limpia),
          });

          const destino = join(raiz, 'og', m[1] + '.png');
          mkdirSync(dirname(destino), { recursive: true });
          writeFileSync(destino, png);
          hechas += 1;
        }

        logger.info(`portadas sociales generadas: ${hechas}`);
        escribeLlmsTxt(raiz, logger);
      },
    },
  };
}
