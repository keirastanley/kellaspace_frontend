/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { RECOMMENDATION_MAX_CHAR_LENGTH } from "../../constants/other";

export const Description = ({
  description,
}: Pick<Recommendation, "description">) => {
  const textExceedsMaxCharLength =
    description.length > RECOMMENDATION_MAX_CHAR_LENGTH;

  const textContent = textExceedsMaxCharLength
    ? `${description.slice(0, RECOMMENDATION_MAX_CHAR_LENGTH)}...`
    : description;
  return (
    <p
      css={css`
        font-size: 12px;
      `}
    >
      {textContent}
    </p>
  );
};
