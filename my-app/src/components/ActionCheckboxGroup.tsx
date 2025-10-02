/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HomeAction, ListAction } from "../interfaces/actions";
import { CheckboxGroup } from "./CheckboxGroup/CheckboxGroup";
import { CheckboxType } from "./CheckboxGroup/CheckboxGroupContext";
import { Icons } from "./Icons";
import { useEffect } from "react";

export const ActionCheckboxGroup = ({
  actions,
  selectedActions,
  setSelectedActions,
  setIsEditing,
}: {
  actions: (ListAction | HomeAction)[];
  selectedActions: (ListAction | HomeAction)[];
  setSelectedActions: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
  setIsEditing: (isEditing: boolean) => void;
}) => {
  useEffect(() => {
    if (selectedActions.includes(ListAction.Delete)) {
      setIsEditing(false);
    }
  }, [selectedActions]);

  return (
    <CheckboxGroup
      checkboxLabels={actions}
      selectedCheckboxes={selectedActions}
      setSelectedCheckboxes={setSelectedActions}
    >
      {[
        ...selectedActions,
        ...actions.filter(
          (actionValue) => !selectedActions.includes(actionValue)
        ),
      ].map((action) => {
        const IconComponent = Icons[action as ListAction];
        return (
          <CheckboxGroup.Field
            key={action + "-checkbox-group-field"}
            checkboxName={action}
            afterOnChange={() => {
              if (action === ListAction.Delete) {
                if (selectedActions.includes(action)) {
                  setSelectedActions([]);
                } else {
                  setSelectedActions([ListAction.Delete]);
                }
              } else {
                if (action === ListAction.Edit) {
                  setIsEditing(!selectedActions.includes(ListAction.Edit));
                }
              }
            }}
            moveToEndOnDeselect={ListAction.Delete}
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
              <span>{action}</span>
            </div>
          </CheckboxGroup.Field>
        );
      })}
    </CheckboxGroup>
  );
};
