# Ideasforge Astro, architecture brief

A concise hand-off for any LLM (or human) who needs to be productive on this
codebase in five minutes. Pair it with [CLAUDE.md](CLAUDE.md) for the
day-to-day conventions in Spanish, and with `ideasforge-web-brief.md`,
`.private/archivo/brief-cliente-industrial.md` and `.private/archivo/estrategia-jun2026.md` for the
positioning the copy is written to.

---

## 1. What this is

A bilingual marketing site that started as a faithful replica of the live
WordPress site at `ideasforge.io` and has since evolved into an
**enterprise-first repositioning**: the same visual system, but the copy,
sections and pages now lead with mid-size and large companies, with
dedicated landings for SMBs and Spanish verticals.

Spanish at the root (`/`), English under `/en/`. Fully **static output** for
SEO; no runtime server unless an adapter is added later.

---

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 5** (`astro@^5`) | `output: 'static'`. Content Layer API for the blog. |
| Styling | **Tailwind v4** via the `@tailwindcss/vite` plugin | CSS-first config. **No** `tailwind.config.js`. **No** `@astrojs/tailwind` (deprecated for v4). |
| Typography plugin | `@tailwindcss/typography` | Used only on legal and blog post pages via the `prose` classes. |
| Fonts | Google Fonts loaded in `<head>` | `Space Grotesk` (display + body) and `Raleway` (secondary). |
| Content | Astro 5 **Content Layer API** | `loader: glob({ pattern: '**/*.md', base: './src/content/blog' })`. Use `import { render } from 'astro:content'` then `const { Content } = await render(post)`. NOT `post.render()` (Astro 4 API). |
| i18n | Astro native | `defaultLocale: 'es'`, `locales: ['es','en']`, `routing.prefixDefaultLocale: false`. |
| Forms | Web3Forms (`api.web3forms.com`) | Static-hosting compatible. Access key placeholder in [Contact.astro](src/components/Contact.astro). |
| Node | **≥ 20.12 required** | Vite/Rolldown depend on `util.styleText`. Node 22 LTS recommended. |

---

## 3. Top-level layout

```
src/
  pages/                      # File-based routes
    index.astro               # ES home  ("/")
    en/index.astro            # EN home  ("/en")
    politica-privacidad.astro
    politica-cookies.astro
    en/privacy-policy.astro
    en/cookies-policy.astro
    pymes.astro               # SMB packages landing (ES)
    en/smb.astro              # SMB packages landing (EN)
    inmobiliarias.astro       # Real-estate vertical (ES)
    en/real-estate.astro      # Real-estate vertical (EN)
    gestorias.astro           # Accounting-firms vertical (ES)
    en/accounting-firms.astro # Accounting-firms vertical (EN)
    kit-digital.astro         # Kit Digital landing (ES ONLY, Spain-specific)
    servicios/
      conocimiento-corporativo.astro   # Enterprise offering (ES)
    en/services/
      corporate-knowledge.astro        # Enterprise offering (EN)
    blog/
      index.astro             # ES blog list ("/blog")
      [...slug].astro         # ES blog post  ("/blog/<slug>")
    en/blog/
      index.astro             # EN blog list ("/en/blog")
      [...slug].astro         # EN blog post  ("/en/blog/<slug>")
    404.astro
  layouts/
    BaseLayout.astro          # The only layout. <head>, meta, hreflang, OG, Header, Footer.
  components/                 # Section components. All take `lang` as a prop.
    Header.astro
    Hero.astro
    TrustedBy.astro
    CaseStudies.astro
    Services.astro            # 2-tier (enterprise + SMB) since the repositioning
    WhyUs.astro               # observability, code ownership, security
    Methodology.astro         # Explore / Prioritize / Implement / Optimize
    Integrations.astro
    BlogPreview.astro
    Faq.astro
    Contact.astro
    Footer.astro
    LanguageSwitcher.astro
  i18n/
    ui.ts                     # SINGLE SOURCE OF TRUTH for every visible string in both languages.
    utils.ts                  # Locale helpers + `routeMap` for static pages.
  content/
    blog/
      es/*.md                 # Spanish posts. `id` becomes "es/<slug>".
      en/*.md                 # English posts. Paired by `translationId`.
  content.config.ts           # Astro collection schema (Zod).
  styles/
    global.css                # Tailwind v4 CSS-first config: @theme, @utility, @keyframes.
public/                       # Served at root. Static assets.
  videos/genaisolutions.mp4   # Hero video.
  ideasforge-logo.svg         # Wordmark from the original site.
  favicon-*.png               # Multi-size PNG favicons (32, 192, 270, 512).
  apple-touch-icon.png        # 180x180.
  logos/*.{png,webp}          # Client logos for TrustedBy.
  case-studies/*.{jpg,webp}   # Case-study photos.
  integrations/*.png          # 16 integration logos for the marquee.
  decor/{diamond,cube}.png    # Decorative crystals for FAQ and Contact.
  blog/*.jpg                  # Blog post hero images, referenced from frontmatter.
astro.config.mjs              # i18n + Vite plugin config. `SITE` placeholder.
ARCHITECTURE.md               # This file.
CLAUDE.md                     # Project conventions (Spanish, day-to-day).
ideasforge-web-brief.md       # Strategic brief: what to build and why.
.private/archivo/            # historical briefs (industrial client, strategy).
ideasforge-estrategia.md      # Positioning and packaging rationale.
.claude/skills/               # Project-scoped Claude skills.
  new-blog-post/SKILL.md      # `/new-blog-post` workflow.
```

