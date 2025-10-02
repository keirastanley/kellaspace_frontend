import { PropsWithChildren, useEffect } from "react";
import { useCheckboxGroup } from "./CheckboxGroupContext";
import { MotionLabel } from "../MotionLabel";

export type CheckboxGroupFieldProps = PropsWithChildren & {
  checkboxName: string;
  onChange?: () => void;
  afterOnChange?: () => void;
  beforeOnChange?: () => void;
  moveToEndOnDeselect?: string;
};

export const CheckboxGroupField = ({
  checkboxName,
  children,
  afterOnChange,
  beforeOnChange,
  onChange,
  moveToEndOnDeselect,
}: CheckboxGroupFieldProps) => {
  const {
    orderVariant,
    selectedCheckboxes,
    setSelectedCheckboxes,
    order,
    setOrder,
  } = useCheckboxGroup();

  const isSelected = selectedCheckboxes.includes(checkboxName);

  useEffect(() => {
    if (moveToEndOnDeselect) {
      if (
        !selectedCheckboxes.includes(moveToEndOnDeselect) &&
        order[order.length - 1] !== moveToEndOnDeselect
      ) {
        setOrder((prevOrder) => [
          ...prevOrder.filter((item) => moveToEndOnDeselect !== item),
          moveToEndOnDeselect,
        ]);
      }
    }
  }, [order.length, selectedCheckboxes.length, moveToEndOnDeselect]);

  const getNewSelectedCheckboxes = (item: string, checked: boolean) => {
    if (checked)
      return selectedCheckboxes.filter((selectedItem) => selectedItem !== item);
    if (orderVariant === "addToStart") {
      return [item, ...selectedCheckboxes];
    }
    return [...selectedCheckboxes, item];
  };

  const handleSelection = (item: string, checked: boolean) => {
    const newSelectedCheckboxes = getNewSelectedCheckboxes(item, checked);
    setSelectedCheckboxes(newSelectedCheckboxes);

    const newOrder = [
      ...newSelectedCheckboxes,
      ...order.filter((item) => !newSelectedCheckboxes.includes(item)),
    ];
    setOrder(newOrder);
  };

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
