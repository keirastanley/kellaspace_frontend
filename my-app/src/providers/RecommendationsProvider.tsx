import React, { createContext, useContext, useState, ReactNode } from "react";
import { Recommendation } from "../interfaces/recommendations";
import { mockRecommendations } from "../data/mockRecommendations";

interface RecommendationsContextType {
  recommendations: Recommendation[];
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
}

const RecommendationsContext = createContext<
  RecommendationsContextType | undefined
>(undefined);

export const RecommendationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>(mockRecommendations);

  return (
    <RecommendationsContext.Provider
      value={{ recommendations, setRecommendations }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendations = (): RecommendationsContextType => {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error(
      "useRecommendations must be used within a RecommendationsProvider"
    );
  }
  return context;
};
