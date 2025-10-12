/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVerticalSection } from "../sections/RecommendationsVerticalSection";
import { PageWrapper } from "../components/PageWrapper";
import { Overlay } from "../components/Overlay";
import { HomeAction } from "../interfaces/actions";

export const Home = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();
  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  return (
    <PageWrapper actions={Object.values(HomeAction)}>
      <Overlay show={!!selectedRecommendation} />
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations />
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        <RecommendationsVerticalSection
          recommendations={remainingRecommendations}
        />
      </div>
    </PageWrapper>
  );
};