---

## 4. i18n model

Two languages and an intentionally tiny model.

### 4.1 Copy, `src/i18n/ui.ts`

Exports:

- `content: Record<Lang, SiteContent>`, every visible string keyed by
  language, structured by section.
- `languages: { es: 'Español'; en: 'English' }` and `type Lang`.

`SiteContent` covers:

- `meta` (page titles + descriptions for home, blog and each landing).
- `nav`, `hero`, `trustedBy`, `caseStudies`, `services` (2-tier), `whyUs`
  (3 items), `methodology` (4 steps), `integrations`, `blog`, `faq`,
  `contact`, `footer`.
- `pages.{ enterprise, smb, realEstate, accounting, kitDigital }`, one
  block per dedicated landing.

To change copy: edit `ui.ts`. To add a language: add it to `languages`, add
its content block, create `src/pages/<lang>/` and extend the `routeMap`.

#### Notable types

```ts
interface CaseStudy {
  client: string;
  clientLogo?: string;     // optional, allows anonymized cases (renders text label)
  image?: string;          // optional, renders lavender gradient placeholder when absent
  title: string;
  body: string;
  metricBig: string;       // big phrase OR qualitative descriptor like "En planta"
  metricSmall: string;
}

interface ServiceItem { title: string; description: string; proof?: string; href?: string }
interface ServiceGroup { label: string; items: ServiceItem[] }
// services: { enterprise: ServiceGroup; smb: ServiceGroup; ... }
```

### 4.2 Routing, `src/i18n/utils.ts`

- `getLangFromUrl(url)`, read locale from path.
- `otherLang(lang)`, the alternate language (only two for now).
- `localizedPath(path, lang)`, `'/blog' -> '/blog'` for ES, `'/en/blog'` for EN.
- `routeMap: Record<string, Partial<Record<Lang, string>>>`. **Partial**
  so a route can exist in only one language (Kit Digital is ES-only):

  ```ts
  routeMap = {
    home:        { es: '/',                              en: '/en' },
    blog:        { es: '/blog',                          en: '/en/blog' },
    privacy:     { es: '/politica-privacidad',           en: '/en/privacy-policy' },
    cookies:     { es: '/politica-cookies',              en: '/en/cookies-policy' },
    enterprise:  { es: '/servicios/conocimiento-corporativo', en: '/en/services/corporate-knowledge' },
    smb:         { es: '/pymes',                         en: '/en/smb' },
    realEstate:  { es: '/inmobiliarias',                 en: '/en/real-estate' },
    accounting:  { es: '/gestorias',                     en: '/en/accounting-firms' },
    kitDigital:  { es: '/kit-digital' /* ES only */ },
  };
  ```

