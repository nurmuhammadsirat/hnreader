import React from "react";
import styled from "styled-components";

export default function Card(props) {
  const {by, time, title, url} = props;

  return <CardContainer>
    <Title>{title}</Title>
  </CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  height: 120px;
  border: 1px solid #000;
`;

const Title = styled.div``;