/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router";
import { NavBar } from "./NavBar";
import { UserHeader } from "./UserHeader";

export const Layout = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      height: 100%;
    `}
  >
    <UserHeader />
    <div
      css={css`
        flex: 1;
        overflow-y: auto;
      `}
    >
      <Outlet />
    </div>
    <div
      css={css`
        position: sticky;
        bottom: 0;
        flex-shrink: 0;
        z-index: 10;
      `}
    >
      <NavBar />
    </div>
  </div>
);
