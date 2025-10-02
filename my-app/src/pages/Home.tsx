/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";
import { Overlay } from "../components/Overlay";
import { ActionCheckboxGroup } from "../components/ActionCheckboxGroup";
import { HomeAction } from "../interfaces/actions";

export const Home = () => {
  const { recommendations, selectedRecommendation } = useRecommendations();
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  return (
    <PageWrapper>
      <Overlay show={!!selectedRecommendation} />
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations />
      <ActionCheckboxGroup
        actions={Object.values(HomeAction)}
        // Temporary fix
        selectedActions={selectedActions as any}
        setSelectedActions={setSelectedActions}
        setIsEditing={setIsEditing}
      />
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        <RecommendationsVertical
          recommendations={remainingRecommendations}
          showFilters={selectedActions.includes(HomeAction.Filter)}
          isEditing={isEditing}
        />
      </div>
    </PageWrapper>
  );
};
