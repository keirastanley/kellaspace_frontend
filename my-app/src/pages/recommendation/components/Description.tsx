/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { parseHtmlToReact } from "../../../utils";
import { useRecommendationData } from "../useRecommendationData";

export const Description = () => {
  const { recommendation } = useRecommendationData();
  return (
    <p
      css={css`
        font-size: 14px;
      `}
    >
      {parseHtmlToReact(recommendation?.description!)}
    </p>
  );
};
