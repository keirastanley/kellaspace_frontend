import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { List } from "../interfaces";
import { useUserData } from "./UserDataProvider";

interface ListContextType {
  isFavourites: boolean;
  list: List;
  setList: React.Dispatch<React.SetStateAction<List>>;
  updatedList: List | undefined;
  setUpdatedList: React.Dispatch<React.SetStateAction<List | undefined>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({
  initialList,
  isFavourites = false,
  children,
}: { children: ReactNode } & {
  initialList?: List;
  isFavourites?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<List>({
    id: "",
    title: "",
    createdBy: "",
    dateCreated: "",
  });
  const [updatedList, setUpdatedList] = useState<List | undefined>();
  const { userData } = useUserData();

  const recommendations = userData?.recommendations;

  useEffect(() => {
    setUpdatedList(list);
  }, [list]);

  useEffect(() => {
    if (initialList) {
      let listContents = initialList.contents;
      if (isFavourites) {
        listContents = (recommendations ?? []).filter(
          ({ favourite }) => favourite
        );
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
    throw new Error("useList must be used within an ListProvider");
  }
  return context;
};
