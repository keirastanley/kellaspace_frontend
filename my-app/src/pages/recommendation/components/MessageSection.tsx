import { useState } from "react";
import { Icons, MotionButton, TextAreaDialog } from "../../../components";
// import { useUserData } from "../../../providers";
// import { addNewRecommendationToUserData } from "../../../utils";
import { useRecommendationPageData } from "../useRecommendationData";

export const MessageSection = () => {
  const { recommendation, setUpdatedRecommendation } =
    useRecommendationPageData();
  const [open, setOpen] = useState(false);
  // const { setUserData } = useUserData();
  return recommendation?.message ? (
    <p>
      From {recommendation.addedBy}: <i>"{recommendation?.message}"</i>
    </p>
  ) : (
    <div>
      <TextAreaDialog
        open={open}
        onCancelClick={() => setOpen(false)}
        label="Add a message"
        onSaveClick={(message) =>
          setUpdatedRecommendation((prevRecommendation) => {
            if (!prevRecommendation) {
              return prevRecommendation;
            }
            return { ...prevRecommendation, message };
          })
        }
      />
      <MotionButton
        onClick={
          () => setOpen(true)
          // setUserData((prevUserData) =>
          //   addNewRecommendationToUserData(prevUserData, recommendation!, {
          //     ...recommendation!,
          //     message,
          //   })
          // )
        }
      >
        <Icons.Edit /> Add a message
      </MotionButton>
    </div>
  );
};
