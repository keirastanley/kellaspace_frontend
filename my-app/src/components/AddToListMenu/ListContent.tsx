/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Image } from "../Image";
import { List } from "../../interfaces/lists";

export const ListContent = ({ list }: { list: List }) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 6px;
      `}
    >
      <Image imageSrc={list.image?.src} width="50px" borderRadius="4px" />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
        `}
      >
        <p>{list.title}</p>
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
