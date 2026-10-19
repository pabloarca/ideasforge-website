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
    /*
      Autor. Opcional y casi siempre ausente: hoy escribe una sola persona y su
      nombre vive en `src/lib/empresa.ts`, que es la fuente única que también
      firma la política de privacidad. El campo existe desde el 14 sep 2026 para
      que una firma invitada no obligue a tocar la plantilla, y quien lo rellene
      cambia la firma visible Y el `author` del JSON-LD a la vez, que es donde
      se separan los dos cuando alguien lo hace a mano.
    */
    author: z.string().optional(),
    draft: z.boolean().default(false),
    // Path inside /public, used as the card thumbnail on the blog index/preview.
    heroImage: z.string().optional(),
    /*
      Preguntas frecuentes de la entrada (5 oct 2026). Se pintan al final con
      la misma pieza que las guías y los servicios (`FaqList`), que además
      publica el FAQPage. Van en el frontmatter y no en el markdown porque esa
      pieza recibe pares pregunta-respuesta: escritas como titulares del
      cuerpo saldrían como una sección más, sin acordeón y sin schema.
      Texto plano, como en ui.ts: ni negritas ni enlaces.
    */
    faq: z
      .array(z.object({ q: z.string(), a: z.union([z.string(), z.array(z.string())]) }))
      .optional(),
  }),
});

export const collections = { blog };
