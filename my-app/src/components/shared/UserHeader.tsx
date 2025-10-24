/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LoginButton } from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./LogoutButton";
import { TiLockClosedOutline, TiUserOutline } from "react-icons/ti";
import { useUserData } from "../../providers";

export const UserHeader = () => {
  const { isAuthenticated } = useAuth0();
  const { userData } = useUserData();
  console.log(userData);
  return (
    <div
      css={css`
        border-bottom: 1px solid black;
        position: sticky;
        top: 0;
        flex-shrink: 0;
        z-index: 10;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 6px;
        background-color: white;
      `}
    >
      {isAuthenticated ? (
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
            <TiUserOutline />
            <i
              css={css`
                font-size: 14px;
              `}
            >
              Logged in as {userData.nickname ?? userData.name}
            </i>
          </div>
          <LogoutButton />
        </div>
      ) : (
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
            <TiLockClosedOutline />
            <i
              css={css`
                font-size: 14px;
              `}
            >
              You are currently in demo mode.
            </i>
          </div>
          <LoginButton />
        </div>
      )}
    </div>
  );
};
