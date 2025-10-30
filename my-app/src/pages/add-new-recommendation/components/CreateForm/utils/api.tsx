import { SearchResult } from "../../../../../interfaces";

const origin =
  window.location.origin === "http://localhost:5173"
    ? "http://localhost:4000"
    : "https://kellaspace-backend.onrender.com";
const baseUrl = `${origin}/api/search`;

const searchForMovieOrTv = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "movie" | "tv";
  onSuccess: (results: SearchResult[]) => void;
}) => {
  const url = `${baseUrl}/${mediaType}?query=${query}`;
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
      onSuccess(results);
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

export const searchForPodcast = async ({
  query,
  mediaType,
  onSuccess,
}: {
  query: string;
  mediaType: "podcast" | "episode";
  onSuccess: (results: SearchResult[]) => void;
}) => {
  const url = `${baseUrl}/${mediaType}?query=${query}`;
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
      onSuccess(results);
    })
    .catch((err) => console.error(err));
};

export const searchForVideo = async ({
  videoId,
  onSuccess,
}: {
  videoId: string;
  onSuccess: (results: SearchResult) => void;
}) => {
  const url = `${baseUrl}/api/search/video?video_id=${videoId}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const result: SearchResult = data.payload;
      onSuccess(result);
    })
    .catch((err) => console.error(err));
};

export const searchForMusic = async ({
  query,
  onSuccess,
}: {
  query: string;
  onSuccess: (results: SearchResult[]) => void;
}) => {
  const url = `${baseUrl}/music?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const result: SearchResult[] = data.payload;
      onSuccess(result);
    })
    .catch((err) => console.error(err));
};

export const searchForBook = async ({
  query,
  onSuccess,
}: {
  query: string;
  onSuccess: (results: SearchResult[]) => void;
}) => {
  const url = `${baseUrl}/book?query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const result: SearchResult[] = data.payload;
      onSuccess(result);
    })
    .catch((err) => console.error(err));
};
