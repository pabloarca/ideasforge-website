// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sitemap from '@astrojs/sitemap';
import portadasSociales from './scripts/integracion-og.mjs';
import tailwindcss from '@tailwindcss/vite';

// 👉 Change this to your production domain. It is used for canonical URLs,
//    hreflang alternates and the sitemap.
const SITE = 'https://ideasforge.io';

/*
  Fechas reales de las entradas del blog, leídas del frontmatter para que el
  sitemap pueda declarar `lastmod` sin inventarse nada. Se hace aquí con un
  lector mínimo y no con la API de contenido porque la configuración se evalúa
  antes de que esa API exista.
*/
const fechasDelBlog = (() => {
  const mapa = new Map();
  for (const idioma of ['es', 'en']) {
    const dir = `./src/content/blog/${idioma}`;
    if (!existsSync(dir)) continue;
    for (const fichero of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const txt = readFileSync(join(dir, fichero), 'utf8');
      // Un borrador no está publicado, así que tampoco está en el sitemap.
      if (/^draft:\s*true/m.test(txt)) continue;
      const act = (txt.match(/^updatedDate:\s*(\S+)/m) || [])[1];
      const pub = (txt.match(/^pubDate:\s*(\S+)/m) || [])[1];
      const fecha = act || pub;
      if (!fecha) continue;
      const slug = fichero.replace(/\.md$/, '');
      const ruta = idioma === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;
      mapa.set(ruta, new Date(fecha).toISOString());
    }
  }
  return mapa;
})();

