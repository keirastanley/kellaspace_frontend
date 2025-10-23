import { parseHtmlToReact } from "../../../utils";
import { useRecommendationData } from "../useRecommendationData";

export const Description = () => {
  const { recommendation } = useRecommendationData();
  return <p>{parseHtmlToReact(recommendation?.description!)}</p>;
};
