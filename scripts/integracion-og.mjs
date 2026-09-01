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
    else if (f.name === 'index.html') a.push(p);
  }
  return a;
};

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
            fichero.split(sep).join('/').replace(raiz.split(sep).join('/'), '/').replace(/\/index\.html$/, '') ||
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
      },
    },
  };
}
