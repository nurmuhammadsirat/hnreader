import React from "react";
import styled from "styled-components";
import { useStore } from "../store";

export default function HNItem(props) {
  const url = useStore(state => state.url);
  const {marginTop} = props;

  return <ItemContainer marginTop={marginTop}>
    {url}
  </ItemContainer>;
}

const ItemContainer = styled.div`
  margin-top: ${props => props.marginTop}px;
  width: 100vw;
`;