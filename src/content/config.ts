import { defineCollection, z } from "astro:content";

const published = defineCollection({
  schema: z.object({
    kind: z.enum(["article", "note"]).default("note"),
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    tags: z.string().array().default([]),
    list: z.boolean().default(true),
  }),
});

export const collections = { published };
