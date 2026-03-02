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
      height: 100vh;
    `}
  >
    <UserHeader />
    <main
      css={css`
        flex: 1;
        min-height: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      `}
    >
      <Outlet />
    </main>
    <NavBar />
  </div>
);
