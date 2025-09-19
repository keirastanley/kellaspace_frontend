/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
        height: 100px;
        width: 100px;
        border-radius: 10px 0px 0px 10px;
        flex-shrink: 0;
      `}
    />
  );
};
