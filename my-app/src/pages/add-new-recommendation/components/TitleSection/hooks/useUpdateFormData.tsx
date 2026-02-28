import { useEffect } from "react";
import {
  RecommendationFormData,
  SearchResult,
} from "../../../../../interfaces";
import { useFormContext } from "react-hook-form";

export const useUpdateFormData = ({
  selectedResult,
}: {
  selectedResult: SearchResult | null;
}) => {
  const { setValue } = useFormContext<RecommendationFormData>();

  useEffect(() => {
    if (selectedResult) {
      setValue("title", selectedResult.title);
      setValue("artist", selectedResult.artist);
      setValue("image", selectedResult.image);
      setValue("description", selectedResult.description);
      setValue("search_id", selectedResult.search_id);
    }
  }, [selectedResult]);
};
