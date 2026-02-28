/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { ConditionalFieldWrapper } from "../../../../components";
import {
  MediaType,
  RecommendationFormData,
  SearchResult,
} from "../../../../interfaces";
import { ComboboxFormField } from "./ComboboxFormField";
import { useState } from "react";
import { useDebounce } from "../../../../hooks";
import { useFormContext } from "react-hook-form";
import { ProgressiveDisclosure } from "../CreateForm/ProgressiveDisclosure";
import { TitleDisplay } from "./TitleDisplay";
import { LoadingWrapper } from "./LoadingWrapper";
import { MusicTypeRadioGroup } from "./MusicTypeRadioGroup";
import { VideoSection } from "./VideoSection";
import { useSearch } from "./hooks/useSearch";
import { useUpdateFormData } from "./hooks/useUpdateFormData";

export const TitleSection = () => {
  const [query, setQuery] = useState<string>();
  const [searchMusicBy, setSearchMusicBy] = useState<"track" | "album">();
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const { watch } = useFormContext<RecommendationFormData>();
  const debouncedQuery = useDebounce(query, 1000);

  const getLabel = () => {
    if (watch("mediaType") === MediaType.Movie) {
      return "Movie title";
    }
    if (watch("mediaType") === MediaType.Book) {
      return "Book title";
    }
    if (watch("mediaType") === MediaType.Podcast) {
      return "Podcast title";
    }
    if (watch("mediaType") === MediaType.TVShow) {
      return "TV show title";
    }
    if (searchMusicBy === "album") {
      return "Album title";
    }
    return "Track title";
  };

  useSearch({ query: debouncedQuery, searchMusicBy, setSearchResults });
  useUpdateFormData({ selectedResult });

  return (
    <ProgressiveDisclosure prevField="mediaType">
      {watch("mediaType") === MediaType.Video ? (
        <ConditionalFieldWrapper>
          <VideoSection setSelectedResult={setSelectedResult} />
        </ConditionalFieldWrapper>
      ) : (
        <LoadingWrapper>
          {selectedResult ? (
            <TitleDisplay />
          ) : (
            <>
              <ProgressiveDisclosure
                condition={watch("mediaType") === MediaType.Music}
              >
                {watch("mediaType") === MediaType.Music && (
                  <MusicTypeRadioGroup
                    searchMusicBy={searchMusicBy}
                    setSearchMusicBy={setSearchMusicBy}
                  />
                )}
              </ProgressiveDisclosure>
              <ProgressiveDisclosure
                condition={
                  watch("mediaType") === MediaType.Music
                    ? !!searchMusicBy
                    : true
                }
              >
                <ComboboxFormField
                  label={getLabel()}
                  value={selectedResult ?? undefined}
                  onChange={setSelectedResult}
                  searchResults={searchResults}
                  setQuery={setQuery}
                />
              </ProgressiveDisclosure>
            </>
          )}
        </LoadingWrapper>
      )}
    </ProgressiveDisclosure>
  );
};
