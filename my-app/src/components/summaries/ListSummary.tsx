/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Image } from "../shared";
import { List } from "../../interfaces";

export enum ListSummaryVariant {
  WithBorder = "with-border",
}

export const ListSummary = ({
  list,
  variant,
}: {
  list: List;
  variant?: ListSummaryVariant;
}) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 6px;
        background-color: white;
        border-radius: 5px;
        ${variant === ListSummaryVariant.WithBorder &&
        css`
          border: 1px solid black;
        `};
      `}
    >
      <Image
        src={list.image?.src}
        style={{ width: "50px", borderRadius: "4px" }}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
        `}
      >
        <p
          css={css`
            font-size: 14px;
          `}
        >
          {list.title}
        </p>
        <p
          css={css`
            font-size: 12px;
          `}
        >
          <i>
            {list.contents && list.contents.length > 0
              ? `${list.contents.length} items`
              : "Empty"}
          </i>
        </p>
      </div>
    </div>
  );
};
