import React, { createContext, useContext } from "react";

export type CheckboxGroupVariant = "withoutAll" | "withAll";

interface CheckboxGroupContextType {
  checkboxLabels: string[];
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  variant?: CheckboxGroupVariant;
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
