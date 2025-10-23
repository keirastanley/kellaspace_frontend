import { useNavigate } from "react-router";
import { Icons, MotionButton } from "../../../components";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <MotionButton onClick={() => navigate(-1)}>
      <Icons.Back />
      Back
    </MotionButton>
  );
};
