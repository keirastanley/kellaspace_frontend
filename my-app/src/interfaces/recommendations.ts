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

export interface Recommendation {
  id: string;
  title: string;
  addedBy: string;
  mediaType: MediaType;
  dateAdded: string;
  link?: string;
  description?: string;
  completed: boolean;
  favourite: boolean;
  message?: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  search_id?: string | null;
  is_listen_notes?: boolean;
  is_tmdb?: boolean;
  is_youtube?: boolean;
  is_deezer?: boolean;
  is_google_books?: boolean;
}

export type RecommendationFormData = Pick<
  Recommendation,
  | "title"
  | "mediaType"
  | "link"
  | "description"
  | "message"
  | "tags"
  | "image"
  | "search_id"
>;

export type EditableStringFormDataFieldKey = keyof Pick<
  RecommendationFormData,
  "title" | "mediaType" | "link" | "description" | "message"
>;

export interface Podcast extends Recommendation {
  episodeTitle?: string;
  mediaType: MediaType.Podcast;
}

export interface Video extends Recommendation {
  channelName: string;
  mediaType: MediaType.Video;
}

export interface Film extends Recommendation {
  mediaType: MediaType.Movie;
}

export interface TVShow extends Recommendation {
  mediaType: MediaType.Movie;
  episodeTitle?: string;
}

// export interface Game extends Recommendation {
//   mediaType: MediaType.Game;
// }

// export interface Article extends Recommendation {
//   mediaType: MediaType.Article;
//   publication?: string;
// }
