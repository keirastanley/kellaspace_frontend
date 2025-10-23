/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "../../../interfaces";
import { MediaTypeTag, Timestamp } from "../../shared";

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
