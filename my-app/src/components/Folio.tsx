/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Folio = ({
  backgroundColor = "grey",
  pageNumber,
  title,
}: {
  backgroundColor?: string;
  pageNumber: 1 | 2 | 3;
  title: string;
}) => {
  const margins = [0, 40, 110];
  const zIndexes = [2, 1, 0];
  const paddings = [20, 60, 40];
  const marginLeft = margins[pageNumber - 1];
  return (
    <div
      css={css`
        position: absolute;
        height: 100vh;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: ${zIndexes[pageNumber - 1]};
      `}
    >
      <div
        id={backgroundColor}
        css={css`
          position: absolute;
          left: ${marginLeft}px;
          top: 0;
          right: 0;
          width: 110px;
          height: 190px;
          border-radius: 0% 15% 0% 0%;
          background-color: ${backgroundColor};
          margin-left: ${marginLeft}px;
          z-index: ${zIndexes[pageNumber - 1]};
          padding-top: 20px;
          padding-left: ${paddings[pageNumber - 1]}px;
          font-size: 12px;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          position: absolute;
          z-index: ${zIndexes[(pageNumber = 1)]};
          bottom: 0;
          left: ${marginLeft}px;
          right: 0;
          background-color: ${backgroundColor};
          height: 94vh;
          margin-left: ${marginLeft}px;
        `}
      />
    </div>
  );
};
