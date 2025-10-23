/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import {
  NewRecommendations,
  RecommendationsVerticalSection,
} from "../sections";
import { sortRecommendationsByDate } from "../utils";
import { PageWrapper } from "../components";
import { HomeAction } from "../interfaces";
import { useUserData } from "../providers";
import { Link } from "react-router";

export const Home = () => {
  const {
    userData: { recommendations },
  } = useUserData();
  const remainingRecommendations = useMemo(
    () =>
      recommendations && recommendations.length > 0
        ? sortRecommendationsByDate(recommendations).slice(6)
        : [],
    [recommendations]
  );

  return (
    <PageWrapper
      actions={Object.values(HomeAction)}
      mediaTypes={Array.from(
        new Set(remainingRecommendations.map(({ mediaType }) => mediaType))
      )}
    >
      <h1>Welcome to kellaspace</h1>
      {recommendations ? (
        <>
          <NewRecommendations
            recentRecommendations={sortRecommendationsByDate(
              recommendations
            ).slice(0, 5)}
          />
          <div
            css={css`
              flex: 1 1 auto;
              overflow: hidden;
              width: 100%;
            `}
          >
            <RecommendationsVerticalSection
              recommendations={remainingRecommendations}
            />
          </div>
        </>
      ) : (
        <div>
          This is place to save and share all the things you love.{" "}
          <Link to="/add-new">Add something new to get started.</Link>
        </div>
      )}
    </PageWrapper>
  );
};
