import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

/**
 * Qué entradas del blog pertenecen a un grupo temático.
 *
 * El mapa NO se mantiene a mano: se deriva de los enlaces que cada entrada ya
 * declara en su cuerpo. Si un post enlaza a `/servicios/conocimiento-corporativo`,
 * es que pertenece a ese grupo, y quien escribe el post ya tomó esa decisión al
 * elegir a dónde enlazar. Una lista paralela en otro archivo se habría separado
 * del contenido a la primera entrada nueva.
 *
 * Con esto se cierra el enlazado del grupo. Hasta ahora los posts enlazaban
 * hacia arriba y ninguna página pilar devolvía el enlace, así que el buscador
 * no veía el conjunto como una unidad y las entradas dependían del índice del
 * blog para ser rastreadas.
 */
/**
 * El tope es 8 porque ese es hoy el tamaño del grupo más grande, el de
 * `/agentes-de-ia`. Con 4 se quedaban fuera las dos entradas de 2025 que
 * enlazan a un solo pilar: al ordenar por fecha eran siempre las últimas y
 * ningún otro pilar las recogía, así que quedaban sin enlace entrante desde
 * ningún grupo. Si algún grupo pasa de ocho, el corte vuelve a actuar y caen
 * las más antiguas, que es el comportamiento correcto para un bloque de
 * «seguir leyendo». Conviene revisar este número cuando eso ocurra.
 */
export async function postsForPillar(lang: Lang, pillar: string, limit = 8) {
  const posts = await getCollection(
    'blog',
    ({ data }) => data.lang === lang && !data.draft
  );

  // El enlace se busca en markdown, `](/ruta)`, que es como se escriben en el
  // cuerpo. El `$` del final evita que `/gestorias` case con `/gestorias-algo`.
  const escapada = pillar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const enlace = new RegExp(`\\]\\(${escapada}\\)`);

  return posts
    .filter((p) => enlace.test(p.body ?? ''))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, limit);
}

/** Ruta del pilar a partir de la URL de la página, sin barra final. */
export function pillarFromUrl(pathname: string): string {
  const limpio = pathname.replace(/\/+$/, '');
  return limpio === '' ? '/' : limpio;
}
