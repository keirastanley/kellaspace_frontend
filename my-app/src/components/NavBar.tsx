// import { RiHomeHeartLine } from "react-icons/ri";
import { BiHomeHeart, BiBookmarkHeart } from "react-icons/bi";
import { LuSquareActivity } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
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
      <BiHomeHeart />
      <span>Home</span>
    </NavLink>
    <NavLink href="/lists">
      <BiBookmarkHeart />
      <span>Lists</span>
    </NavLink>
    <NavLink href="/activity">
      <LuSquareActivity />
      <span>Activity</span>
    </NavLink>
    <NavLink href="/add-new">
      <MdOutlineAddBox />
      <span>Create</span>
    </NavLink>
  </Nav>
);
