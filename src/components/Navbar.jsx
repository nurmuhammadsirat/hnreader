import React from "react";
import styled from "styled-components";
import Colors from "../lib/Colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

export default function NavBar(props) {
  return <NavContainer height={props.height}>
    <AppTitle>Hacker News Reader</AppTitle>
    <ReloadIcon onClick={props.handleClick}>
      <FontAwesomeIcon icon={faRedo} />
    </ReloadIcon>
  </NavContainer>;
}

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.height}px;
  width: 100%;
  background-color: ${Colors.brown};
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

const ReloadIcon = styled.div`
  margin-left: 25px;
  cursor: pointer;
`;
