import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

import Colours from "../lib/Colours";

function Main() {
  function handleClick() {}

  return (
    <AppContainer>
      <NavBar>
        <AppTitle>Hacker News Reader</AppTitle>
        <AppIcon onclick={handleClick}>
          <FontAwesomeIcon icon={faRedo} />
        </AppIcon>
      </NavBar>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
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
  font-size: 24px;
  text-align: center;
  width: 40%;
  line-height: 1.1;
`;

const AppIcon = styled.div`
  font-size: 24px;
  text-align: right;
  width: 40%;
`;

export default Main;
