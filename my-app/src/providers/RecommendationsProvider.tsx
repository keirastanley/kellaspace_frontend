import React, { createContext, useContext, useState, ReactNode } from "react";
import { Recommendation } from "../interfaces/recommendations";
import { mockRecommendations } from "../data/mockRecommendations";

type Recommendations = Recommendation[];
type SelectedRecommendation = Recommendation | undefined;

interface RecommendationsContextType {
  recommendations: Recommendations;
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendations>>;
  selectedRecommendation: SelectedRecommendation;
  setSelectedRecommendation: React.Dispatch<
    React.SetStateAction<SelectedRecommendation>
  >;
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
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation>();

  return (
    <RecommendationsContext.Provider
      value={{
        recommendations,
        setRecommendations,
        selectedRecommendation,
        setSelectedRecommendation,
      }}
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
