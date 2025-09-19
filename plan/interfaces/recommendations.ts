enum MediaType {
  Podcast = "podcast",
  Video = "video",
  Film = "film",
  TVShow = "tv-show",
  Music = "music",
  Game = "game",
  Article = "article",
}

export interface Recommendation {
  title: string;
  mediaType: MediaType;
  link: string;
  description: string;
  notes: string;
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
  mediaType: MediaType.Film;
}

export interface TVShow extends Recommendation {
  mediaType: MediaType.Film;
  episodeTitle?: string;
}

export interface Game extends Recommendation {
  mediaType: MediaType.Game;
}

export interface Article extends Recommendation {
  mediaType: MediaType.Article;
  publication?: string;
}
