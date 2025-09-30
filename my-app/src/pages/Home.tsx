/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import styled from "@emotion/styled";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Home = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();
  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  return (
    <PageWrapper>
      {selectedRecommendation && <Overlay />}
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations />
      <div
        id="here"
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
