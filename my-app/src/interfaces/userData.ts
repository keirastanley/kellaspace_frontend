import { List } from "./lists";
import { Recommendation } from "./recommendations";

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
