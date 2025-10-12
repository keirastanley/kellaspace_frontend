import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  FavouritesAction,
  HomeAction,
  ListAction,
  SortingType,
} from "../interfaces/actions";
import { MediaType } from "../interfaces";

type Action = ListAction | HomeAction | FavouritesAction;
type Actions = Action[];

interface ActionsContextType {
  mediaTypes?: MediaType[];
  actions?: Actions;
  selectedActions: Actions;
  setSelectedActions: React.Dispatch<React.SetStateAction<Actions>>;
  selectedFilters: MediaType[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<MediaType[]>>;
  selectedSorting: SortingType | undefined;
  setSelectedSorting: React.Dispatch<
    React.SetStateAction<SortingType | undefined>
  >;
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined);

export const ActionsProvider = ({
  mediaTypes,
  actions,
  children,
}: {
  mediaTypes?: MediaType[];
  actions?: Actions;
  children: ReactNode;
}) => {
  const [selectedActions, setSelectedActions] = useState<Actions>([]);
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<SortingType>();

  return (
    <ActionsContext.Provider
      value={{
        mediaTypes,
        actions,
        selectedActions,
        setSelectedActions,
        selectedFilters,
        setSelectedFilters,
        selectedSorting,
        setSelectedSorting,
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
