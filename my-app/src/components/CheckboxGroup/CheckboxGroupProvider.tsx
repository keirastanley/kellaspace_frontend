import React, { createContext, useContext, PropsWithChildren } from "react";

type CheckboxGroupVariant = "withoutAll" | "withAll";
type OrderVariant = "addToEnd" | "addToStart";

interface CheckboxGroupContextType {
  checkboxLabels: string[];
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
  order: string[];
  setOrder: (order: string[]) => void;
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);

export const CheckboxGroupProvider = ({
  checkboxLabels,
  selectedCheckboxes,
  setSelectedCheckboxes,
  variant = "withoutAll",
  orderVariant = "addToStart",
  children,
  order,
  setOrder,
}: PropsWithChildren & CheckboxGroupContextType) => {
  return (
    <CheckboxGroupContext.Provider
      value={{
        checkboxLabels,
        selectedCheckboxes,
        setSelectedCheckboxes,
        variant,
        orderVariant,
        order,
        setOrder,
      }}
    >
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export const useCheckboxGroup = (): CheckboxGroupContextType => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error(
      "useCheckboxGroup must be used within a CheckboxGroupProvider"
    );
  }
  return context;
};
