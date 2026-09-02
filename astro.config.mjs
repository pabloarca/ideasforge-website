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
        return item;
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
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
