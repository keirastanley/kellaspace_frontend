import {
  isMovieOrTvSearchResult,
  isMusicResult,
  isPodcastResult,
  isVideoResult,
  SearchResult,
} from "../../../interfaces/search";

const formatTitle = (titleName: string, titleYear?: string) =>
  `${titleName} ${titleYear ? `(${titleYear.slice(0, 4)})` : ""}`;

const getTitleName = (selectedResult: SearchResult) => {
  if (isMovieOrTvSearchResult(selectedResult)) {
    return selectedResult.title ?? selectedResult.name ?? "";
  }
  if (isPodcastResult(selectedResult)) {
    return selectedResult.title_original ?? "";
  }
  if (isVideoResult(selectedResult)) {
    return selectedResult.snippet.title;
  }
  if (isMusicResult(selectedResult)) {
    return selectedResult.title;
  }
  return (
    selectedResult.volumeInfo.title +
    (selectedResult.volumeInfo.authors
      ? ` by ${selectedResult.volumeInfo.authors.join(", ")}`
      : undefined)
  );
};

const getTitleDate = (selectedResult: SearchResult) => {
  if (isMovieOrTvSearchResult(selectedResult)) {
    return (selectedResult.release_date || selectedResult.first_air_date) ?? "";
  }
  if (isPodcastResult(selectedResult)) {
    return new Date(selectedResult.earliest_pub_date_ms).toISOString();
  }
  // if (isVideoResult(selectedResult)) {
  //   return selectedResult.snippet.publishedAt;
  // }
  // Book years are unreliable
  // Music years are not available
  // Video years are not needed
  return "";
};

export const getTitle = (selectedResult: SearchResult) => {
  const titleName = getTitleName(selectedResult);
  const titleYear = getTitleDate(selectedResult);
  return formatTitle(titleName, titleYear);
};

const getImageSrc = (selectedResult: SearchResult) => {
  if (isMovieOrTvSearchResult(selectedResult)) {
    return `https://image.tmdb.org/t/p/w342${selectedResult.poster_path}`;
  }
  if (isPodcastResult(selectedResult)) {
    return selectedResult.image;
  }
  if (isVideoResult(selectedResult)) {
    return selectedResult.snippet.thumbnails.high.url;
  }
  if (isMusicResult(selectedResult)) {
    return selectedResult.album.cover_big;
  }
  return selectedResult.volumeInfo.imageLinks
    ? selectedResult.volumeInfo.imageLinks.thumbnail
    : "";
};

export const getImage = (selectedResult: SearchResult) => {
  return {
    src: getImageSrc(selectedResult),
    alt: getTitleName(selectedResult),
  };
};

export const getDescription = (selectedResult: SearchResult) => {
  if (isMovieOrTvSearchResult(selectedResult)) {
    return selectedResult.overview;
  }
  if (isPodcastResult(selectedResult)) {
    return selectedResult.description_original;
  }
  if (isVideoResult(selectedResult)) {
    return selectedResult.snippet.description;
  }
  if (isMusicResult(selectedResult)) {
    return "";
  }
  return selectedResult.volumeInfo.description;
};

export const getYouTubeId = (link: string) => {
  const linkSplitArr = link.split("/");
  return linkSplitArr[linkSplitArr.length - 1]
    ?.replace("watch?v=", "")
    .replace("http", "https")
    .replace(new RegExp("\\?si=(.*)"), "");
};
