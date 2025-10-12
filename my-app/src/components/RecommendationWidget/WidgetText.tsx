/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const WidgetText = ({
  title,
  addedBy,
  description,
  maxDescriptionLength,
}: {
  title: string;
  addedBy: string;
  description?: string;
  maxDescriptionLength: number;
}) => {
  const addedByLength = " addedBy ".length + addedBy.length;
  const titleLength = title.length + addedByLength;
  const descriptionLength = description ? titleLength + description.length : 0;
  const descriptionExceedsMax = descriptionLength > maxDescriptionLength;

  const descriptionText = descriptionExceedsMax
    ? `${description
        ?.slice(0, maxDescriptionLength - titleLength)
        .trimEnd()}...`
    : description;

  return (
    <>
      <p
        css={css`
          margin-bottom: 2px;
        `}
      >
        <b>
          <i>{title}</i> added by {addedBy}
        </b>
      </p>
      <p
        css={css`
          font-size: 12px;
        `}
      >
        {descriptionText}
      </p>
    </>
  );
};