/*
  Pares de idioma para el `hreflang` DEL SITEMAP.

  Hasta el 14 sep 2026 esto lo hacia la opcion `i18n` de `@astrojs/sitemap`, y
  emparejaba por convencion de ruta: espera que la inglesa sea la espanola con
  `/en` delante. Aqui los slugs estan traducidos a proposito
  (`/servicios/agentes-conversacionales` contra `/en/services/conversational-ai`),
  asi que solo acertaba donde la ruta coincide letra a letra: la portada y el
  indice del blog. **Resultado: 4 URL con alternates de 66, mientras el `<head>`
  las declaraba en las 69.** Lo destapo la auditoria contra el pliego de campos.

  Ahora los pares salen de las dos fuentes que ya los conocen: `routeMap` para
  las paginas fijas y `translationId` para las entradas del blog. Es el mismo
  origen que alimenta el selector de idioma y el hreflang de la cabecera, que
  es justo lo que evita que el sitemap vuelva a contar otra historia.
*/
const paresDeIdioma = (() => {
  const pares = new Map();
  /** @param {string} es @param {string} en */
  const apunta = (es, en) => {
    const enlaces = [
      { lang: 'es-ES', url: new URL(es, SITE).href },
      { lang: 'en-US', url: new URL(en, SITE).href },
    ];
    pares.set(es.replace(/\/+$/, '') || '/', enlaces);
    pares.set(en.replace(/\/+$/, '') || '/', enlaces);
  };

  // Paginas fijas: se lee `routeMap` como texto por lo mismo que las fechas,
  // que la configuracion se evalua antes de que exista la API de contenido.
  const utils = readFileSync('./src/i18n/utils.ts', 'utf8');
  const mapa = utils.slice(utils.indexOf('export const routeMap'));
  for (const m of mapa.matchAll(/\{\s*es:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)) {
    apunta(m[1], m[2]);
  }

  // Entradas del blog: se emparejan por `translationId`, como en la web.
  const porTraduccion = new Map();
  for (const idioma of ['es', 'en']) {
    const dir = `./src/content/blog/${idioma}`;
    if (!existsSync(dir)) continue;
    for (const fichero of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const txt = readFileSync(join(dir, fichero), 'utf8');
      if (/^draft:\s*true/m.test(txt)) continue;
      const id = (txt.match(/^translationId:\s*['"]?([^'"\s]+)/m) || [])[1];
      if (!id) continue;
      const slug = fichero.replace(/\.md$/, '');
      const ruta = idioma === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;
      porTraduccion.set(id, { ...(porTraduccion.get(id) || {}), [idioma]: ruta });
    }
  }
  for (const par of porTraduccion.values()) {
    if (par.es && par.en) apunta(par.es, par.en);
  }
  return pares;
})();

// https://astro.build/config
export default defineConfig({
  site: SITE,

  /*
    Sin barra final, y es una decisión, no un detalle.

    La medición del 1 sep 2026 encontró que el sitio decía dos cosas a la vez:
    los 66 enlaces internos de la portada apuntaban a `/gestorias` y la
    canónica, la etiqueta og:url, el hreflang y las 57 entradas del sitemap
    declaraban `/gestorias/`. Cloudflare Pages sirve la carpeta en la forma sin
    barra y redirige la otra, así que **la canónica apuntaba a una URL que
    redirige**, que es de las pocas cosas que un buscador toma como error y no
    como matiz.

    `never` alinea lo que declaramos con lo que enlazamos.

    CORRECCIÓN DEL 2 SEP 2026, medida en producción y no supuesta. La frase de
    arriba sobre lo que sirve Cloudflare Pages estaba AL REVÉS: con
    `build.format: 'directory'` el compilado es `gestorias/index.html`, y ante
    esa forma Pages normaliza AÑADIENDO la barra. Comprobado con `curl`:
    `https://ideasforge.io/empezar` devolvía 308 a `/empezar/` mientras la
    página declaraba su canónica sin barra. O sea que el error que esta
    decisión decía corregir seguía vivo, con el signo cambiado, en las 68
    páginas a la vez.

    `build.format: 'file'` lo cierra de verdad: genera `gestorias.html` y Pages
    lo sirve en `/gestorias` con un 200 limpio, que es la forma que ya
    declaraban la canónica, el sitemap, los hreflang y los destinos de
    `_redirects`. Se elige esta salida y no `trailingSlash: 'always'` porque
    aquella habría obligado a reescribir todo eso y habría dejado cada URL
    vieja con dos saltos, el 301 del mapa y el 308 de la barra.
  */
  trailingSlash: 'never',
  build: { format: 'file' },

  // Native i18n routing. Spanish is the default language and lives at the
  // root (/, /blog, ...). English lives under /en/ (/en, /en/blog, ...).
  // Flip `prefixDefaultLocale` to true if you ever want /es/ in the URL too.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    portadasSociales(),
    sitemap({
      /*
        Fuera del sitemap las páginas que solo tienen sentido detrás de una
        acción. El acuse de los formularios va además `noindex` en su propia
        cabecera: un sitemap que anuncia una URL que la página pide no indexar
        es una contradicción que el buscador registra como tal.
      */
      filter: (url) => !/\/(gracias|thank-you)$/.test(new URL(url).pathname.replace(/\/+$/, '')),
      /*
        `lastmod` SOLO donde la fecha es de verdad, que hoy es el blog.

        La tentación es poner la fecha de compilación en las 57 URL, y es peor
        que no poner nada: un sitemap donde todo cambió «hoy», cada día, deja de
        aportar información y Google acaba ignorando el campo del sitio entero.
        Las páginas fijas no llevan fecha de modificación en ninguna parte, así
        que no se inventa.

        Las entradas del blog sí la tienen, en `updatedDate` o, si nunca se ha
        revisado, en `pubDate`. El mapa se construye una vez y se consulta por
        URL al serializar.
      */
      serialize(item) {
        const ruta = new URL(item.url).pathname.replace(/\/+$/, '') || '/';
        const fecha = fechasDelBlog.get(ruta);
        if (fecha) item.lastmod = fecha;
        const enlaces = paresDeIdioma.get(ruta);
        if (enlaces) item.links = enlaces;
        return item;
      },
      /*
        SIN la opcion `i18n`: emparejaba por convencion de ruta y aqui los
        slugs estan traducidos. Los alternates los pone `serialize` desde
        `paresDeIdioma`, arriba.
      */
    }),
  ],

  // Tailwind v4 is wired through the official Vite plugin (NOT the old
  // @astrojs/tailwind integration, which is deprecated for v4).
  vite: {
    /*
      El aserto de tipo no tapa un fallo, tapa un desajuste de versiones que no
      es nuestro: en el árbol conviven dos Vite, el 6.4 que fija Astro y el 8.1
      que arrastra `@tailwindcss/vite`. Cada uno declara su propio tipo
      `Plugin`, así que TypeScript los ve incompatibles aunque la superficie
      que el plugin usa de verdad sea la misma. La compilación funciona y el
      CSS sale correcto.

      Conviene quitarlo cuando Astro suba a Vite 8: si para entonces el
      desajuste era real, el error aparecerá y habrá que atenderlo. Anotado en
      PENDIENTES el 1 sep 2026.
    */
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
