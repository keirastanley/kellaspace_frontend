import z from "zod";
import {
  RecommendationFormData,
  recommendationFormDataSchema,
} from "./recommendationFormData";

export const recommendationSchema = recommendationFormDataSchema.extend({
  id: z.string(),
  addedBy: z.string(),
  dateAdded: z.string(),
  link: z.string().optional(),
  completed: z.boolean(),
  favourite: z.boolean(),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

export type EditableStringFormDataFieldKey = keyof Pick<
  RecommendationFormData,
  "title" | "mediaType" | "link" | "description" | "message"
>;
