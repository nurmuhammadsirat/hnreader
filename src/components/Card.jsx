import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Card(props) {
  const {by, time, title, url, bgColor} = props;

  const date = new Date(time * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const dateString = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

  return <CardContainer bgColor={bgColor}>
    <CardInfo>
      <Title>{title}</Title>
      <By>Posted by {by}</By>
      <Time>On {dateString}</Time>
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
