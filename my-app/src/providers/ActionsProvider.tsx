import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  FavouritesAction,
  HomeAction,
  ListAction,
  SortingType,
} from "../interfaces/actions";
import { useList } from "./ListProvider";
import { MediaType } from "../interfaces";

type Action = ListAction | HomeAction | FavouritesAction;
type Actions = Action[];

interface ActionsContextType {
  mediaTypes: MediaType[];
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
  actions,
  children,
}: {
  actions?: Actions;
  children: ReactNode;
}) => {
  const [selectedActions, setSelectedActions] = useState<Actions>([]);
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<SortingType>();
  const { list } = useList();

  const mediaTypes = useMemo(
    () => Array.from(new Set(list.contents?.map(({ mediaType }) => mediaType))),
    [list]
  );

  const filteredActions = useMemo(() => {
    return (
      actions?.filter((action) => {
        const isEmptyList =
          list && (!list.contents || list.contents.length < 1);
        if (isEmptyList) {
          return action === ListAction.Delete;
        }
        if (selectedActions.includes(ListAction.Delete)) {
          return action === ListAction.Delete;
        }
        const hasSingleMediaType = mediaTypes && mediaTypes.length <= 1;
        if (hasSingleMediaType) {
          return action !== ListAction.Filter;
        }
        return true;
      }) ?? undefined
    );
  }, [actions, list, mediaTypes, selectedActions]);

  return (
    <ActionsContext.Provider
      value={{
        mediaTypes,
        actions: filteredActions,
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
