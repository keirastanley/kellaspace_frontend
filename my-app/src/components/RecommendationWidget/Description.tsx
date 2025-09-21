/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";

export const Description = ({
  description,
}: Pick<Recommendation, "description">) => {
  return (
    <p
      css={css`
        font-size: 12px;
      `}
    >
      {description}
    </p>
  );
};
