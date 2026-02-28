/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import {
  NewRecommendations,
  RecommendationsVerticalSection,
} from "../../sections";
import { sortRecommendationsByDate } from "../../utils";
import { PageWrapper, UserHeader } from "../../components";
import { HomeAction } from "../../interfaces";
import { useUserData } from "../../providers";
import { NoRecommendationsScreen } from "./NoRecommendationsScreen";

export const Home = () => {
  const { userData } = useUserData();
  const recommendations = userData?.recommendations;
  const remainingRecommendations = useMemo(
    () =>
      recommendations && recommendations.length > 0
        ? sortRecommendationsByDate(recommendations).slice(6)
        : [],
    [recommendations],
  );

  return (
    <div>
      <UserHeader />
      <PageWrapper
        actions={Object.values(HomeAction)}
        mediaTypes={Array.from(
          new Set(remainingRecommendations.map(({ mediaType }) => mediaType)),
        )}
      >
        <h1>Welcome to kellaspace</h1>
        {recommendations && recommendations.length > 0 ? (
          <>
            {recommendations.length > 6 && (
              <NewRecommendations
                recentRecommendations={sortRecommendationsByDate(
                  recommendations,
                ).slice(0, 5)}
              />
            )}
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
          <NoRecommendationsScreen />
        )}
      </PageWrapper>
    </div>
  );
};
