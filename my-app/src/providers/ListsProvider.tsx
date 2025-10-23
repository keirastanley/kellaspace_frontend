import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { List, ListForDisplay, Recommendation } from "../interfaces";
import { useUserData } from "./UserDataProvider";

interface ListContextType {
  isFavourites: boolean;
  list: ListForDisplay;
  setList: React.Dispatch<React.SetStateAction<ListForDisplay>>;
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
  const [list, setList] = useState<ListForDisplay>({
    id: "",
    title: "",
    createdBy: "",
    dateCreated: "",
  });
  const [updatedList, setUpdatedList] = useState<ListForDisplay | undefined>();
  const {
    userData: { recommendations },
  } = useUserData();

  useEffect(() => {
    setUpdatedList(list);
  }, [list]);

  useEffect(() => {
    if (initialList) {
      let listContents: Recommendation[] = [];
      if (isFavourites) {
        listContents = (recommendations ?? []).filter(
          ({ favourite }) => favourite
        );
      } else {
        if (initialList.contents && initialList.contents.length > 0) {
          listContents = initialList.contents?.map(
            (recommendationId) =>
              (recommendations ?? []).find(
                ({ id }) => id === recommendationId
              ) as Recommendation
          );
        }
      }
      setList({ ...initialList, contents: listContents });
    }
  }, [initialList]);

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
