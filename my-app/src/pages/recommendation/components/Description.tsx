/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { parseHtmlToReact } from "../../../utils";
import { useRecommendationPageData } from "../useRecommendationData";

export const Description = () => {
  const { recommendation } = useRecommendationPageData();
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
