import { MotionButton, Icons } from "../../../components";
import { useUserData } from "../../../providers";
import { addNewRecommendationToUserData } from "../../../utils";
import { useRecommendationData } from "../useRecommendationData";

export const FavouriteButton = () => {
  const { setUserData } = useUserData();
  const { recommendation } = useRecommendationData();
  return (
    <MotionButton
      onClick={() =>
        setUserData((prevUserData) =>
          addNewRecommendationToUserData(prevUserData, recommendation!, {
            ...recommendation!,
            favourite: !recommendation!.favourite,
          })
        )
      }
    >
      {recommendation!.favourite ? (
        <>
          <Icons.HeartFill /> Remove from favourites
        </>
      ) : (
        <>
          <Icons.Heart /> Add to favourites
        </>
      )}
    </MotionButton>
  );
};
