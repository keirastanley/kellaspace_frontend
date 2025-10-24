import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserData, Recommendation } from "../interfaces";
import { mockUserData } from "../data";
import { getUserBySub } from "../utils";
import { useAuth0 } from "@auth0/auth0-react";

type SelectedRecommendation = Recommendation | undefined;

interface UserDataContextType {
  userData: UserData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  selectedRecommendation: SelectedRecommendation;
  setSelectedRecommendation: React.Dispatch<
    React.SetStateAction<SelectedRecommendation>
  >;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>();
  const { isAuthenticated, user } = useAuth0();
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation>();

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      getUserBySub(user?.sub).then((data) => {
        if (
          data.success &&
          window.location.origin === "http://localhost:5173"
        ) {
          setUserData(data.payload);
        } else {
          setUserData(mockUserData);
        }
      });
    } else {
      setUserData(mockUserData);
    }
  }, [isAuthenticated, user]);

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
