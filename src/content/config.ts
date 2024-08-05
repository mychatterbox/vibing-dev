import { defineCollection, z } from "astro:content";

const published = defineCollection({
  schema: z.object({
    kind: z.enum(["article", "note"]).default("article"),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // tags: z.array(z.string()).default(["others"]),
    list: z.boolean().default(true),
    featured: z.boolean().optional(),
    pubDatetime: z.date().optional().nullable(),
  }),
});

export const collections = { published };
