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
| Fonts | Self-hosted, preloaded in `<head>` | `Geist` variable, one file for every weight. No Google Fonts. |
| Content | Astro 5 **Content Layer API** | `loader: glob({ pattern: '**/*.md', base: './src/content/blog' })`. Use `import { render } from 'astro:content'` then `const { Content } = await render(post)`. NOT `post.render()` (Astro 4 API). |
| i18n | Astro native | `defaultLocale: 'es'`, `locales: ['es','en']`, `routing.prefixDefaultLocale: false`. |
| Forms | Web3Forms (`api.web3forms.com`) | Static-hosting compatible. The access key comes from `PUBLIC_WEB3FORMS_KEY` (see `src/lib/formulario.ts`). Used by `home/ContactForm.astro` and `StartForm.astro`. |
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
  components/                 # Shared pieces. All take `lang` as a prop.
    Header.astro
    Footer.astro
    LanguageSwitcher.astro
    LongFormPage.astro        # renderer for services, guides, cases, verticals
    FaqList.astro             # the one FAQ accordion of the site
    RevealOnScroll.astro
    home/                     # the twelve home sections (see 5.2)
    pizarra/                  # whiteboard diagrams for long text
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
  ideasforge-logo.svg         # Wordmark from the original site.
  favicon-*.png               # Multi-size PNG favicons (32, 192, 270, 512).
  apple-touch-icon.png        # 180x180.
  logos/*.{png,webp}          # Client logos for the home LogoMarquee.
  case-studies/*.{jpg,webp}   # Case-study photos.
  fonts/geist-latin.woff2     # The site typeface, self-hosted.
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
- Preload of the self-hosted Geist font.
- Favicons (`favicon-32x32.png`, `favicon-192x192.png`, `apple-touch-icon.png`).
- hreflang + x-default.
- Renders `Header`, `<main><slot /></main>`, `Footer`.
- Skip-to-content link.

Props: `lang`, `title`, `description`, `alternates?`, `ogType?`, `image?`.

### 5.2 Home sections

Since the October 2026 redesign the home page is built from the twelve
components in `src/components/home/`. Each takes `lang` and reads its copy
from `content[lang].home` (typed by `HomeContent` in `ui.ts`). The home pages
([pages/index.astro](src/pages/index.astro) and
[pages/en/index.astro](src/pages/en/index.astro)) compose them in this order:

```
Hero             text + the 8×8 "transformation" grid
LogoMarquee      client logos, endless strip
AboutSplit       who we are + photo slot
ServicesPanel    #soluciones, horizontal accordion of four columns
CasesGallery     #casos, one case at a time
WhenAI           the blue field: "AI interprets, software executes"
MethodSteps      #metodo, five steps
SecuritySplit    photo slot + numbered list
SectorSwitcher   five sectors and a photo that changes
PostsCarousel    #recursos, eight cards, four in view
FaqAccordion     FaqList with the first question open
ContactForm      #contacto, posts to Web3Forms
```

The section ids are the same in both languages; the header links to them.

### 5.3 Notable component behaviours

- **Auto-advancing blocks** (`ServicesPanel`, `CasesGallery`,
  `SectorSwitcher`, `PostsCarousel`) share `home/autoplay.ts`: one interval
  per block, paused (not reset) while the pointer is inside, a segmented
  progress bar, and no auto-advance under `prefers-reduced-motion`. Each
  component only supplies a `pintar(i)` callback that toggles its own classes.
- **Hero grid**: 64 squares animated in CSS (`if-morph`). Their scatter
  offsets are computed at build time from the index, never `Math.random()`,
  so two builds give the same HTML.
- **WhenAI**: the dimming interaction is pure CSS with `:has()`. No script.
- **ServicesPanel** becomes a plain stacked list below 900 px.
  **MethodSteps** is five columns from 1100 px and one below: never 4+1.
- **Slides out of view are `inert`**, so keyboard focus never lands on a
  link that is not visible, while the HTML still carries every slide.
- **Reveal on scroll**: any `[data-reveal]` element fades up once, driven by
  `RevealOnScroll.astro`. The hidden state only applies when an inline script
  in `<head>` has confirmed `IntersectionObserver` exists.
- **FAQ**, one component for the whole site (`FaqList`): native
  `<details name>` so the browser closes the previously open one, JSON-LD
  `FAQPage`, an anchor per question, and an animated open via
  `::details-content`.
- **Header**: five text links (four are home anchors), language switch and
  the CTA. "Soluciones" and "Guías" keep a hover/focus dropdown fed by
  `footer.navGroups`. Below `lg` everything moves into a `<details>` panel.
- **Footer**: the three nav groups plus a "Company" column.
- **Photo slots**: the About photo, the Security photo and six of the eight
  resource cards have no image yet and render a flat gray `photo-slot`.

### 5.4 Landing pages

All landings are rendered by `LongFormPage.astro`: a left-aligned hero
(kicker, H1, lead, optional CTA and figures), a two-column body with a sticky
index and 2px rules between sections, the related posts, the FAQ and a
closing CTA under a black rule. Copy lives in `content[lang].pages.<page>` so
ES and EN stay in sync.

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

Tailwind v4 is CSS-first: this file **is** the config. The system comes from
the October 2026 design handoff (kept, unversioned, in `.private/design/`).
Editorial minimalism: one typeface, ink on very light gray, 2px rules, no
radii, no shadows, black-and-white photography and a single accent.

### 6.1 Tokens, `@theme { ... }`

The old token names were kept with new values, so existing classes
(`bg-bg`, `text-fg`, `text-muted`, `border-border`…) picked up the new look.

| Token | Value | Notes |
|---|---|---|
| `--color-bg` | `#f3f2f2` | page background |
| `--color-bg-soft` | `#eae9e9` | the `surface` of the design |
| `--color-fg` | `#201e1d` | ink |
| `--color-muted` | `#605d5d` | body text (5.8:1) |
| `--color-faint` | `#6e6a69` | meta and numbers. Darker than the `#7c7877` of the design, which fails WCAG AA at 3.9:1 |
| `--color-border`, `--color-border-soft` | `#c9c6c5` | every rule |
| `--color-accent` (+ `-100`…`-900`) | `#002dfd` | the only accent |
| `--color-neutral-200` | `#dcdad9` | pending photo slots |
| `--font-sans`, `--font-display`, `--font-mono` | Geist | one typeface; `font-mono` points at it too |
| `--radius-*` | `0` | the whole Tailwind scale is zeroed |
| `--shadow-*` | `none` | likewise |

Geist is self-hosted (`public/fonts/geist-latin.woff2`, variable, preloaded
in `BaseLayout`). It is not loaded from Google Fonts: that would block
render and send the IP of every visitor to a third party.

### 6.2 Utilities, `@utility name { ... }`

- Layout: `wrap` (1280px container with fluid side padding), `section-y`
  (vertical rhythm), `section-head` (H2 left, supporting paragraph right).
- Type: `t-display`, `t-poster`, `t-h2`, `t-h2-compact`, `t-h3-panel`,
  `t-h3-row`, `kicker` (alias `eyebrow`), `num`.
- Actions: `btn-primary` / `btn-primary-hover`, `btn-secondary`, `btn-icon`,
  `link-arrow` (alias `btn-ghost`), `link-quiet`, `link-inline`.
- Surfaces: `ruled-grid` (2px inner lines via gap over a rule-coloured
  background), `panel-float`, `photo-slot`, `bn` (grayscale), `sq` (the 10px
  accent square).
- Forms: `field`, `input`.
- Plain classes: `.progress` (carousel progress segment) and the
  `[data-reveal]` states.

### 6.3 Rules that are easy to break

1. Rules are **2px** (`border-t-2`…), never the 1px `border` of Tailwind.
2. The accent only goes on: kicker, primary CTA, arrow links, 10px squares,
   progress bars, the active row and the blue `WhenAI` field.
3. No radii, shadows, gradients or decorative icons. `rounded-full` is not a
   token and must not be used.
4. Photography is always grayscale. Nothing is centred, not even button
   labels.
5. Layout is fluid: `clamp()` and `repeat(auto-fit, minmax(min(100%, X), 1fr))`.
   A block that spans two columns needs explicit breakpoints instead.

### 6.4 Keyframes and accessibility

`if-up`, `if-marquee`, `if-wipe`, `if-morph` (with `@property --c` so a
colour can transition). `:focus-visible` paints a 2px accent outline, and
`prefers-reduced-motion` kills animations, transitions and auto-advance.

### 6.5 Long text and diagrams

`.prose` (blog posts and legal pages) is re-skinned in `global.css`: ink,
2px rules, 500-weight headings, grayscale images. The whiteboard diagrams
(`src/components/pizarra/`) were not redrawn: `Pizarra.astro` overrides
their radii, shadows and cool grays from the outside with CSS. The social
covers generated at build time (`scripts/og.mjs`) use the same palette and
Geist.

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
Used by the blog index card and the home resources carousel. When absent, a flat gray
placeholder is rendered.

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
3. **Use the design tokens and utilities** of section 6 before introducing
   a one-off colour. There are no shadows or radii to introduce.
4. **The accent is the primary action colour**, and it is the only colour.
   See 6.3 for the short list of places it may appear.
5. **No client-side JS framework.** Interactivity is vanilla `<script>`
   blocks inside `.astro` files (the home carousels, mobile menu via
   `<details>`, FAQ via `<details>`).
6. **Astro 5 Content Layer rendering**, always
   `const { Content } = await render(post)`, never `post.render()`.
7. **Marquee duplication**, when adding logos to `LogoMarquee`, the set is
   rendered twice and the duplicate is `aria-hidden="true"`.
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
- The Web3Forms key, in the `PUBLIC_WEB3FORMS_KEY` environment variable.
- LinkedIn URL (`https://www.linkedin.com/`) in
  [Footer.astro](src/components/Footer.astro).
- `public/og-default.png` for social sharing (referenced by
  `BaseLayout`).
- Real photos for the home page: the About photo (4:5), the Security photo
  (4:3) and six of the eight resource cards (3:2). They render as flat gray
  `photo-slot` blocks until the images arrive.

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
