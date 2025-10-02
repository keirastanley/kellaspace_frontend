import React, { createContext, useContext } from "react";

export type CheckboxGroupVariant = "withoutAll" | "withAll";
export type OrderVariant = "addToEnd" | "addToStart";

interface CheckboxGroupContextType {
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
  order: string[];
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);

export const useCheckboxGroup = (): CheckboxGroupContextType => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error(
      "useCheckboxGroup must be used within a CheckboxGroupProvider"
    );
  }
  return context;
};
