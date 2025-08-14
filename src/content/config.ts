import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
    layout: z.string().optional(), // por si lo quieres en el frontmatter
  }),
});

export const collections = { productos };