import { SearchResult } from "./CreateForm";

const searchForMovieOrTv = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "movie" | "tv";
  onSuccess: (results: SearchResult[]) => void;
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
      const results: SearchResult[] = data.payload;
      const filteredResults = results.filter(
        (result) => result.poster_path && result.popularity > 1
      );
      onSuccess(filteredResults);
    })
    .catch((err) => console.error(err));
};

export const searchForMovie = (
  query: string,
  onSuccess: (results: SearchResult[]) => void
) => searchForMovieOrTv({ query, mediaType: "movie", onSuccess });

export const searchForTv = (
  query: string,
  onSuccess: (results: SearchResult[]) => void
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
