/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "../sections/NewRecommendations";
import { mockRecommendations } from "../data/mockRecommendations";
import { MediaType, Recommendation } from "../interfaces/recommendations";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import styled from "@emotion/styled";

const sortRecommendationsByDate = (recommendations: Recommendation[]) =>
  recommendations.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

const MARGIN = 10;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MARGIN}px;
  height: 30%;
`;
const MainSection = styled.div`
  margin-top: ${MARGIN}px;
  height: 70%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: ${MARGIN}px;
`;

export const Home = () => {
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);

  const recommendationsSortedByDate =
    sortRecommendationsByDate(mockRecommendations);

  const recentRecommendations = recommendationsSortedByDate.slice(0, 5);

  const remainingRecommendations = useMemo(() => {
    if (selectedFilters.length > 0) {
      return recommendationsSortedByDate
        .slice(6)
        .filter(({ mediaType }) => selectedFilters.includes(mediaType));
    }
    return recommendationsSortedByDate.slice(6);
  }, [recommendationsSortedByDate, selectedFilters]);

  return (
    <div
      css={css`
        h1 {
          font-size: 18px;
        }
        margin: ${MARGIN}px;
        height: calc(100vh - ${MARGIN * 2}px);
      `}
    >
      <HeaderSection>
        <h1>Welcome to kellaspace</h1>
        <NewRecommendations recentRecommendations={recentRecommendations} />
        <FilterByTypeCheckboxGroup
          mediaTypes={Array.from(
            new Set(mockRecommendations.map(({ mediaType }) => mediaType))
          )}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </HeaderSection>
      <MainSection>
        {remainingRecommendations.map((recommendation) => (
          <RecommendationWidget
            recommendation={recommendation}
            key={recommendation.title + recommendation.dateAdded}
            variant={RecommendationWidgetVariant.Expand}
          />
        ))}
      </MainSection>
    </div>
  );
};
