/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ListAction } from "../interfaces/actions";
import { CheckboxGroup } from "./CheckboxGroup/CheckboxGroup";
import { Icons } from "./Icons";
import { useEffect } from "react";
import { useActions } from "../providers/ActionsProvider";

export const ActionCheckboxGroup = ({
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
}) => {
  const { actions, selectedActions, setSelectedActions } = useActions();
  useEffect(() => {
    if (selectedActions.includes(ListAction.Delete)) {
      setIsEditing(false);
    }
  }, [selectedActions]);

  return actions ? (
    <CheckboxGroup
      checkboxLabels={actions}
      selectedCheckboxes={selectedActions as string[]}
      setSelectedCheckboxes={
        setSelectedActions as React.Dispatch<React.SetStateAction<string[]>>
      }
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
  ) : null;
};
