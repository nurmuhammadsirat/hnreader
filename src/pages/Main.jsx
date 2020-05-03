import React, {useEffect, useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 }  from 'uuid';
import ApiClient from "../lib/ApiClient";
import config from "../config";
import logger from "../logger";
import NavBar from "../components/Navbar";
import Card from "../components/Card";
import Colours from "../lib/Colours";

function Main() {
  const [startItem, setStartItem] = useState(-1);
  const [isFetchingCards, setIsFetchingCards] = useState(false);
  const itemsInSet = 10;
  const reloadScrollPercentThreshold = 80;

  const cardInfo = useRef([]);
  const topStories = useRef([]);
  const mainElementRef = useRef(null);

  const handleScroll = useCallback(() => {
    const fullHeight = mainElementRef.current.scrollHeight;
    const visibleHeight = mainElementRef.current.clientHeight;
    const scrollTop = mainElementRef.current.scrollTop;
    const percentScrolled = Math.round((scrollTop / (fullHeight - visibleHeight)) * 100);
    if(percentScrolled > reloadScrollPercentThreshold) {
      logger.info("Fetching new items");
      setStartItem(startItem + itemsInSet);
    }
  }, [startItem]);

  useEffect(() => {
    const element = mainElementRef.current;
    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    logger.info("Fetching Hacker News top stories.");
    ApiClient.get(`${config.hnApiUrl}/topstories.json`)
      .then(resp => {
        topStories.current = resp.data;
        setStartItem(0);
      })
      .catch(error => {
        logger.error("Error fetch HN top stories", error);
      })
  }, []);

  useEffect(() => {
    if(startItem < 0) { return }

    const element = mainElementRef.current;
    element.removeEventListener('scroll', handleScroll);

    const itemsToFetch = topStories.current.slice(startItem, startItem + itemsInSet);
    setIsFetchingCards(true);
    const promises = [];
    const currentCardInfo = cardInfo.current;
    const newCardInfo = []

    itemsToFetch.forEach((item, index) => {
      logger.info(`Fetching HN item ${item}`);
      promises.push(
        ApiClient.get(`${config.hnApiUrl}/item/${item}.json`)
        .then(resp => {
          const newCard = {
                      by: resp.data.by,
                      time: resp.data.time,
                      title: resp.data.title,
                      url: resp.data.url
                    };
          newCardInfo.push(newCard);
        })
        .catch(error => {
          logger.error(`Error fetching HN item ${item}`, error);
        })
      );
    });

    Promise.all(promises).then(() => {
      cardInfo.current = currentCardInfo.concat(newCardInfo);
      element.addEventListener('scroll', handleScroll);
      setIsFetchingCards(false);
    });
  }, [startItem, handleScroll])

  const spinner = <Spinner>
    <FontAwesomeIcon icon={faCog} />
  </Spinner>;

  const navbarHeight = 80;

  return (
    <MainContainer ref={mainElementRef}>
      <NavBar height={navbarHeight}/>
      <CardsContainer marginTop={navbarHeight}>
        {cardInfo.current.map(info => <Card
            key={uuidv4()}
            by={info.by}
            time={info.time}
            title={info.title}
            url={info.url}
            />
          )
        }
      </CardsContainer>
      {isFetchingCards ? spinner : null}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;

const CardsContainer = styled.div`
  margin-top: ${props => props.marginTop}px;
  width: 100%;
`;

const Spinner = styled.div`
  width: inherit;
  height: 30px;
  border: 1px solid #000;
`;

export default Main;
