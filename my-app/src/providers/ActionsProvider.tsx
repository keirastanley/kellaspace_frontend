import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  FavouritesAction,
  HomeAction,
  ListAction,
} from "../interfaces/actions";

type Action = ListAction | HomeAction | FavouritesAction;
type Actions = Action[];

interface ActionsContextType {
  actions: Actions;
  selectedActions: Actions;
  setSelectedActions: React.Dispatch<React.SetStateAction<Actions>>;
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined);

export const ActionsProvider = ({
  actions,
  children,
}: {
  actions: Actions;
  children: ReactNode;
}) => {
  const [selectedActions, setSelectedActions] = useState<Actions>([]);

  return (
    <ActionsContext.Provider
      value={{
        actions,
        selectedActions,
        setSelectedActions,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export const useActions = (): ActionsContextType => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error("useActions must be used within an ActionsProvider");
  }
  return context;
};
