/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "../../interfaces/recommendations";
import { MediaTypeTag } from "./MediaTypeTag";
import { Timestamp } from "./Timestamp";

export const Metadata = ({
  mediaType,
  dateAdded,
}: {
  mediaType: MediaType;
  dateAdded: string;
}) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
    `}
  >
    <MediaTypeTag mediaType={mediaType} />
    <Timestamp dateAdded={dateAdded} />
  </div>
);
