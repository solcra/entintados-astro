import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number(),
    rutaUrl: z.string(),
    titleSeo: z.string(),
    descripcionSeo: z.string(),
    layout: z.string().optional(), // por si lo quieres en el frontmatter
  }),
});

export const collections = { productos };