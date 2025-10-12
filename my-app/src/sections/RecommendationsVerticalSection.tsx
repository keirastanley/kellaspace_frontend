/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../interfaces";
import { ActionSection } from "../components/ActionsSection";
import { RecommendationsVertical } from "../components/RecommendationsVertical";

export const RecommendationsVerticalSection = ({
  recommendations,
  showActions = true,
}: {
  recommendations?: Recommendation[];
  showActions?: boolean;
}) => {
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-right: 10px;
      `}
    >
      {showActions && <ActionSection />}
      {recommendations && (
        <RecommendationsVertical recommendations={recommendations} />
      )}
    </div>
  );
};
