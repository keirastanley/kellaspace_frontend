import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useUserData } from "../../providers";
import { Recommendation } from "../../interfaces";

export const useRecommendationData = () => {
  const { userData } = useUserData();
  const { recommendation_id } = useParams();
  const [updatedRecommendation, setUpdatedRecommendation] =
    useState<Recommendation>();
  const recommendation = useMemo(() => {
    if (!userData?.recommendations) {
      return undefined;
    }
    return userData.recommendations.find(({ id }) => id === recommendation_id);
  }, [recommendation_id, userData]);

  const listsContainingRecommendation = useMemo(() => {
    if (!userData?.lists) {
      return undefined;
    }
    return recommendation
      ? userData.lists.filter((list) =>
          list.contents?.includes(recommendation.id)
        )
      : [];
  }, [recommendation]);

  return {
    recommendation,
    listsContainingRecommendation,
    updatedRecommendation,
    setUpdatedRecommendation,
  };
};
