/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, ComponentProps } from "react";
import { TextInputFormField } from "./TextInputFormField";
import { useFormData } from "../../providers/FormDataProvider";
import { Dialog } from "../Dialog";

export const TextInputDialog = ({
  open,
  onCancelClick,
  ...textInputProps
}: {
  open: boolean;
  onCancelClick: () => void;
} & Pick<
  ComponentProps<typeof TextInputFormField>,
  "fieldName" | "label" | "type"
>) => {
  const { setFormValues } = useFormData();
  const [textInput, setTextInput] = useState<string>();
  return (
    <Dialog open={open} onClose={onCancelClick}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          width: 100%;
          box-sizing: border-box;
        `}
      >
        <TextInputFormField {...textInputProps} setTextInput={setTextInput} />
        <div
          css={css`
            display: flex;
            align-self: center;
            justify-content: space-evenly;
            gap: 10px;
          `}
        >
          <button type="button" onClick={onCancelClick}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setFormValues((prevFormVals) => ({
                ...prevFormVals,
                link: textInput,
              }));
              onCancelClick();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};
