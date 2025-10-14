import { SearchResult } from "./CreateForm";

const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const api_key = import.meta.env.VITE_API_KEY;

console.log(token);
const searchForMovieOrTv = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "movie" | "tv";
  onSuccess: (results: SearchResult[]) => void;
}) => {
  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${api_key}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const results: SearchResult[] = data.results;
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
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=en?api_key=${api_key}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error(err));
};
