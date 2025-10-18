import {
  MovieOrTvSearchResult,
  PodcastSearchResult,
  VideoSearchResult,
} from "../../../interfaces/search";

const searchForMovieOrTv = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "movie" | "tv";
  onSuccess: (results: MovieOrTvSearchResult[]) => void;
}) => {
  const url = `https://kellaspace-backend.onrender.com/api/tmdb/search/${mediaType}?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const results: MovieOrTvSearchResult[] = data.payload;
      const filteredResults = results.filter(
        (result) => result.poster_path && result.popularity > 1
      );
      onSuccess(filteredResults);
    })
    .catch((err) => console.error(err));
};

export const searchForMovie = (
  query: string,
  onSuccess: (results: MovieOrTvSearchResult[]) => void
) => searchForMovieOrTv({ query, mediaType: "movie", onSuccess });

export const searchForTv = (
  query: string,
  onSuccess: (results: MovieOrTvSearchResult[]) => void
) => searchForMovieOrTv({ query, mediaType: "tv", onSuccess });

export const getGenres = async () => {
  const url = "https://kellaspace-backend.onrender.com/api/tmdb/genres";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error(err));
};

export const searchForPodcast = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "podcast" | "episode";
  onSuccess: (results: PodcastSearchResult[]) => void;
}) => {
  const url = `http://localhost:4000/api/search/${mediaType}?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const results: PodcastSearchResult[] = data.payload;
      onSuccess(results);
    })
    .catch((err) => console.error(err));
};

export const searchForVideo = async ({
  videoId,
  onSuccess,
}: {
  videoId: string;
  onSuccess: (results: VideoSearchResult) => void;
}) => {
  const url = `http://localhost:4000/api/search/video?video_id=${videoId}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const result: VideoSearchResult = data.payload;
      onSuccess(result);
    })
    .catch((err) => console.error(err));
};
