import { RiHomeHeartLine } from "react-icons/ri";
import { BiHomeHeart, BiArchive, BiBookmarkHeart } from "react-icons/bi";
import { MdOutlineAddBox } from "react-icons/md";
import styled from "@emotion/styled";

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* height: 50px; */
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
    <NavLink href="/about">
      <BiArchive />
      <span>Your stuff</span>
    </NavLink>
    <NavLink href="/settings">
      <BiBookmarkHeart />
      <span>Favourites</span>
    </NavLink>
    <NavLink href="/settings">
      <MdOutlineAddBox />
      <span>Add new</span>
    </NavLink>
  </Nav>
);
