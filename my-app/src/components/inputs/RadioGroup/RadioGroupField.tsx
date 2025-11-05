import { PropsWithChildren } from "react";
import { MotionLabel } from "../../shared";
import { useRadioGroup } from "./RadioGroupContext";

export interface RadioGroupFieldProps extends PropsWithChildren {
  radioName: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroupField = ({
  children,
  radioName,
  onChange,
}: RadioGroupFieldProps) => {
  const { selectedRadio } = useRadioGroup();

  const isSelected = selectedRadio === radioName;

  return (
    <MotionLabel isSelected={isSelected} fieldName={radioName}>
      <input
        type="radio"
        name={radioName}
        checked={isSelected}
        onChange={onChange}
      />
      {children}
    </MotionLabel>
  );
};
