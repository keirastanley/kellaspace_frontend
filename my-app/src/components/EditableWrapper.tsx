/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { Icons } from "./Icons";

export const EditableWrapper = ({
  children,
  isEditing,
  onDoneClick,
  onEditFieldClick,
}: PropsWithChildren & {
  isEditing: { list: boolean; field: boolean };
  onDoneClick: () => void;
  onEditFieldClick: () => void;
}) => {
  console.log(isEditing);
  return (
    <div
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
      `}
    >
      {children}
      {isEditing.list && !isEditing.field && (
        <Icons.EditSimple onClick={() => onEditFieldClick()} />
      )}
      {isEditing.field && <Icons.Checkmark onClick={() => onDoneClick()} />}
    </div>
  );
};
