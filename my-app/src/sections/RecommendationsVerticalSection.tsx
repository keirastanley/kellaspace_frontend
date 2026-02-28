/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../interfaces";
import { RecommendationsVertical } from "../components";
import { ActionsSection } from "./ActionsSection";

export const RecommendationsVerticalSection = ({
  recommendations,
}: {
  recommendations?: Recommendation[];
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        gap: 10px;
        height: 100%;
        width: 100%;
      `}
    >
      <ActionsSection />
      {recommendations && (
        <div
          css={css`
            flex: 1 1 auto;
            min-height: 0;
            padding-right: 10px;
          `}
        >
          <RecommendationsVertical recommendations={recommendations} />
        </div>
      )}
    </div>
  );
};
