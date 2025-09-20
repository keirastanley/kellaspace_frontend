/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";

export const Title = ({
  title,
  addedBy,
}: Pick<Recommendation, "title" | "addedBy">) => {
  return (
    <p
      css={css`
        margin-bottom: 2px;
      `}
    >
      <b>
        <i>{title}</i> added by {addedBy}
      </b>
    </p>
  );
};
