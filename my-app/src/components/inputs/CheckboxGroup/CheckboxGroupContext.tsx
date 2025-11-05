import { createContext, useContext } from "react";

interface CheckboxGroupContextType {
  selectedCheckboxes?: string[];
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
