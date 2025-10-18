/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { MediaTypeRadioGroup } from "./MediaTypeRadioGroup";
import { useFormData } from "../../providers/FormDataProvider";
import { MediaType, RecommendationFormData } from "../../interfaces";
import { AdditionalFields } from "./AdditionalFields";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionalFieldWrapper } from "../ConditionalFieldWrapper";
import { useDebounce } from "../../hooks/useDebounce";
import { Image } from "../Image";
import { ComboboxFormField } from "./ComboboxFormField";
import {
  getGenres,
  searchForBook,
  searchForMovie,
  searchForMusic,
  searchForPodcast,
  searchForTv,
  searchForVideo,
} from "./utils/api";
import { isMovieOrTvSearchResult, SearchResult } from "../../interfaces/search";
import {
  getDescription,
  getImage,
  getTitle,
  getYouTubeId,
} from "./utils/utils";
import { parseHtmlToReact } from "../../utils/utils";
import { TextInput } from "../TextInput";

export const CreateForm = ({
  onSubmit,
}: {
  onSubmit: (formData: RecommendationFormData) => void;
}) => {
  const { isValid, formValues, setFormValues } = useFormData();
  const [query, setQuery] = useState<string>();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [videoLink, setVideoLink] = useState<string>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formValues as RecommendationFormData);
    }
  };
  const MAX_DESCRIPTION_DISPLAY_LENGTH = 250;
  const descriptionDisplayValue = useMemo(() => {
    return formValues.description &&
      formValues.description.length > MAX_DESCRIPTION_DISPLAY_LENGTH
      ? `${formValues.description.slice(0, MAX_DESCRIPTION_DISPLAY_LENGTH)}...`
      : formValues.description;
  }, [formValues]);
  const debouncedMediaType = useDebounce(formValues.mediaType, 500);
  const debouncedTitle = useDebounce(formValues.title, 500);
  const debouncedDescription = useDebounce(descriptionDisplayValue, 800);
  const showAddButton = useDebounce(
    !!(debouncedMediaType && debouncedTitle && debouncedDescription && isValid),
    800
  );
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery && formValues.mediaType) {
      if (formValues.mediaType === MediaType.Movie) {
        searchForMovie(debouncedQuery, (results) =>
          setSearchResults(
            results.map((result) => ({ ...result, is_tmdb: true }))
          )
        );
      }
      if (formValues.mediaType === MediaType.TVShow) {
        searchForTv(debouncedQuery, (results) =>
          setSearchResults(
            results.map((result) => ({ ...result, is_tmdb: true }))
          )
        );
      }
      if (formValues.mediaType === MediaType.Podcast) {
        searchForPodcast({
          query: debouncedQuery,
          mediaType: "podcast",
          onSuccess: (results) =>
            setSearchResults(
              results.map((result) => ({ ...result, is_listen_notes: true }))
            ),
        });
      }
      if (formValues.mediaType === MediaType.Music) {
        searchForMusic({
          query: debouncedQuery,
          onSuccess: (results) =>
            setSearchResults(
              results.map((result) => ({ ...result, is_deezer: true }))
            ),
        });
      }
      if (formValues.mediaType === MediaType.Book) {
        searchForBook({
          query: debouncedQuery,
          onSuccess: (results) =>
            setSearchResults(results.map((result) => ({ ...result }))),
        });
      }
    }
  }, [debouncedQuery, formValues.mediaType]);

  useEffect(() => {
    if (selectedResult) {
      setFormValues((prevFormValues) => {
        return {
          ...prevFormValues,
          title: getTitle(selectedResult),
          image: getImage(selectedResult),
          description: getDescription(selectedResult),
          search_id: String(selectedResult.id),
        };
      });
      if (isMovieOrTvSearchResult(selectedResult)) {
        getGenres().then(({ genres }) => {
          for (const { id, name } of genres) {
            setFormValues((prevFormValues) => {
              if (selectedResult.genre_ids.includes(id)) {
                if (prevFormValues.tags) {
                  return {
                    ...prevFormValues,
                    tags: [...prevFormValues.tags, name],
                  };
                }
                return {
                  ...prevFormValues,
                  tags: [name],
                };
              }
              return prevFormValues;
            });
          }
        });
      }
    }
  }, [selectedResult]);

  const reset = () => {
    setSearchResults([]);
    setSelectedResult(null);
    setFormValues({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <h1 id="form-title">Add something new</h1>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: calc(100% - 10px);
        `}
      >
        <AnimatePresence>
          <ConditionalFieldWrapper>
            <MediaTypeRadioGroup reset={reset} />
          </ConditionalFieldWrapper>
        </AnimatePresence>
        {debouncedMediaType && debouncedMediaType !== MediaType.Video && (
          <AnimatePresence>
            {selectedResult ? (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 5px;
                  font-size: 14px;
                `}
              >
                <h2>Title</h2>
                <p>{formValues.title}</p>
                <Image
                  src={formValues.image?.src}
                  style={{
                    width: "120px",
                    height: "180px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            ) : (
              <ComboboxFormField
                label="Title"
                value={selectedResult ?? undefined}
                onChange={setSelectedResult}
                searchResults={searchResults}
                setQuery={setQuery}
              />
            )}
          </AnimatePresence>
        )}
        {debouncedMediaType && debouncedMediaType === MediaType.Video && (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: calc(100% - 20px);
              box-sizing: border-box;
              font-size: 16px;
            `}
          >
            <label htmlFor="youtube-link">Paste a YouTube link below</label>
            <TextInput
              type="url"
              id="youtube-link"
              name="youtube-link"
              placeholder="www.youtube.com/"
              onChange={(e) => setVideoLink(e.target.value)}
              required
              aria-required="true"
            />
            <button
              onClick={() =>
                videoLink &&
                searchForVideo({
                  videoId: getYouTubeId(videoLink),
                  onSuccess: (result) =>
                    setSelectedResult({ ...result, is_youtube: true }),
                })
              }
            >
              Add
            </button>
          </div>
        )}
        <AnimatePresence>
          {debouncedMediaType && debouncedTitle && descriptionDisplayValue && (
            <motion.div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 5px;
                font-size: 14px;
              `}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <h2>Description</h2>
              <p>{parseHtmlToReact(descriptionDisplayValue)}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!!formValues.title && debouncedMediaType && debouncedDescription && (
            <ConditionalFieldWrapper>
              <AdditionalFields />
            </ConditionalFieldWrapper>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showAddButton && (
            <motion.button
              type="submit"
              whileTap={{ scale: 0.8, backgroundColor: "white" }}
              css={css`
                border-radius: 15px;
                width: 100px;
                border: 1px solid black;
                padding: 5px 10px;
              `}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { scale: 0.7, y: 20 },
                show: { scale: 1, y: 0 },
              }}
            >
              Add
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};
