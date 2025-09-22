export enum MediaType {
  Book = "Book",
  Podcast = "Podcast",
  Video = "Video",
  Movie = "Movie",
  TVShow = "TV show",
  Music = "Music",
  Game = "Game",
  Article = "Article",
}

export interface Recommendation {
  id: string;
  title: string;
  addedBy: string;
  mediaType: MediaType;
  dateAdded: string;
  link?: string;
  description: string;
  completed: boolean;
  notes?: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
}

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

export interface Game extends Recommendation {
  mediaType: MediaType.Game;
}

export interface Article extends Recommendation {
  mediaType: MediaType.Article;
  publication?: string;
}
