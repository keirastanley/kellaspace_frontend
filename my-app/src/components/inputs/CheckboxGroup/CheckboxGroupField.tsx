import { PropsWithChildren } from "react";
import { MotionLabel } from "../../shared";
import { useCheckboxGroup } from "./CheckboxGroupContext";

export interface CheckboxGroupFieldProps extends PropsWithChildren {
  checkboxName: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const CheckboxGroupField = ({
  children,
  checkboxName,
  onChange,
}: CheckboxGroupFieldProps) => {
  const { selectedCheckboxes } = useCheckboxGroup();

  const isSelected = !!selectedCheckboxes?.includes(checkboxName);

  return (
    <MotionLabel isSelected={isSelected} fieldName={checkboxName}>
      <input
        type="checkbox"
        name={checkboxName}
        checked={isSelected}
        onChange={onChange}
      />
      {children}
    </MotionLabel>
  );
};
