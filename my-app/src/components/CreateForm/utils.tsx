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
  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDQyMDY0YzYxNzdjMWQyNWJhMzg0ODVjYTg1MjNjMSIsIm5iZiI6MTc2MDM4NDAwOS45NDksInN1YiI6IjY4ZWQ1NDA5Nzk2MTVhZjVlNGE3MmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpVbPaW7mdpnHidopff9joGVfzdb2jOqPRfnffp9aQg",
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
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDQyMDY0YzYxNzdjMWQyNWJhMzg0ODVjYTg1MjNjMSIsIm5iZiI6MTc2MDM4NDAwOS45NDksInN1YiI6IjY4ZWQ1NDA5Nzk2MTVhZjVlNGE3MmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpVbPaW7mdpnHidopff9joGVfzdb2jOqPRfnffp9aQg",
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error(err));
};
