import { defineCollection, z } from 'astro:content';

const notebooksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string()
  })
});

export const collections = {
  'notebooks': notebooksCollection
}; 