- `altsFor(key)` returns `routeMap[key]`, ready to pass as `alternates`
  to `BaseLayout`. Powers hreflang and the language switcher.

For blog posts the alternates are computed dynamically in
`pages/blog/[...slug].astro` and its EN counterpart, using the post's
`translationId` to find its partner.

### 4.3 hreflang and language switching

`BaseLayout.astro` accepts `alternates: Partial<Record<Lang, string>>`,
emits one `<link rel="alternate" hreflang>` per language that exists, and
a `hreflang="x-default"` pointing at the ES URL. The `LanguageSwitcher`
component reads the same `alternates` to render a link to the equivalent
page in the other language; if the other language does not exist (Kit
Digital), it falls back to that language's home.

Every page that wants a working language switch and correct hreflang
**must** pass `alternates`. Static pages do this with
`alternates={altsFor('<key>')}`. Blog posts compute it from
`translationId`.

---

## 5. Layout and components

### 5.1 `BaseLayout.astro`

The only layout. Responsibilities:

- HTML shell, charset, viewport, lang attribute (`es-ES` or `en-US`).
- Title, meta description, canonical, Open Graph, Twitter card.
- Google Fonts (`Space Grotesk`, `Raleway`).
- Favicons (`favicon-32x32.png`, `favicon-192x192.png`, `apple-touch-icon.png`).
- hreflang + x-default.
- Renders `Header`, `<main><slot /></main>`, `Footer`.
- Skip-to-content link.

Props: `lang`, `title`, `description`, `alternates?`, `ogType?`, `image?`.

### 5.2 Section components

Every home-page section component follows the same shape:

```astro
---
import { type Lang, content } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = content[lang].<sectionKey>;
---
```

They read their copy from `content[lang]`, accept `lang` as a prop, and
have **no internal state**. The home pages
([pages/index.astro](src/pages/index.astro) and
[pages/en/index.astro](src/pages/en/index.astro)) compose them in the
**enterprise-first** order:

```
Hero
TrustedBy
CaseStudies
Services        (2-tier: enterprise + SMB)
WhyUs           (observability / code ownership / security)
Methodology     (Explore / Prioritize / Implement / Optimize)
Integrations
BlogPreview
Faq
Contact
```

### 5.3 Notable component behaviours

- **Hero**, centered eyebrow pill (`eyebrow-pill` utility), big H1,
  subtitle, single black CTA. Full-width video card below (autoplay,
  loop, muted).
- **TrustedBy / Integrations**, CSS-only **marquee** (right-to-left).
  The DOM contains the logo set twice (`aria-hidden` on the duplicate)
  and animates the wrapper from `translateX(0)` to `translateX(-50%)`.
  Pauses on hover and respects `prefers-reduced-motion`.
- **CaseStudies**, horizontal scroll-snap carousel
  (`overflow-x-auto snap-x snap-mandatory`). Each slide is full
  container width. A small vanilla `<script>` adds prev/next buttons
  with the original site's exact blue chevron paths, plus pagination
  dots tracked by `IntersectionObserver`. No external carousel library.
  The component handles `clientLogo` / `image` being absent (anonymized
  cases): logo falls back to a small uppercase text label, image falls
  back to a lavender gradient.
- **Services**, **2-tier** since the repositioning. Two groups
  (`enterprise` then `smb`), each rendered as a grid of soft cards.
  Items with a `href` render as `<a>` cards with hover lift; items
  without one render as static `<div>` cards. Items with a `proof`
  string render a small blue chip ("Como en Stanton") inside the card.
- **WhyUs**, three cards (`card-soft`) with a numbered eyebrow in blue,
  matching the rest of the page's accent treatment.
- **Methodology**, four step cards with the step number in big bold
  blue, in a 2-up tablet / 4-up desktop grid.
