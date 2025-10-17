/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVerticalSection } from "../sections/RecommendationsVerticalSection";
import { PageWrapper } from "../components/PageWrapper";
import { HomeAction } from "../interfaces/actions";

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
      <NewRecommendations />
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
    </PageWrapper>
  );
};
