import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useUserData } from "../../providers";
import { List, Recommendation } from "../../interfaces";

export const useRecommendationPageData = () => {
  const { userData } = useUserData();
  const { recommendation_id } = useParams();
  const [updatedRecommendation, setUpdatedRecommendation] =
    useState<Recommendation>();
  const [updatedLists, setUpdatedLists] = useState<List[]>();
  const recommendation = useMemo(() => {
    if (!userData?.recommendations) {
      return undefined;
    }
    return userData.recommendations.find(({ id }) => id === recommendation_id);
  }, [recommendation_id, userData]);

  useEffect(() => {
    setUpdatedLists(userData?.lists);
  }, [userData]);

  const favouritesList: List = useMemo(
    () => ({
      id: "favourites-list",
      title: "Favourites",
      createdBy: "keira",
      dateCreated: new Date().toUTCString(),
      contents: userData?.recommendations?.filter(({ favourite }) => favourite),
    }),
    [userData]
  );

  const listsContainingRecommendation = useMemo(() => {
    if (!userData?.lists) {
      return undefined;
    }
    return recommendation
      ? userData.lists.filter((list) => list.contents?.includes(recommendation))
      : [];
  }, [recommendation]);

  return {
    favouritesList,
    recommendation,
    listsContainingRecommendation,
    updatedRecommendation,
    setUpdatedRecommendation,
    updatedLists,
    setUpdatedLists,
  };
};
