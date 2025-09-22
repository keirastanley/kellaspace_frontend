/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH } from "../../constants/length";

export const MenuDescription = ({ description }: { description: string }) => (
  <p
    css={css`
      margin: 0px 10px 10px 10px;
      font-size: 15px;
    `}
  >
    {description.length > RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, RECOMMENDATION_MENU_MAX_DESCRIPTION_LENGTH)}...`
      : description}
  </p>
);
