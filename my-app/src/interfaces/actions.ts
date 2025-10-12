import { MediaType } from "./recommendations";

export enum HomeAction {
  Sort = "Sort",
  Filter = "Filter",
}

export enum ListAction {
  Sort = "Sort",
  Filter = "Filter",
  Edit = "Edit",
  Delete = "Delete",
}

export enum FavouritesAction {
  Sort = "Sort",
  Filter = "Filter",
  Edit = "Edit",
}

export enum EditAction {
  Save = "Save",
  Cancel = "Cancel",
}

export enum SortingType {
  titleAscending = "Title ↑",
  titleDescending = "Title ↓",
  dateAddedAscending = "Date added ↑",
  dateAddedDescending = "Date added ↓",
}

export const actionsPresent: Record<MediaType, string> = {
  [MediaType.Article]: "read",
  [MediaType.Book]: "read",
  [MediaType.Game]: "play",
  [MediaType.Movie]: "watch",
  [MediaType.Music]: "listen",
  [MediaType.Podcast]: "listen",
  [MediaType.TVShow]: "watch",
  [MediaType.Video]: "watch",
};

export const actionsPast: Record<MediaType, string> = {
  [MediaType.Article]: actionsPresent.Article,
  [MediaType.Book]: actionsPresent.Article,
  [MediaType.Game]: `${actionsPresent.Game}ed`,
  [MediaType.Movie]: `${actionsPresent.Movie}ed`,
  [MediaType.Music]: `${actionsPresent.Music}ed`,
  [MediaType.Podcast]: `${actionsPresent.Podcast}ed`,
  [MediaType.TVShow]: `${actionsPresent["TV show"]}ed`,
  [MediaType.Video]: `${actionsPresent.Video}ed`,
};
