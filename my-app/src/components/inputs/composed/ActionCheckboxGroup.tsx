/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ListAction } from "../../../interfaces";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { Icons } from "../../shared";
import { useActions } from "../../../providers";
import { toggleValuePresentInArr } from "../../../utils";

export const ActionCheckboxGroup = () => {
  const { actions, selectedActions, setSelectedActions } = useActions();

  if (!actions) {
    return null;
  }

  const labels = selectedActions
    ? [
        ...selectedActions,
        ...actions.filter(
          (actionValue) => !selectedActions.includes(actionValue)
        ),
      ]
    : actions;

  return (
    <CheckboxGroup
      values={selectedActions as string[]}
      setValues={
        setSelectedActions as React.Dispatch<
          React.SetStateAction<string[] | undefined>
        >
      }
    >
      {labels.map((action) => {
        const IconComponent = Icons[action as ListAction];
        return (
          <CheckboxGroup.Field
            key={action + "-checkbox-group-field"}
            checkboxName={action}
            onChange={() =>
              setSelectedActions((prevSelectedActions) =>
                toggleValuePresentInArr(action, prevSelectedActions)
              )
            }
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
