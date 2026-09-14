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
import { existsSync, readFileSync } from 'node:fs';

const ruta = process.argv[2];
if (!ruta) {
  console.error('Uso: node scripts/pagina-a-texto.mjs <ruta>   (p. ej. agentes-de-ia)');
  process.exit(1);
}

/* Las dos formas de salida de Astro, en este orden. El sitio usa
   `build.format: 'file'` desde el 2 sep 2026, que genera `en/smb.html`, pero
   se prueba también `en/smb/index.html` para que un cambio de esa opción no
   vuelva a dejar mudo al lector frío. Pasó: el cambio de formato rompió este
   script y no se notó en doce días, porque la lectura en frío dejó de ser
   obligatoria el 28 ago y nadie la lanzó en ese tiempo. */
const base = ruta.replace(/^\/+|\/+$/g, '');
const candidatos = base
  ? [`dist/${base}.html`, `dist/${base}/index.html`]
  : ['dist/index.html'];
let html;
const fichero = candidatos.find((f) => existsSync(f));
if (!fichero) {
  console.error(`No encuentro ninguno de ${candidatos.join(' ni ')}. ¿Has compilado? npx astro build`);
  process.exit(1);
}
html = readFileSync(fichero, 'utf8');

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
  /* Las etiquetas se sustituyen por un espacio arriba, así que `</u>.` salía
     como espacio más punto y el lector frío lo denunciaba como falta de la
     página. Pasó el 14 sep 2026: cuatro avisos de la portada inglesa eran de
     esta herramienta y no del texto. Un informe con ruido propio se cree
     menos, así que el espacio se retira antes de la puntuación. */
  .replace(/ +([.,;:!?)»”])/g, '$1')
  .replace(/([(«“]) +/g, '$1')
  .replace(/ *\n */g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

console.log(t);
