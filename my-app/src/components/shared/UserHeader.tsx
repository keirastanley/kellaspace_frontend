import { css } from "@emotion/react";
import { LoginButton } from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./LogoutButton";
import { TiLockClosedOutline, TiUserOutline } from "react-icons/ti";
import { useUserData } from "../../providers";

export const UserHeader = () => {
  const { isAuthenticated } = useAuth0();
  const { userData } = useUserData();

  return (
    <div
      css={css`
        position: sticky;
        top: 0;
        z-index: 10;

        border-bottom: 1px solid black;
        background-color: white;
        padding: 6px;

        display: flex;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          {isAuthenticated ? <TiUserOutline /> : <TiLockClosedOutline />}
          <i
            css={css`
              font-size: 14px;
            `}
          >
            {isAuthenticated
              ? `Logged in as ${userData?.nickname ?? userData?.name}`
              : "You are currently in demo mode."}
          </i>
        </div>

        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};
