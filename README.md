# Ideasforge, Astro 5 + Tailwind 4 (ES / EN)

Sitio bilingüe (español por defecto, inglés en `/en/`) que replica la estructura de
ideasforge.io con un stack moderno y orientado a SEO.

**Stack:** Astro 5 · Tailwind CSS v4 (plugin Vite) · i18n nativo de Astro ·
Content Layer (colecciones) · TypeScript · `@astrojs/sitemap`.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:4321
```

Otros comandos:

```bash
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve el build de producción
npm run check      # type-check de Astro
```

> Requiere Node 18.17.1+ (recomendado Node 20+).

## Estructura

```
src/
├── i18n/
│   ├── ui.ts          ← TODO el texto del sitio, en ES y EN (edita aquí)
│   └── utils.ts       ← idioma desde la URL, rutas localizadas, mapa de rutas
├── layouts/
│   └── BaseLayout.astro  ← <head>, SEO, hreflang, canonical, OG, header + footer
├── components/        ← Hero, CaseStudies, Services, Faq, Contact, etc.
├── pages/
│   ├── index.astro            → /            (home ES)
│   ├── blog/index.astro       → /blog
│   ├── blog/[...slug].astro   → /blog/<post> (ES)
│   ├── politica-privacidad.astro, politica-cookies.astro
│   └── en/                    → versión inglesa (/en, /en/blog, ...)
├── content/
│   └── blog/{es,en}/*.md      ← posts; cada par se enlaza por `translationId`
└── styles/global.css          ← Tailwind v4 + tokens de marca (@theme)
```

## Tareas habituales

**Cambiar textos:** edita `src/i18n/ui.ts`. Cada idioma tiene su bloque.

**Cambiar colores / tipografía:** edita los tokens `@theme` en `src/styles/global.css`.

**Añadir un post:** crea `src/content/blog/es/mi-post.md` y su traducción
`src/content/blog/en/my-post.md` con el **mismo** `translationId` para que se
enlacen entre idiomas (switcher + hreflang). Mira un post existente como plantilla.

**Antes de publicar, sustituye los placeholders:**
- `astro.config.mjs`: el dominio en `SITE`.
- `src/components/Contact.astro`: tu clave de [Web3Forms](https://web3forms.com)
  (`YOUR-WEB3FORMS-ACCESS-KEY`) o apunta el formulario a tu backend.
- `src/components/TrustedBy.astro` e `Integrations.astro`: logos reales.
- `src/components/Footer.astro`: tu URL de LinkedIn.
- Páginas legales: el texto real de tus políticas.
- `public/`: añade `og-default.png` (imagen para redes) y tu `favicon.svg`.

Más detalle para trabajar con Claude Code en `CLAUDE.md`.
