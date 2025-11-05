import z from "zod";
import { List, listSchema } from "./lists";
import { Recommendation, recommendationSchema } from "./recommendations";

export const userSchema = z.object({
  sub: z.string(),
  display_name: z.string().optional(),
  recommendations: z.array(recommendationSchema).optional(),
  lists: z.array(listSchema).optional(),
});

export type User = z.infer<typeof userSchema>;

export interface UserData {
  _id: string;
  recommendations?: Recommendation[];
  lists?: List[];
  name?: string;
  given_name?: string;
  family_name?: string;
  nickname?: string;
  picture?: string;
  email_verified?: boolean;
  sub?: string;
  email?: string;
}
