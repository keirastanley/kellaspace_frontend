/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BORDER_RADIUS } from "../../constants/style";

export const Image = ({ imageSrc }: { imageSrc?: string }) => {
  const backgroundImageStyles = css`
    background-image: url(${imageSrc});
    background-size: cover;
    background-position: center;
  `;
  return (
    <div
      css={css`
        ${imageSrc
          ? backgroundImageStyles
          : css`
              background-color: black;
            `}
        height: 100%;
        width: 100px;
        border-radius: ${BORDER_RADIUS} 0px 0px 10px;
        flex-shrink: 0;
      `}
    />
  );
};
