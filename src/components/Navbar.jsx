import React from "react";
import styled from "styled-components";
import Colours from "../lib/Colours";

export default function NavBar() {
  return <NavContainer>
    <AppTitle>Hacker News Reader</AppTitle>
  </NavContainer>;
}

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: ${Colours.brown};
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Baloo Bhaina 2', cursive;
`;

const AppTitle = styled.div`
  font-size: 28px;
  text-align: center;
  width: 70%;
  line-height: 1.1;
`;