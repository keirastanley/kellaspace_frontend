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
} from "../interfaces/actions";
import { useList } from "./ListProvider";

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
  const { list } = useList();

  const mediaTypes = useMemo(
    () => list?.contents?.map(({ mediaType }) => mediaType),
    [list]
  );

  const filteredActions = actions.filter((action) => {
    const isEmptyList = list && (!list.contents || list.contents.length < 1);
    if (isEmptyList) {
      return action === ListAction.Delete;
    }
    const hasSingleMediaType = mediaTypes && mediaTypes.length <= 1;
    if (hasSingleMediaType) {
      return action !== ListAction.Filter;
    }
    return true;
  });

  return (
    <ActionsContext.Provider
      value={{
        actions: filteredActions,
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
