import React from "react";
import {useHistory} from 'react-router-dom';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {getDateStringFromUnixTime} from "../lib/Util";
import { useStore } from "../store";
import logger from "../logger";

export default function Card(props) {
  const history = useHistory();
  const {by, time, title, url, bgColor, showHNItem} = props;

  const setUrl = useStore(state => state.setUrl);

  function handleClick(){
    logger.debug("Clicked on card with URL:", url);
    setUrl(url);
    showHNItem(true);
  }

  return <CardContainer bgColor={bgColor} onClick={handleClick}>
    <CardInfo>
      <Title>{title}</Title>
      <By>Posted by {by}</By>
      <Time>On {getDateStringFromUnixTime(time)}</Time>
    </CardInfo>
    <ViewIcon>
      <FontAwesomeIcon icon={faAngleRight} />
    </ViewIcon>
  </CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  height: 120px;
  background-color: ${props => props.bgColor};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardInfo = styled.div`
  width: 75%;
  display: flex:
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;
const ViewIcon = styled.div`
  padding-left: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const By = styled.div`
  font-size: 12px;
`;

const Time = styled.div`
  font-size: 10px;
`;
