/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BORDER_RADIUS } from "../constants/style";
import { ImgHTMLAttributes } from "react";

export const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const backgroundImageStyles = css`
    background-image: url(${props.src});
    background-size: cover;
    background-position: center;
  `;

  return (
    <div
      css={css`
        background-color: pink;
        ${props.src
          ? backgroundImageStyles
          : css`
              background-color: black;
            `}
        height: ${props.style?.width ?? "100%"};
        width: ${props.style?.width ?? "100px"};
        border-radius: ${props.style?.borderRadius ??
        `${BORDER_RADIUS} 0px 0px ${BORDER_RADIUS}`};
        flex-shrink: 0;
        float: ${props.style?.float};
        margin: ${props.style?.margin ?? "0px"};
        align-self: ${props.style?.alignSelf};
      `}
    />
  );
};
