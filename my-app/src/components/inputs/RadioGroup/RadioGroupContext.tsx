import { createContext, useContext } from "react";

interface RadioGroupContextType {
  selectedRadio?: string;
}

export const RadioGroupContext = createContext<
  RadioGroupContextType | undefined
>(undefined);

export const useRadioGroup = (): RadioGroupContextType => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("useRadioGroup must be used within a RadioGroupProvider");
  }
  return context;
};
