/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "../../interfaces/recommendations";
import { BORDER_RADIUS } from "../../constants/style";

export enum MediaTypeTagVariant {
  Small = "small",
  Large = "large",
}

export const MediaTypeTag = ({
  mediaType,
  variant = MediaTypeTagVariant.Small,
}: {
  mediaType: MediaType;
  variant?: MediaTypeTagVariant;
}) => {
  return (
    <div
      css={css`
        border: 1px solid black;
        border-radius: ${BORDER_RADIUS};
        padding: ${variant === MediaTypeTagVariant.Small
          ? "0px 8px"
          : "2px 15px"};
        width: max-content;
        text-align: center;
        font-size: ${variant === MediaTypeTagVariant.Small ? "9px" : "12px"};
      `}
    >
      {mediaType}
    </div>
  );
};
