import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { List, ListForDisplay, Recommendation } from "../interfaces";
import { useRecommendations } from "./RecommendationsProvider";

type ListContents = Recommendation[];

interface ListContextType {
  isFavourites: boolean;
  list: ListForDisplay | undefined;
  setList: React.Dispatch<React.SetStateAction<ListForDisplay | undefined>>;
  updatedList: ListForDisplay | undefined;
  setUpdatedList: React.Dispatch<
    React.SetStateAction<ListForDisplay | undefined>
  >;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListsProvider = ({
  initialList,
  isFavourites = false,
  children,
}: { children: ReactNode } & {
  initialList?: List;
  isFavourites?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<ListForDisplay>();
  const [updatedList, setUpdatedList] = useState<ListForDisplay | undefined>();
  const [listContents, setListContents] = useState<ListContents>([]);
  const { recommendations } = useRecommendations();

  useEffect(() => {
    setUpdatedList(list);
  }, [list]);

  useEffect(() => {
    if (initialList) {
      if (isFavourites) {
        setListContents(recommendations.filter(({ favourite }) => favourite));
      } else {
        if (!initialList.contents || initialList.contents.length < 1) {
          setListContents([]);
        } else {
          setListContents(
            initialList.contents?.map(
              (recommendationId) =>
                recommendations.find(
                  ({ id }) => id === recommendationId
                ) as Recommendation
            )
          );
        }
      }
    }
  }, [initialList]);

  useEffect(() => {
    if (listContents && initialList) {
      setList({ ...initialList, contents: listContents });
    }
  }, [initialList, listContents]);

  return (
    <ListContext.Provider
      value={{
        isFavourites,
        list,
        setList,
        updatedList,
        setUpdatedList,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useList = (): ListContextType => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within an ListsProvider");
  }
  return context;
};
