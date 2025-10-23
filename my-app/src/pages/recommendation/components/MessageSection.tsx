import { useState } from "react";
import { Icons, MotionButton, TextAreaDialog } from "../../../components";
// import { useUserData } from "../../../providers";
// import { addNewRecommendationToUserData } from "../../../utils";
import { useRecommendationData } from "../useRecommendationData";

export const MessageSection = () => {
  const { recommendation } = useRecommendationData();
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
        fieldName="message"
        label="Add a message"
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
