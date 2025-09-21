/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "../sections/NewRecommendations";
import { RecommendationFilter } from "../interfaces/recommendationFilters";
import { mockRecommendations } from "../data/mockRecommendations";
import { Recommendation } from "../interfaces/recommendations";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";

const sortRecommendationsByDate = (recommendations: Recommendation[]) =>
  recommendations.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

export const Home = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    RecommendationFilter[]
  >([]);

  const recommendationsSortedByDate =
    sortRecommendationsByDate(mockRecommendations);
  const recentRecommendations = recommendationsSortedByDate.slice(0, 5);
  const remainingRecommendations = useMemo(() => {
    if (selectedFilters.length > 0 && !selectedFilters.includes("All")) {
      return recommendationsSortedByDate.filter(({ mediaType }) =>
        selectedFilters.includes(mediaType)
      );
    }
    return recommendationsSortedByDate.slice(6);
  }, [recommendationsSortedByDate, selectedFilters]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        h1 {
          font-size: 18px;
        }
      `}
    >
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations recentRecommendations={recentRecommendations} />
      <FilterByTypeCheckboxGroup
        mediaTypes={Array.from(
          new Set(mockRecommendations.map(({ mediaType }) => mediaType))
        )}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <div
          css={css`
            border: 1px solid red;
          `}
        >
          {remainingRecommendations.map((recommendation) => (
            <RecommendationWidget
              recommendation={recommendation}
              key={recommendation.title + recommendation.dateAdded}
              variant={RecommendationWidgetVariant.Expand}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
