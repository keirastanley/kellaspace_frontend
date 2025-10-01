import { PropsWithChildren } from "react";
import { useCheckboxGroup } from "./CheckboxGroupProvider";
import { MotionLabel } from "./MotionLabel";

export type CheckboxGroupFieldProps = PropsWithChildren & {
  checkboxName: string;
  onChange?: () => void;
};

export const CheckboxGroupField = ({
  checkboxName,
  children,
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

  const handleSelection = (item: string, checked: boolean) => {
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
        onChange={onChange ?? (() => handleSelection(checkboxName, isSelected))}
        id={checkboxName}
        name={checkboxName}
      />
      {children}
    </MotionLabel>
  );
};
