---
name: new-blog-post
description: Create a new bilingual blog post (ES + EN) in this Astro site, following the content-collection schema and linking translations.
---

# New blog post

Adds a new bilingual entry to the Ideasforge blog. Writes two `.md` files in
`src/content/blog/es/` and `src/content/blog/en/` with a shared `translationId`
so the language switcher and hreflang link them automatically.

## IMPORTANT: editorial rules

The body copy of any post MUST follow the `redactar` skill workflow: read
`.private/base-editorial.md` first (facts bank, style rules, keyword map),
use only VERIFICADO facts, and self-check against its acceptance criteria
before showing a draft. Section 12 of that document is the piece method:
every post names ONE concept (and registers it), opens with experience
before theory, improves one concrete reader decision, closes with a
callback plus a take-away question, and links 2-3 sibling pieces anchored
on their concept names. Bold is for complete thesis sentences only, and
scanning just the bold lines must tell the whole argument. `.private/PENDIENTES.md` (section 9) holds the
writing queue, with the verified facts backing each piece and the service page
it supports; prefer those when the user has no specific topic.

## Schema reference

Posts are validated by the Zod schema in
[src/content.config.ts](src/content.config.ts). Required frontmatter fields:

- `title: string`
- `description: string`
- `lang: 'es' | 'en'`, MUST match the folder.
- `pubDate: YYYY-MM-DD`
- `translationId: string`, MUST be identical across the ES and EN pair.
- `tags: string[]`, defaults to `[]`.
- `draft: boolean`, defaults to `false`.
- `heroImage?: string`, optional, served from `/public/...`. When absent, blog
  cards show a lavender gradient placeholder.

## What to ask the user

If the user did not supply something via the `args`, ask for it. Keep the
exchange tight, one prompt with all missing fields, not one question per
field. Always confirm the final plan before writing.

1. **slug**, kebab-case, no leading slash. Used as the filename for both
   languages. Example: `agentes-rag-pyme`.
2. **title** in ES and EN.
3. **description** in ES and EN, one or two sentences, used for `<meta>` and
   the card preview.
4. **tags**, 1-5 short strings. Spanish tags in the ES file, English ones in
   the EN file (e.g. `['Agentes', 'RAG']` vs `['Agents', 'RAG']`).
5. **heroImage**, one of:
   - A path already under `/public/` (e.g. `/blog/foo.jpg`),
   - A URL to download, offer to `curl` it into `public/blog/<slug>.<ext>`,
   - `none` (use the gradient placeholder).
6. **pubDate**, default to today if not given.
7. **draft?**, default `false`.
8. **body**, markdown body for ES and EN. If the user gives only one
   language, ask whether to translate or wait.

## Conventions to enforce

- `translationId` is the same string in both files. If the user does not
  specify one, use the slug.
- Wrap `title` and `description` in **single quotes** in the frontmatter (the
  existing posts use this style; it avoids YAML-escaping apostrophes inside).
- `pubDate` is a bare date, not a string: `pubDate: 2026-06-26`.
- `tags` is a YAML array: `tags: ['One', 'Two']`.
- `heroImage` is a root-relative path under `/public/`, written as a string.
- Translate well, not literally. Match tone with existing posts in
  [src/content/blog/](src/content/blog/), they're conversational and concise.

## Steps to execute

1. **Check the slug is free.** Glob `src/content/blog/{es,en}/<slug>.md`. If
   either exists, stop and ask the user for a different slug (or an explicit
   overwrite confirmation).
2. **Handle the hero image:**
   - If a URL: `curl -sL "$url" -o "public/blog/<slug>.<ext>"` (pick `.jpg`,
     `.png`, or `.webp` from the URL).
   - If a local path: verify the file exists under `public/`.
   - If `none`: leave `heroImage` out of the frontmatter.
3. **Write both files.** Use the template below. Replace placeholders
   carefully, do NOT re-order fields or change quoting style.
4. **Report.** Output the two file paths created + a one-line summary of what
   the user can do next (preview at `/blog/<slug>`, EN at `/en/blog/<slug>`).

## File template

ES, `src/content/blog/es/<slug>.md`:

```markdown
---
title: 'TÍTULO ES'
description: 'DESCRIPCIÓN ES'
lang: 'es'
pubDate: YYYY-MM-DD
translationId: 'TRANSLATION_ID'
tags: ['Tag1', 'Tag2']
heroImage: '/blog/<slug>.jpg'
---

# Cuerpo en español

Markdown del post.
```

EN, `src/content/blog/en/<slug>.md`:

```markdown
---
title: 'TITLE EN'
description: 'DESCRIPTION EN'
lang: 'en'
pubDate: YYYY-MM-DD
translationId: 'TRANSLATION_ID'
tags: ['Tag1', 'Tag2']
heroImage: '/blog/<slug>.jpg'
---

# Body in English

Post markdown.
```

Omit the `heroImage` line entirely if the user picked `none`. Omit the `draft`
line unless the user wants a draft (`draft: true`).

## Useful context about the site

- The blog index ([src/pages/blog/index.astro](src/pages/blog/index.astro))
  lists all non-draft posts in `pubDate` desc order.
- The homepage `BlogPreview`
  ([src/components/BlogPreview.astro](src/components/BlogPreview.astro)) shows
  the 4 most recent, a new post can knock an older one out of the homepage
  carousel.
- Existing posts show good style examples for tone and structure:
  [src/content/blog/es/](src/content/blog/es/),
  [src/content/blog/en/](src/content/blog/en/).

## Args grammar (optional)

If the user types `/new-blog-post foo` interpret `foo` as the slug. Anything
beyond that triggers the interactive flow with the slug pre-filled. The skill
should never silently invent fields, confirm before writing.
