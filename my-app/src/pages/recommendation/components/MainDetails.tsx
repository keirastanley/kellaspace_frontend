/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaTypeTag, MediaTypeTagVariant } from "../../../components";
import { Recommendation } from "../../../interfaces";

export const MainDetails = ({
  recommendation: { title, mediaType, addedBy, dateAdded },
}: {
  recommendation: Recommendation;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
        padding-right: 10px;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          width: 100%;
        `}
      >
        <h1>{title}</h1>
        <MediaTypeTag
          mediaType={mediaType}
          variant={MediaTypeTagVariant.Large}
        />
      </div>
      <p
        css={css`
          font-size: 14px;
        `}
      >
        Added by {addedBy} on {new Date(dateAdded).toLocaleDateString()}
      </p>
    </div>
  );
};
