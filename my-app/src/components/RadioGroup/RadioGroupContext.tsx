import React, { createContext, useContext } from "react";

interface RadioGroupContextType {
  selectedRadio?: string;
  setSelectedRadio: React.Dispatch<React.SetStateAction<string | undefined>>;
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
