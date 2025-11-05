/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { EditAction } from "../../../interfaces/actions";
import { Icons } from "../../shared";

export const EditActionsRadioGroup = ({
  selectedEditAction,
  setSelectedEditAction,
}: {
  selectedEditAction?: string;
  setSelectedEditAction: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) => {
  const radioLabels = Object.values(EditAction);

  return (
    <RadioGroup value={selectedEditAction}>
      {radioLabels.map((editAction) => {
        const IconComponent = Icons[editAction as EditAction];
        return (
          <RadioGroup.Field
            radioName={editAction}
            onChange={() => {
              setSelectedEditAction(editAction);
            }}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 4px;
                span {
                  font-size: 12px;
                }
                svg {
                  font-size: 18px;
                }
              `}
            >
              <IconComponent />
              <span> {editAction}</span>
            </div>
          </RadioGroup.Field>
        );
      })}
    </RadioGroup>
  );
};
