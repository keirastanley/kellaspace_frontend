import z from "zod";
import { recommendationSchema } from "./recommendations";

export const listSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdBy: z.string(),
  dateCreated: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  contents: z.array(recommendationSchema).optional(),
});

export type List = z.infer<typeof listSchema>;

export type EditableStringListKey = keyof Pick<List, "description">;
