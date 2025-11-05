import z from "zod";
import { searchResultSchema } from "./search";

export enum MediaType {
  Movie = "Movie",
  TVShow = "TV show",
  Music = "Music",
  Book = "Book",
  Video = "Video",
  Podcast = "Podcast",
  // Game = "Game",
  // Article = "Article",
}

export const sourceEnum = z.enum([
  "tmdb",
  "deezer",
  "listen_notes",
  "google_books",
  "youtube",
]);

export const recommendationFormDataSchema = searchResultSchema.extend({
  mediaType: z.enum(MediaType),
  message: z.string().optional(),
  tags: z.array(z.string()).optional(),
  link: z.string().optional(),
});

export type RecommendationFormData = z.infer<
  typeof recommendationFormDataSchema
>;
