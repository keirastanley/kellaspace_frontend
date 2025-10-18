import {
  isMovieOrTvSearchResult,
  isPodcastResult,
  SearchResult,
} from "../../../interfaces/search";

export const getTitle = (selectedResult: SearchResult) => {
  let titleName = "";
  let titleYear = "";
  if (isMovieOrTvSearchResult(selectedResult)) {
    titleName = selectedResult.title ?? selectedResult.name ?? "";
    titleYear =
      (selectedResult.release_date || selectedResult.first_air_date) ?? "";
  } else {
    if (isPodcastResult(selectedResult)) {
      titleName = selectedResult.title_original ?? "";
      titleYear = new Date(selectedResult.earliest_pub_date_ms).toISOString();
    } else {
      titleName = selectedResult.snippet.title;
      titleYear = selectedResult.snippet.publishedAt;
    }
  }

  return `${titleName} (${titleYear.slice(0, 4)})`;
};

export const getImage = (selectedResult: SearchResult) => {
  let src = "";
  let alt = "";
  if (isMovieOrTvSearchResult(selectedResult)) {
    src = `https://image.tmdb.org/t/p/w342${selectedResult.poster_path}`;
    alt = selectedResult.title ?? selectedResult.name ?? "";
  } else {
    if (isPodcastResult(selectedResult)) {
      src = selectedResult.image;
      alt = selectedResult.title_original;
    } else {
      console.log("here");
      src = selectedResult.snippet.thumbnails.high.url;
      alt = selectedResult.snippet.title;
    }
  }

  return {
    src,
    alt,
  };
};

export const getDescription = (selectedResult: SearchResult) => {
  if (isMovieOrTvSearchResult(selectedResult)) {
    return selectedResult.overview;
  }
  if (isPodcastResult(selectedResult)) {
    return selectedResult.description_original;
  }
  return selectedResult.snippet.description;
};

export const getYouTubeId = (link: string) => {
  const linkSplitArr = link.split("/");
  return linkSplitArr[linkSplitArr.length - 1]
    ?.replace("watch?v=", "")
    .replace("http", "https")
    .replace(new RegExp("\\?si=(.*)"), "");
};
