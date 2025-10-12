import { PropsWithChildren } from "react";
import { useCheckboxGroup } from "./CheckboxGroupContext";
import { MotionLabel } from "../MotionLabel";

export type CheckboxGroupFieldProps = PropsWithChildren & {
  checkboxName: string;
  onChange?: () => void;
  afterOnChange?: () => void;
  beforeOnChange?: () => void;
};

export const CheckboxGroupField = ({
  checkboxName,
  children,
  afterOnChange,
  beforeOnChange,
  onChange,
}: CheckboxGroupFieldProps) => {
  const { selectedCheckboxes, setSelectedCheckboxes } = useCheckboxGroup();

  const handleSelection = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, item]);
    }
  };

  const isSelected = selectedCheckboxes.includes(checkboxName);

  return (
    <MotionLabel isSelected={isSelected} fieldName={checkboxName}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {
          if (beforeOnChange) {
            beforeOnChange();
          }
          if (onChange) {
            onChange();
          } else {
            handleSelection(checkboxName, isSelected);
          }
          if (afterOnChange) {
            afterOnChange();
          }
        }}
        id={checkboxName}
        name={checkboxName}
      />
      {children}
    </MotionLabel>
  );
};
