import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    publishedAt: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = { blog };
