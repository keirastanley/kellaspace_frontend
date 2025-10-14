/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useFormData } from "../../providers/FormDataProvider";
import { RecommendationFormData } from "../../interfaces";
import { TextInput } from "../TextInput";

export const TextInputFormField = ({
  fieldName,
  label,
  type,
  setTextInput,
}: {
  fieldName: keyof RecommendationFormData;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  setTextInput: (value?: string) => void;
}) => {
  const { formValues } = useFormData();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: calc(100% - 20px);
        box-sizing: border-box;
        font-size: 16px;
      `}
    >
      <label htmlFor={fieldName}>{label}</label>
      <TextInput
        type={type}
        id={fieldName}
        name={fieldName}
        defaultValue={
          formValues ? (formValues[fieldName] as string) : undefined
        }
        onChange={(e) => setTextInput(e.target.value)}
        required
        aria-required="true"
      />
    </div>
  );
};
