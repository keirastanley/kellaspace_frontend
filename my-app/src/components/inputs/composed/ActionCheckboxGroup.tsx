/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ListAction } from "../../../interfaces";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { Icons } from "../../shared";
import { useActions } from "../../../providers";

export const ActionCheckboxGroup = () => {
  const { actions, selectedActions, setSelectedActions } = useActions();

  if (!actions) {
    return null;
  }

  return (
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
