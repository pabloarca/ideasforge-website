import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Astro 5 Content Layer API. Posts live in src/content/blog/<lang>/*.md, so each
  entry id looks like "es/my-post" or "en/my-post". We filter by the `lang`
  field and link translations together with a shared `translationId`.
*/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Titulo para la pestana del navegador y el resultado de busqueda, cuando
    // el H1 es mas largo de lo que Google llega a mostrar (unos 60 caracteres).
    // Si falta, se usa `title`.
    metaTitle: z.string().optional(),
    description: z.string(),
    lang: z.enum(['es', 'en']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Same value across an ES post and its EN translation. Powers the
    // language switcher + hreflang on blog posts.
    translationId: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Path inside /public, used as the card thumbnail on the blog index/preview.
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
