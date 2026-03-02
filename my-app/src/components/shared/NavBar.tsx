import { Icons } from "../../components";
import styled from "@emotion/styled";
import { PageRoutes } from "../../interfaces";

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 6px;
  background-color: white;
  border-top: 1px solid black;
  flex-shrink: 0;
`;

const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 45px;
  color: black;
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

    <NavLink href={`/${PageRoutes.Lists}`}>
      <Icons.Bookmark />
      <span>Lists</span>
    </NavLink>

    <NavLink href={`/${PageRoutes.Activity}`}>
      <Icons.Activity />
      <span>Activity</span>
    </NavLink>

    <NavLink href={`/${PageRoutes.CreateRecommendation}`}>
      <Icons.Create />
      <span>Create</span>
    </NavLink>
  </Nav>
);
