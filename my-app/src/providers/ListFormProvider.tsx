import React, { createContext, useContext, useState, ReactNode } from "react";
import { List } from "../interfaces";

export type ListFormData =
  | Partial<Pick<List, "title" | "description">>
  | undefined;

interface ListFormContextType {
  listFormData: ListFormData;
  setListFormData: React.Dispatch<React.SetStateAction<ListFormData>>;
}

const ListFormContext = createContext<ListFormContextType | undefined>(
  undefined
);

export const ListFormProvider = ({ children }: { children: ReactNode }) => {
  const [listFormData, setListFormData] = useState<ListFormData>();

  return (
    <ListFormContext.Provider
      value={{
        listFormData,
        setListFormData,
      }}
    >
      {children}
    </ListFormContext.Provider>
  );
};

export const useListForm = (): ListFormContextType => {
  const context = useContext(ListFormContext);
  if (!context) {
    throw new Error("useList must be used within an ListProvider");
  }
  return context;
};
