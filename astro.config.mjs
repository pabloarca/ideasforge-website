// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import portadasSociales from './scripts/integracion-og.mjs';
import tailwindcss from '@tailwindcss/vite';

// 👉 Change this to your production domain. It is used for canonical URLs,
//    hreflang alternates and the sitemap.
const SITE = 'https://ideasforge.io';

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

    `never` alinea lo que declaramos con lo que enlazamos y con lo que el
    hosting sirve. `build.format` sigue en `directory`, que es lo que genera
    `gestorias/index.html`. En el servidor de desarrollo, `/gestorias/` pasa a
    dar 404, que es exactamente lo que hará producción.
  */
  trailingSlash: 'never',

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
