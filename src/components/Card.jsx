import React from "react";
import styled from "styled-components";

export default function Card(props) {
  const {by, time, title, url, bgColor} = props;

  return <CardContainer bgColor={bgColor}>
    <Title>{title}</Title>
  </CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  height: 120px;
  background-color: ${props => props.bgColor};
`;

const Title = styled.div``;