import z from "zod";

export const searchResultSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  search_id: z.union([z.string(), z.number(), z.null()]),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
