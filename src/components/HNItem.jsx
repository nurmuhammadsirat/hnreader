import React from "react";
import styled from "styled-components";
import { useStore } from "../store";

export default function HNItem(props) {
  const url = useStore(state => state.url);
  const {marginTop, show} = props;

  return <ItemContainer marginTop={marginTop} show={show}>
    {url}
  </ItemContainer>;
}

const ItemContainer = styled.div`
  margin-top: ${props => props.marginTop}px;
  width: 100vw;

  ${props => props.show ? `
    transition: all 0.3s ease-out;
    transform: translate(100vw);
  ` : null }
`;