import { Recommendation, UserData } from "../interfaces";

export const addNewRecommendationToUserData = (
  prevUserData: UserData | undefined,
  currentRecommendation: Recommendation,
  newRecommendation?: Recommendation
) => {
  if (!prevUserData) {
    return prevUserData;
  }
  const prevRecommendations = prevUserData.recommendations;
  if (
    !prevRecommendations ||
    prevRecommendations.length < 0 ||
    !newRecommendation
  ) {
    return prevUserData;
  }
  const indexOfRecommendation = prevRecommendations.indexOf(
    currentRecommendation
  );
  return {
    ...prevUserData,
    recommendations: [
      ...prevRecommendations.slice(0, indexOfRecommendation),
      newRecommendation,
      ...prevRecommendations.slice(indexOfRecommendation + 1),
    ],
  };
};
