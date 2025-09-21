/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "../../interfaces/recommendations";
import { BORDER_RADIUS } from "../../constants/style";

export const MediaTypeTag = ({ mediaType }: { mediaType: MediaType }) => {
  return (
    <div
      css={css`
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        padding: 0px 8px;
        width: max-content;
        text-align: center;
        font-size: 9px;
      `}
    >
      {mediaType}
    </div>
  );
};
