/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useFormData } from "../../providers";
import { RecommendationFormData } from "../../interfaces";

export const TextArea = ({
  fieldName,
  label,
  setTextInput,
  defaultValue,
}: {
  fieldName: keyof RecommendationFormData;
  label: string;
  setTextInput: (value?: string) => void;
  defaultValue?: string;
}) => {
  const { formData } = useFormData();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        box-sizing: border-box;
        font-size: 16px;
      `}
    >
      <label htmlFor={fieldName}>{label}</label>
      <textarea
        id={fieldName}
        name={fieldName}
        value={formData ? (formData[fieldName] as string) : undefined}
        onChange={(e) => setTextInput(e.target.value)}
        rows={6}
        defaultValue={defaultValue}
      />
    </div>
  );
};
