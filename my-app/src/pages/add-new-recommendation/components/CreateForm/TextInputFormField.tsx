/** @jsxImportSource @emotion/react */
import { useFormData } from "../../../../providers";
import { RecommendationFormData } from "../../../../interfaces";
import { TextInput } from "../../../../components";

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
    <TextInput
      type={type}
      defaultValue={formValues ? (formValues[fieldName] as string) : undefined}
      onChange={(val) => setTextInput(val)}
      label={label}
    />
  );
};
