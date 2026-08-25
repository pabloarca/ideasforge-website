/**
 * Vuelca una página compilada como el texto que un lector ve en pantalla.
 *
 *   node scripts/pagina-a-texto.mjs agentes-de-ia
 *   node scripts/pagina-a-texto.mjs en/ai-agents
 *
 * Existe para alimentar al lector frío (`.claude/agents/lector-frio.md`), que
 * tiene que juzgar la página sin saber nada de este repositorio. Por eso lee
 * de `dist/` y no de `src/i18n/ui.ts`: lo que se revisa es lo que se publica,
 * con sus diagramas, su FAQ y su cierre, no la estructura de datos que hay
 * detrás. Requiere haber compilado antes (`npx astro build`).
 *
 * Solo el contenido: se descartan cabecera, navegación lateral, pie y
 * scripts, porque son los mismos en todas las páginas y ensucian la lectura.
 */
import { readFileSync } from 'node:fs';

const ruta = process.argv[2];
if (!ruta) {
  console.error('Uso: node scripts/pagina-a-texto.mjs <ruta>   (p. ej. agentes-de-ia)');
  process.exit(1);
}

const fichero = `dist/${ruta.replace(/^\/+|\/+$/g, '')}/index.html`.replace('dist//', 'dist/');
let html;
try {
  html = readFileSync(fichero, 'utf8');
} catch {
  console.error(`No encuentro ${fichero}. ¿Has compilado? npx astro build`);
  process.exit(1);
}

// Solo el cuerpo de la página.
const ini = html.indexOf('<main');
const fin = html.indexOf('</main>');
let t = ini >= 0 && fin > ini ? html.slice(html.indexOf('>', ini) + 1, fin) : html;

// Fuera lo que no se lee.
t = t
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  .replace(/<nav[\s\S]*?<\/nav>/gi, ' ');

// Marcas de bloque, para que el revisor pueda citar por bloque.
t = t
  .replace(/<h1[^>]*>/gi, '\n\n# ')
  .replace(/<h2[^>]*>/gi, '\n\n## ')
  .replace(/<h3[^>]*>/gi, '\n\n### ')
  .replace(/<h4[^>]*>/gi, '\n\n#### ')
  .replace(/<li[^>]*>/gi, '\n  - ')
  .replace(/<\/(p|div|section|figure|figcaption|ul|ol|li|h[1-6])>/gi, '\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<strong[^>]*>|<\/strong>/gi, '**')
  .replace(/<[^>]+>/g, ' ');

// Entidades y espaciado.
t = t
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/[ \t]+/g, ' ')
  .replace(/ *\n */g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

console.log(t);
