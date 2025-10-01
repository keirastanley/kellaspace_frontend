/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";
import { Overlay } from "../components/Overlay";

export const Home = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();
  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  return (
    <PageWrapper>
      <Overlay show={!!selectedRecommendation} />
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations />
      <div
        css={css`
          height: 75%;
          max-height: 75%;
        `}
      >
        <RecommendationsVertical recommendations={remainingRecommendations} />
      </div>
    </PageWrapper>
  );
};
