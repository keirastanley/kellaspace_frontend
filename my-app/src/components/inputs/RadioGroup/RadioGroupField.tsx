import { PropsWithChildren } from "react";
import { useRadioGroup } from "./RadioGroupContext";
import { MotionLabel } from "../../shared";

export type RadioGroupFieldProps = PropsWithChildren & {
  radioName: string;
  onChange?: () => void;
  afterOnChange?: () => void;
  beforeOnChange?: () => void;
  moveToEndOnDeselect?: string;
};

export const RadioGroupField = ({
  radioName,
  children,
  afterOnChange,
  beforeOnChange,
  onChange,
}: RadioGroupFieldProps) => {
  const { selectedRadio, setSelectedRadio } = useRadioGroup();

  const isSelected = selectedRadio === radioName;

  return (
    <MotionLabel isSelected={isSelected} fieldName={radioName}>
      <input
        type="radio"
        checked={isSelected}
        onChange={() => {
          if (beforeOnChange) {
            beforeOnChange();
          }
          if (onChange) {
            onChange();
          } else {
            setSelectedRadio(radioName);
          }
          if (afterOnChange) {
            afterOnChange();
          }
        }}
        id={radioName}
        name={radioName}
      />
      {children}
    </MotionLabel>
  );
};
