import { Recommendation } from "./recommendations";

export interface List {
  id: string;
  title: string;
  createdBy: string;
  dateCreated: string;
  description?: string;
  notes?: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  contents?: Recommendation["id"][];
}

export interface ListForDisplay extends Omit<List, "contents"> {
  contents?: Recommendation[];
}
