/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { Icons } from "./Icons";

export const EditableWrapper = ({
  children,
  isEditing,
}: PropsWithChildren & { isEditing: boolean }) => (
  <div
    css={css`
      display: flex;
      gap: 10px;
      align-items: center;
    `}
  >
    {children}
    {isEditing && <Icons.EditSimple />}
  </div>
);
