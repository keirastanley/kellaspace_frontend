/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useFormData } from "../../providers/FormDataProvider";
import { RecommendationFormData } from "../../interfaces";

export const TextArea = ({
  fieldName,
  label,
  setTextInput,
}: {
  fieldName: keyof RecommendationFormData;
  label: string;
  setTextInput: (value?: string) => void;
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
      `}
    >
      <label htmlFor={fieldName}>{label}</label>
      <textarea
        id={fieldName}
        name={fieldName}
        value={formData ? (formData[fieldName] as string) : undefined}
        onChange={(e) => setTextInput(e.target.value)}
        rows={6}
      />
    </div>
  );
};
