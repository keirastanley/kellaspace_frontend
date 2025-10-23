import { MotionButton, MediaIcon } from "../../../components";
import { actionsPast } from "../../../interfaces";
import { useUserData } from "../../../providers";
import { addNewRecommendationToUserData } from "../../../utils";
import { useRecommendationData } from "../useRecommendationData";

export const CompletedButton = () => {
  const { setUserData } = useUserData();
  const { recommendation } = useRecommendationData();
  return (
    <MotionButton
      onClick={() =>
        setUserData((prevUserData) =>
          addNewRecommendationToUserData(prevUserData, recommendation!, {
            ...recommendation!,
            completed: !recommendation!.completed,
          })
        )
      }
    >
      <MediaIcon
        mediaType={recommendation!.mediaType}
        completed={recommendation!.completed}
      />
      {recommendation!.completed
        ? `${actionsPast[recommendation!.mediaType]
            .slice(0, 1)
            .toUpperCase()}${actionsPast[recommendation!.mediaType].slice(1)}`
        : `Mark as ${actionsPast[recommendation!.mediaType]}`}
    </MotionButton>
  );
};
