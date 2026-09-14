/**
 * Convierte el HTML de una página compilada en el texto que un lector ve.
 *
 * Vive aparte desde el 14 sep 2026 porque tiene dos consumidores y no puede
 * tener dos versiones: la lectura en frío (`pagina-a-texto.mjs`), que se lo
 * enseña a un revisor sin contexto, y `llms-full.txt`, que se lo enseña a un
 * modelo. Si las dos rutinas divergieran, el texto que auditamos dejaría de
 * ser el texto que publicamos, y ese es justo el fallo que este proyecto ya
 * se comió una vez con la miga de pan.
 *
 * Solo el contenido: fuera cabecera, navegación, pie y scripts, porque son
 * los mismos en todas las páginas y ensucian la lectura.
 */
export function htmlATexto(html) {
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

  // Marcas de bloque, para que se pueda citar por bloque.
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
  return t
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
}
