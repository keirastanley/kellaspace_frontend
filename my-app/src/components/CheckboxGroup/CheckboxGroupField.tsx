import { PropsWithChildren } from "react";
import { CheckboxType, useCheckboxGroup } from "./CheckboxGroupProvider";
import { MotionLabel } from "./MotionLabel";

export type CheckboxGroupFieldProps = PropsWithChildren & {
  checkboxName: CheckboxType;
  onChange?: () => void;
  beforeOnChange?: () => void;
};

export const CheckboxGroupField = ({
  checkboxName,
  children,
  beforeOnChange,
  onChange,
}: CheckboxGroupFieldProps) => {
  const {
    orderVariant,
    selectedCheckboxes,
    setSelectedCheckboxes,
    order,
    setOrder,
  } = useCheckboxGroup();

  const isSelected = selectedCheckboxes.includes(checkboxName);

  const handleSelection = (item: CheckboxType, checked: boolean) => {
    const newSelectedCheckboxes = checked
      ? selectedCheckboxes.filter((selectedItem) => selectedItem !== item)
      : orderVariant === "addToStart"
      ? [item, ...selectedCheckboxes]
      : [...selectedCheckboxes, item];

    setSelectedCheckboxes(newSelectedCheckboxes);
    const newOrder = [
      ...newSelectedCheckboxes,
      ...order.filter((item) => !newSelectedCheckboxes.includes(item)),
    ];
    setOrder(newOrder);
  };

  return (
    <MotionLabel isSelected={isSelected} checkboxName={checkboxName}>
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
        }}
        id={checkboxName}
        name={checkboxName}
      />
      {children}
    </MotionLabel>
  );
};
