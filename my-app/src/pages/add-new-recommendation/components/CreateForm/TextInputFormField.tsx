/** @jsxImportSource @emotion/react */
import { RecommendationFormData } from "../../../../interfaces";
import { TextInput } from "../../../../components";
import { useFormContext } from "react-hook-form";

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
  const { watch } = useFormContext<RecommendationFormData>();
  return (
    <TextInput
      type={type}
      defaultValue={watch("title")}
      onChange={(val) => setTextInput(val)}
      label={label}
    />
  );
};
