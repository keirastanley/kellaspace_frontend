import { Icons } from "../../components";
import styled from "@emotion/styled";

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 6px;
  background-color: white;
  border-top: 1px solid black;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  color: black;
  height: 45px;
  gap: 4px;
  align-items: center;
  text-decoration: none;
  span {
    font-size: 12px;
  }
  svg {
    font-size: 25px;
  }
`;

export const NavBar = () => (
  <Nav>
    <NavLink href="/">
      <Icons.Home />
      <span>Home</span>
    </NavLink>
    <NavLink href="/lists">
      <Icons.Bookmark />
      <span>Lists</span>
    </NavLink>
    <NavLink href="/activity">
      <Icons.Activity />
      <span>Activity</span>
    </NavLink>
    <NavLink href="/add-new">
      <Icons.Create />
      <span>Create</span>
    </NavLink>
  </Nav>
);
