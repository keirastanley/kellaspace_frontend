/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BORDER_RADIUS } from "../constants/style";
import { CSSProperties } from "react";

export const Image = ({
  imageSrc,
  width,
  borderRadius,
  float,
  margin,
  alignSelf,
}: {
  imageSrc?: string;
  width?: string;
  borderRadius?: string;
  float?: "left" | "right";
  margin?: string;
  alignSelf?: CSSProperties["alignSelf"];
}) => {
  const backgroundImageStyles = css`
    background-image: url(${imageSrc});
    background-size: cover;
    background-position: center;
  `;
  return (
    <div
      css={css`
        background-color: pink;
        ${imageSrc
          ? backgroundImageStyles
          : css`
              background-color: black;
            `}
        height: ${width ?? "100%"};
        width: ${width ?? "100px"};
        border-radius: ${borderRadius ??
        `${BORDER_RADIUS} 0px 0px ${BORDER_RADIUS}`};
        flex-shrink: 0;
        float: ${float};
        margin: ${margin ?? "0px"};
        align-self: ${alignSelf};
      `}
    />
  );
};
