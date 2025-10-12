/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps } from "react";
import { Dialog } from "../Dialog";
import { Recommendation, RecommendationWidgetVariant } from "../../interfaces";
import { RecommendationsVertical } from "../RecommendationsVertical";
import { DialogVariant } from "../../interfaces/dialog";

export const EditListDialog = ({
  recommendations,
  ...props
}: ComponentProps<typeof Dialog> & { recommendations: Recommendation[] }) => {
  return (
    <Dialog {...props} variant={DialogVariant.Expand}>
      <div
        css={css`
          height: 100%;
        `}
      >
        <RecommendationsVertical
          recommendations={recommendations}
          isEditing={true}
          variant={RecommendationWidgetVariant.Dialog}
        />
      </div>
    </Dialog>
  );
};
