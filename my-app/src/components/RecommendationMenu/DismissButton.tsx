/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BsChevronCompactDown } from "react-icons/bs";

export const DismissButton = ({ onDismiss }: { onDismiss: () => void }) => (
  <button
    css={css`
      padding: 0;
      background-color: transparent;
      border: 0;
      text-align: left;
      margin: 10px 10px 0px 0px;
    `}
    onClick={onDismiss}
  >
    <BsChevronCompactDown
      css={css`
        font-size: 20px;
      `}
    />
  </button>
);
