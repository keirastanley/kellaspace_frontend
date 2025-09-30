/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Icons } from "../Icons";

export const DismissButton = ({ onDismiss }: { onDismiss: () => void }) => (
  <button
    css={css`
      padding: 0;
      background-color: transparent;
      border: 0;
      text-align: center;
      margin: 10px 10px 0px 0px;
      width: 100%;
    `}
    onClick={onDismiss}
  >
    <Icons.ChevronDown
      css={css`
        font-size: 20px;
      `}
    />
  </button>
);
