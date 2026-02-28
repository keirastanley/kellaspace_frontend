import { useFormContext } from "react-hook-form";
import {
  MediaType,
  RecommendationFormData,
  SearchResult,
} from "../../../../../interfaces";
import { useEffect } from "react";
import {
  searchForMovie,
  searchForTv,
  searchForPodcast,
  searchForMusic,
  searchForBook,
} from "../../CreateForm/utils/api";

export const useSearch = ({
  query,
  searchMusicBy,
  setSearchResults,
}: {
  query?: string;
  searchMusicBy: "track" | "album" | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}) => {
  const { watch } = useFormContext<RecommendationFormData>();

  const formValues = watch();

  useEffect(() => {
    if (query && formValues?.mediaType) {
      if (formValues.mediaType === MediaType.Movie) {
        searchForMovie(query, (results) => setSearchResults(results));
      }
      if (formValues.mediaType === MediaType.TVShow) {
        searchForTv(query, (results) => setSearchResults(results));
      }
      if (formValues.mediaType === MediaType.Podcast) {
        searchForPodcast({
          query: query,
          mediaType: "podcast",
          onSuccess: (results) => setSearchResults(results),
        });
      }
      if (formValues.mediaType === MediaType.Music && searchMusicBy) {
        searchForMusic({
          query: query,
          type: searchMusicBy,
          onSuccess: (results) => setSearchResults(results),
        });
      }
      if (formValues.mediaType === MediaType.Book) {
        searchForBook({
          query: query,
          onSuccess: (results) => setSearchResults(results),
        });
      }
    }
  }, [query, formValues?.mediaType]);
};
