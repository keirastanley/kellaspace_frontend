import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserData } from "../interfaces/userData";
import { mockUserData } from "../data/mockUserData";
import { getUserById } from "./utils/api";
import { Recommendation } from "../interfaces";

type SelectedRecommendation = Recommendation | undefined;

interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  selectedRecommendation: SelectedRecommendation;
  setSelectedRecommendation: React.Dispatch<
    React.SetStateAction<SelectedRecommendation>
  >;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(mockUserData);
  // const [recommendations, setRecommendations] = useState<Recommendation[]>();
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation>();

  useEffect(() => {
    getUserById(mockUserData._id).then((data) => {
      if (data.success) {
        setUserData(data.payload);
      } else {
        setUserData(mockUserData);
      }
    });
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        selectedRecommendation,
        setSelectedRecommendation,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
