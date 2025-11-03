import { MotionButton, Icons } from "../../../components";
import { useUserData } from "../../../providers";
import { addNewRecommendationToUserData } from "../../../utils";
import { useRecommendationPageData } from "../useRecommendationData";

export const FavouriteButton = () => {
  const { setUserData } = useUserData();
  const { recommendation } = useRecommendationPageData();
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
          <Icons.HeartFill /> Favourite
        </>
      ) : (
        <>
          <Icons.Heart /> Favourite
        </>
      )}
    </MotionButton>
  );
};
