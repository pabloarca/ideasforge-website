# CLAUDE.md

Contexto para trabajar en este proyecto con Claude Code.

## Qué es

Sitio de marketing bilingüe (ES por defecto, EN en `/en/`) construido con **Astro 5**,
**Tailwind v4** e **i18n nativo de Astro**. Salida estática (`output: 'static'`),
pensada para SEO. Replica la estructura de ideasforge.io.

## Convenciones del stack (importante, hay cambios recientes)

- **Tailwind v4 se configura con el plugin de Vite `@tailwindcss/vite`** en
  `astro.config.mjs`, NO con `@astrojs/tailwind` (deprecado para v4). La config va en
  CSS: `@import "tailwindcss";`, tokens en `@theme {}` y plugins con `@plugin` dentro
  de `src/styles/global.css`. No hay `tailwind.config.js`.
- **Colecciones con la Content Layer API (Astro 5).** La config está en
  `src/content.config.ts` con el loader `glob()` de `astro/loaders`. Para renderizar un
  post se usa `import { render } from 'astro:content'` y `const { Content } = await
  render(post)` (NO `post.render()`, que es de Astro 4).
- **i18n:** `defaultLocale: 'es'`, `locales: ['es','en']`,
  `routing.prefixDefaultLocale: false` → ES en la raíz, EN bajo `/en/`.

## Mapa mental del código

- Texto visible → `src/i18n/ui.ts` (objeto `content` tipado, un bloque por idioma).
- Rutas/links localizados → helpers en `src/i18n/utils.ts` (`localizedPath`,
  `getLangFromUrl`, `routeMap`, `altsFor`).
- SEO (title, description, canonical, hreflang, OG) → `src/layouts/BaseLayout.astro`.
  Cada página le pasa `alternates` (la URL equivalente en cada idioma) para el hreflang
  y el selector de idioma.
- Secciones de la home → componentes en `src/components/` (`Hero`, `TrustedBy`,
  `CaseStudies`, `Integrations`, `Services`, `BlogPreview`, `Faq`, `Contact`). Reciben
  `lang` y leen su texto de `content[lang]`.
- Posts → `src/content/blog/<lang>/*.md`. El `id` queda como `es/slug` o `en/slug`; el
  slug de la URL se obtiene quitando ese prefijo. Las traducciones se enlazan con
  `translationId`.

## Cómo hacer cosas

**Nueva sección en la home:** crea un componente en `src/components/`, añade su texto a
`content.es` y `content.en` en `ui.ts`, e inclúyelo en `src/pages/index.astro` y
`src/pages/en/index.astro`.

**Nueva página estática con slug distinto por idioma** (p. ej. "Sobre nosotros" /
"About"): crea el `.astro` en ES y en `en/`, añade una entrada al `routeMap` de
`utils.ts` y pásala con `altsFor('<clave>')` para que el hreflang y el switcher
funcionen.

**Nuevo idioma:** añádelo a `languages` en `ui.ts`, crea su bloque en `content`, crea la
carpeta `src/pages/<lang>/`, amplía `routeMap` y los `Record<Lang, ...>`.

**Nuevo post:** duplica un `.md` existente en `es/` y `en/` con el mismo
`translationId`. Marca `draft: true` para ocultarlo del build.

## Contenido y textos (IMPORTANTE)

Para escribir o cambiar CUALQUIER texto visible de la web, invoca la skill
`redactar` (`.claude/skills/redactar/`), que impone el flujo completo. Como
mínimo, lee
`.private/base-editorial.md` (no versionado). Es el documento árbitro:
banco de hechos verificados, criterios de aceptación, decisiones cerradas,
mapa de palabras clave y reglas de estilo. Ninguna cifra entra en la web si
no está allí como VERIFICADO. Si ese archivo no existe en tu copia, pídeselo
al propietario del proyecto antes de tocar textos.

## Dónde está cada cosa

- **`.private/PENDIENTES.md`**: todo lo que falta por hacer. Bloqueantes para
  publicar, decisiones que solo el propietario puede cerrar, deuda técnica y
  la cola de publicaciones del blog. Consúltalo antes de proponer trabajo
  nuevo, y actualízalo cuando cierres algo.
- **`.private/ROADMAP.md`**: registro histórico de lo ya hecho y por qué.
- **`.private/base-editorial.md`**: documento árbitro del contenido (ver
  arriba). Su sección 9 es el único registro de cambios de contenido.
- **`.private/README.md`**: el índice de toda la carpeta privada, con el
  estado de cada documento. Documento nuevo que no esté ahí, no existe.

**El repositorio es PÚBLICO.** Todo `.private/` está fuera del control de
versiones y ahí vive el material que no puede publicarse: nombres y datos de
cliente, cifras sin publicar, precios, estrategia y los términos que
identifican al cliente industrial. Antes de escribir cualquier documento nuevo,
decide si va en `.private/` o en la raíz. Ante la duda, `.private/`.

## Regla operativa: la bandeja de entrada

Cualquier hallazgo, fallo, idea o decisión pendiente que surja en mitad de una
tarea se anota EN EL MOMENTO en la sección 0 de `.private/PENDIENTES.md`, en
una línea y sin clasificar. Se clasifica al cerrar. Nada de «lo apunto luego»:
es la causa número uno de descubrimientos perdidos.

Las ideas técnicas de mejora (RSS, JSON-LD pendientes, `astro:assets`, futuros
adapters) viven en `.private/PENDIENTES.md`, no aquí: una sola lista.
