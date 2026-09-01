import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { content } from '../i18n/ui';

/*
  Canal RSS del blog en español. Su gemelo inglés vive en
  `src/pages/en/rss.xml.ts`.

  Son dos canales y no uno mezclado a propósito: quien se suscribe lo hace en
  un idioma, y un canal bilingüe obliga a leer la mitad de lo que no entiende.
  Cada uno declara su `language`, que es lo que usan los lectores para
  agruparlos.

  Los borradores quedan fuera con el mismo filtro que el índice del blog, así
  que una entrada en la nevera no se cuela por aquí.

  El orden es por fecha de publicación descendente, y NO por la de
  actualización: un lector marca como leído lo que ya vio, y reordenar por
  actualización le repetiría entradas viejas cada vez que se corrige una coma.
*/
export async function GET(context: APIContext) {
  const lang = 'es' as const;
  const t = content[lang];

  const posts = (await getCollection('blog', ({ data }) => data.lang === lang && !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: t.meta.blogTitle.replace(/, Ideasforge$/, ''),
    description: t.meta.blogDescription,
    site: context.site ?? 'https://ideasforge.io',
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id.replace(/^(es|en)\//, '')}`,
      categories: p.data.tags,
    })),
    customData: `<language>es-ES</language>`,
  });
}
