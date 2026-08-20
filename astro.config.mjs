// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 👉 Change this to your production domain. It is used for canonical URLs,
//    hreflang alternates and the sitemap.
const SITE = 'https://ideasforge.io';

// https://astro.build/config
export default defineConfig({
  site: SITE,

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
    plugins: [tailwindcss()],
  },
});
