/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";
import { Overlay } from "../components/Overlay";
import { HomeAction } from "../interfaces/actions";
import { ActionsProvider } from "../providers/ActionsProvider";

export const Home = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();
  const [isEditing, setIsEditing] = useState(false);
  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  return (
    <ActionsProvider actions={Object.values(HomeAction)}>
      <PageWrapper>
        <Overlay show={!!selectedRecommendation} />
        <h1>Welcome to kellaspace</h1>
        <NewRecommendations />
        <div
          css={css`
            flex: 1 1 auto;
            overflow: hidden;
          `}
        >
          <RecommendationsVertical
            recommendations={remainingRecommendations}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </div>
      </PageWrapper>
    </ActionsProvider>
  );
};
