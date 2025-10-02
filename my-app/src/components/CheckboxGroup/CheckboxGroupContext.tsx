import React, { createContext, useContext } from "react";
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
  setOrder: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
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
