/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { TextArea } from "./TextArea";
import { Dialog } from "..";
// import { ListFormData } from "../../providers/ListFormProvider";
// import { FormValues } from "../../providers";

interface TextAreaDialogProps {
  open: boolean;
  onCancelClick: () => void;
  // fieldName: string;
  label: string;
  defaultValue?: string;
  // setValues: React.Dispatch<React.SetStateAction<ListFormData | FormValues>>;
  onSaveClick: (val: string) => void;
}

export const TextAreaDialog = ({
  open,
  onCancelClick,
  // fieldName,
  label,
  defaultValue,
  // setValues,
  onSaveClick,
}: TextAreaDialogProps) => {
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
        <TextArea
          onChange={(val) => setTextInput(val)}
          label={label}
          value={textInput}
          defaultValue={defaultValue}
        />
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
            onClick={
              textInput ? () => onSaveClick(textInput) : undefined
              // () => {
              // setValues((prevFormVals) => ({
              //   ...prevFormVals,
              //   [fieldName]: textInput,
              // }));
              // onCancelClick();
              // }
            }
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};