- **FAQ**, `<details>` elements with the FontAwesome `plus`/`minus` SVG
  paths from the original site, swapped via `group-open:`. Floating
  diamond decoration on the left on desktop.
- **Contact**, the form posts to Web3Forms (static-hosting friendly),
  with a floating cube decoration on the right on desktop. The new
  tagline is "Cuéntanos tu reto. Si no le vemos retorno, te lo diremos."
- **Header / Footer**, both render the wordmark SVG
  (`/ideasforge-logo.svg`) and reuse the same four Heroicons (grid,
  briefcase, document, user-circle). Navbar hover paints a soft gray
  pill; the text stays black. Footer LinkedIn icon is the FontAwesome
  `brands/linkedin` path.

### 5.4 Landing pages

All landings follow the same pattern: hero block (eyebrow pill, H1,
subtitle, black CTA) followed by 2-3 content sections built from
`card-soft` blocks, then a centered CTA block. Copy lives in
`content[lang].pages.<page>` so ES and EN stay in sync.

- **Enterprise** (`/servicios/conocimiento-corporativo`),
  *Asistentes de IA sobre tu conocimiento y tus sistemas*. Sections:
  for whom + problem, what we build + how, guarantees + proof
  (anonymized industrial case), 5 capability cards, CTA.
- **SMB** (`/pymes`), *La misma ingeniería, empaquetada para tu pyme*.
  4 package cards, Kit Digital callout, CTA.
- **Real estate** (`/inmobiliarias`), problem + solution + proof
  (Barceloneta Premium), CTA.
- **Accounting** (`/gestorias`), problem + solution + proof (Stanton),
  CTA.
- **Kit Digital** (`/kit-digital`, **ES only**), intro card, 3
  eligible packages, CTA.

---

## 6. Design system, `src/styles/global.css`

Tailwind v4 is CSS-first: this file **is** the config. Three things live
here:

### 6.1 Tokens, `@theme { ... }`

Every CSS variable inside `@theme` becomes a Tailwind utility.

| Token | Value | Generates |
|---|---|---|
| `--color-bg` | `#ffffff` | `bg-bg`, `text-bg`, `border-bg` |
| `--color-bg-soft` | `#f5f5f7` | `bg-bg-soft` (soft sections, navbar hover) |
| `--color-fg` | `#000000` | `text-fg`, `bg-fg` (LinkedIn square) |
| `--color-muted` | `#7a7a7a` | body text |
| `--color-faint` | `#a3a3a3` | meta/labels |
| `--color-border` | `#e9e7ff` | lavender card borders |
| `--color-border-soft` | `#efefef` | hairlines, header bottom border |
| `--color-primary` | `#000000` | **black** CTAs (`btn-primary`) |
| `--color-primary-hover` | `#1a1a1a` | |
| `--color-accent` | `#002dfd` | eyebrow pill, links, chevron buttons, proof chips |
| `--color-glow` | `#c9c7ff` | trademark lavender card shadow |
| `--font-sans` / `--font-display` | `"Space Grotesk", ...` | |
| `--radius-card` | `15px` | matches the original cards |
| `--shadow-card` | `0 0 10px 0 var(--color-glow)` | the signature lavender bloom |

The palette and shadows were lifted directly from the original WordPress
kit (Elementor global colours).

### 6.2 Utilities, `@utility name { ... }`

Hand-rolled reusable patterns:

- `eyebrow-pill`, small white pill with lavender border and blue text.
  Used at the top of every hero (home + landings).
- `card-soft` / `card-soft-hover`, white card with 15px radius and the
  lavender glow shadow; hover lifts it slightly and tints the shadow
  blue.
- `chip` / `chip-hover`, rounded-full white pill used in the older
  Services list (still available).
- `btn-primary` / `btn-primary-hover`, solid black primary button.
- `btn-ghost`, low-profile gray pill used as "Leer más" in blog cards.
- `eyebrow`, small uppercase blue label used for section eyebrows in
  Services (group label), WhyUs, Methodology and the landing pages.

