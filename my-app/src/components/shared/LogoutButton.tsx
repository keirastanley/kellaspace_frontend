import { useAuth0 } from "@auth0/auth0-react";
import { MotionButton } from "./MotionButton";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <MotionButton
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </MotionButton>
  );
};
