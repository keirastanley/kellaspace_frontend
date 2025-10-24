import { useAuth0 } from "@auth0/auth0-react";
import { MotionButton } from "./MotionButton";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <MotionButton onClick={() => loginWithRedirect()}>Log In</MotionButton>
  );
};
