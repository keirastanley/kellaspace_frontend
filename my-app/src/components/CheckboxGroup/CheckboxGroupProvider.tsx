import React, { createContext, useContext, PropsWithChildren } from "react";
import { MediaType } from "../../interfaces";
import { Action } from "../../interfaces/actions";

export type CheckboxGroupVariant = "withoutAll" | "withAll";
export type OrderVariant = "addToEnd" | "addToStart";
export type CheckboxType = MediaType | Action | "All";

interface CheckboxGroupContextType {
  selectedCheckboxes: CheckboxType[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
  order: CheckboxType[];
  setOrder: (order: CheckboxType[]) => void;
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);

export const CheckboxGroupProvider = ({
  children,
  selectedCheckboxes,
  setSelectedCheckboxes,
  variant,
  orderVariant,
  order,
  setOrder,
}: PropsWithChildren & CheckboxGroupContextType) => {
  return (
    <CheckboxGroupContext.Provider
      value={{
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
