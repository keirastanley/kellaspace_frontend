import { Outlet } from "react-router";
import { NavBar } from "./NavBar";

export const Layout = () => (
  <>
    <Outlet />
    <NavBar />
  </>
);