Variants (`hover:`, `group-open:` etc.) compose with these utilities the
same way they do with built-in Tailwind utilities.

### 6.3 Marquee animation

`@keyframes marquee` plus a `.marquee-track` class. Sections set
`--marquee-duration` inline to tune speed (TrustedBy 50s, Integrations
70s).

### 6.4 Accessibility baseline

- `:focus-visible` paints a 2px accent outline.
- `@media (prefers-reduced-motion: reduce)` kills animations and smooth
  scroll, including the marquee.

---

## 7. Content collection, blog

### 7.1 Schema, `src/content.config.ts`

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['es', 'en']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    translationId: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});
```

### 7.2 File convention

- Files live in `src/content/blog/<lang>/<slug>.md`.
- Astro's `glob` loader sets each post's `id` to e.g. `"es/my-post"`.
- The visible URL slug strips the language prefix: see `slugOf(id) =
  id.replace(/^(es|en)\//, '')` used in both index and `[...slug]`
  pages.
- ES and EN versions of the same post **share the same `translationId`**
  so the language switcher and hreflang link them. The `[...slug]`
  pages look up the partner with `getCollection('blog')` and filter by
  matching `translationId` in the other language.

### 7.3 heroImage

A root-relative path under `/public/`, e.g. `/blog/portada-sql.jpg`.
Used by `BlogPreview` and the blog index card. When absent, a lavender
gradient placeholder is rendered.

### 7.4 Adding a post

Use the **`/new-blog-post`** skill ([SKILL.md](.claude/skills/new-blog-post/SKILL.md)).
It encodes the schema, the slug check, the optional image download and
the dual-file write.

---

## 8. Pages

| Path | Lang | File |
|---|---|---|
| `/` | ES | [src/pages/index.astro](src/pages/index.astro) |
| `/en` | EN | [src/pages/en/index.astro](src/pages/en/index.astro) |
| `/servicios/conocimiento-corporativo` | ES | [enterprise page](src/pages/servicios/conocimiento-corporativo.astro) |
| `/en/services/corporate-knowledge` | EN | [enterprise page](src/pages/en/services/corporate-knowledge.astro) |
| `/pymes` | ES | [SMB packages](src/pages/pymes.astro) |
| `/en/smb` | EN | [SMB packages](src/pages/en/smb.astro) |
| `/inmobiliarias` | ES | [real-estate vertical](src/pages/inmobiliarias.astro) |
| `/en/real-estate` | EN | [real-estate vertical](src/pages/en/real-estate.astro) |
| `/gestorias` | ES | [accounting vertical](src/pages/gestorias.astro) |
| `/en/accounting-firms` | EN | [accounting vertical](src/pages/en/accounting-firms.astro) |
| `/kit-digital` | ES only | [Kit Digital](src/pages/kit-digital.astro) |
| `/blog` | ES | [src/pages/blog/index.astro](src/pages/blog/index.astro) |
| `/en/blog` | EN | [src/pages/en/blog/index.astro](src/pages/en/blog/index.astro) |
| `/blog/<slug>` | ES | [src/pages/blog/[...slug].astro](src/pages/blog/[...slug].astro) |
| `/en/blog/<slug>` | EN | [src/pages/en/blog/[...slug].astro](src/pages/en/blog/[...slug].astro) |
| `/politica-privacidad` | ES | [src/pages/politica-privacidad.astro](src/pages/politica-privacidad.astro) |
| `/en/privacy-policy` | EN | [src/pages/en/privacy-policy.astro](src/pages/en/privacy-policy.astro) |
| `/politica-cookies` | ES | [src/pages/politica-cookies.astro](src/pages/politica-cookies.astro) |
| `/en/cookies-policy` | EN | [src/pages/en/cookies-policy.astro](src/pages/en/cookies-policy.astro) |
| `/404` | best-effort | [src/pages/404.astro](src/pages/404.astro) |

Legal page bodies are hand-coded in the `.astro` files (NOT in
`ui.ts`). They were copy-pasted from the live original.

The 404 uses `getLangFromUrl(Astro.url)` to guess the visitor's
language.

---

## 9. Important conventions

1. **Edit copy in `ui.ts`, not in components.** The only exception is
   long-form legal text inside the policy pages.
2. **Add a new static page in both languages** at the same time, add an
   entry to `routeMap` for it, and pass `altsFor('<key>')` to its
   `BaseLayout`. A landing can be ES-only (Kit Digital): just omit `en`
   from its `routeMap` entry, the switcher and hreflang already handle
   the missing language.
3. **Use the design tokens.** Reach for `bg-bg-soft`, `text-fg`,
   `text-muted`, `border-border-soft`, `card-soft`, `btn-primary`,
   `chip` before introducing one-off colours or shadows.
4. **Black is the primary action colour.** Blue (`accent`) is reserved
   for the eyebrow pill, links, proof chips, FAQ `+` icons and carousel
   chevrons.
5. **No client-side JS framework.** Interactivity is vanilla `<script>`
   blocks inside `.astro` files (carousel, mobile menu via `<details>`,
   FAQ via `<details>`).
6. **Astro 5 Content Layer rendering**, always
   `const { Content } = await render(post)`, never `post.render()`.
7. **Marquee duplication**, when adding new logo strips, include the
   set twice and mark the duplicate `aria-hidden="true"`.
8. **Tailwind v4 quirks**, there is no `tailwind.config.js`. Custom
   utilities go in `global.css` via `@utility`. Custom tokens go in
   `@theme`. Renaming a token requires grepping the whole codebase for
   now-broken class names.
9. **Positioning rules** (from the briefs): enterprise-first voice
   ("we"), no invented metrics (qualitative descriptors when no real
   number exists), and never mention SCADA: use *"sistemas industriales"*
   or *"entorno operativo"* instead. The industrial client is never
   identifiable: not by name, not by sector, not by product. The exact
   wording rules and the list of banned terms live in the arbiter document
   (`.private/base-editorial.md`), which is not versioned.
   Pricing: only the ranges approved in the arbiter may appear on the site.

---

## 10. Build and dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the static build
```

`npm run dev` will fail on Node < 20.12 with a `util.styleText` error
and on a broken `npm install` (rolldown binding missing). Cure by
deleting `node_modules` + `package-lock.json` and reinstalling on
Node 22.

`SITE` in [astro.config.mjs](astro.config.mjs) is a placeholder. Set it
to the production URL before shipping so canonical, hreflang and OG
absolute URLs work.

---

## 11. Pending placeholders

Explicit leftovers that should be replaced before going live (not bugs,
just deferred decisions):

- `SITE` in `astro.config.mjs`.
- `YOUR-WEB3FORMS-ACCESS-KEY` in
  [Contact.astro](src/components/Contact.astro). Replace or swap the
  `action` for an SSR endpoint (requires adding an adapter and setting
  `export const prerender = false` on that route, `hybrid` no longer
  exists in Astro 5).
- LinkedIn URL (`https://www.linkedin.com/`) in
  [Footer.astro](src/components/Footer.astro).
- `public/og-default.png` for social sharing (referenced by
  `BaseLayout`).
- Real images for the anonymized industrial case study and Savian
  (currently rendered as lavender gradients), and optional industrial-client
  logo for TrustedBy if written approval is granted in the future.

---

## 12. Future work, deliberately not done

Easy wins worth knowing about, none of them in scope today:

- RSS per language with `@astrojs/rss`.
- JSON-LD structured data (`Organization`, `Article`).
- `astro:assets`-driven responsive images for `heroImage` and case
  studies.
- A real adapter (`@astrojs/node`, Vercel, Netlify, Cloudflare) if any
  page becomes SSR.
- A typed `RouteKey` for `routeMap` instead of `string`.
- Individual case-study pages (`/casos/<x>`) once there is content that
  warrants its own page. The brief flags them as P3 and optional.
- `@astrojs/upgrade` when bumping to Astro 6.
