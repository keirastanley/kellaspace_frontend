/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Icons } from "../../../../components";

export const AddButton = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    css={css`
      display: flex;
      gap: 5px;
      align-items: center;
      width: max-content;
    `}
    onClick={onClick}
  >
    <Icons.Add />
    {buttonText}
  </button>
);
