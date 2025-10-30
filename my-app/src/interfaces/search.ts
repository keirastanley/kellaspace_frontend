import { Recommendation } from "./recommendations";

export type SearchResult = Pick<
  Recommendation,
  | "title"
  | "mediaType"
  | "description"
  | "tags"
  | "image"
  | "is_listen_notes"
  | "is_deezer"
  | "is_google_books"
  | "is_tmdb"
  | "is_youtube"
> &
  Pick<Required<Recommendation>, "search_id">;

export type MovieOrTvSearchResult = SearchResult & { is_tmdb: true };
export type PodcastSearchResult = SearchResult & { is_listen_notes: true };
export type VideoSearchResult = SearchResult & { is_youtube: true };
export type BookSearchResult = SearchResult & { is_google_books: true };
export type MusicSearchResult = SearchResult & { is_deezer: true };

export type UnknownSearchResult = (
  | MovieOrTvSearchResult
  | PodcastSearchResult
  | VideoSearchResult
  | BookSearchResult
  | MusicSearchResult
) & {
  is_listen_notes?: boolean;
  is_tmdb?: boolean;
  is_youtube?: boolean;
  is_deezer?: boolean;
};

export const isMovieOrTvSearchResult = (
  searchResult: UnknownSearchResult
): searchResult is MovieOrTvSearchResult => !!searchResult.is_tmdb === true;

export const isPodcastResult = (
  searchResult: UnknownSearchResult
): searchResult is PodcastSearchResult => !!searchResult.is_listen_notes;

export const isVideoResult = (
  searchResult: UnknownSearchResult
): searchResult is VideoSearchResult => !!searchResult.is_youtube;

export const isMusicResult = (
  searchResult: UnknownSearchResult
): searchResult is MusicSearchResult => !!searchResult.is_deezer;
