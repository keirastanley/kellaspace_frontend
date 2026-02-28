import { PropsWithChildren } from "react";
import { useLoader } from "../../../../providers";
import { Loading } from "../../../../components";
import { useFormContext } from "react-hook-form";
import { RecommendationFormData } from "../../../../interfaces";

export const LoadingWrapper = ({ children }: PropsWithChildren) => {
  const { watch } = useFormContext<RecommendationFormData>();
  const { isLoading } = useLoader();
  return isLoading ? <Loading mediaType={watch("mediaType")} /> : children;
};
