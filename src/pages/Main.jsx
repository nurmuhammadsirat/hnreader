import React, {useEffect, useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 }  from 'uuid';
import ApiClient from "../lib/ApiClient";
import config from "../config";
import logger from "../logger";
import NavBar from "../components/Navbar";
import Card from "../components/Card";
import HNItem from "../components/HNItem";
import Colors from "../lib/Colors";
import { isEven } from "../lib/Util";

function Main(props) {
  const [startItem, setStartItem] = useState(-1);
  const [isFetchingCards, setIsFetchingCards] = useState(false);
  const [showHNItem, setShowHNItem] = useState(false);
  const itemsInSet = 10;
  const reloadScrollPercentThreshold = 80;

  const cardInfo = useRef([]);
  const topStories = useRef([]);
  const cardContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const fullHeight = cardContainerRef.current.scrollHeight;
    const visibleHeight = cardContainerRef.current.clientHeight;
    const scrollTop = cardContainerRef.current.scrollTop;
    logger.debug("fullHeight:", fullHeight);
    logger.debug("visibleHeight:", visibleHeight);
    logger.debug("scrollTop:", scrollTop);
    const percentScrolled = Math.round((scrollTop / (fullHeight - visibleHeight)) * 100);
    if(percentScrolled > reloadScrollPercentThreshold) {
      logger.debug("Fetching new items");
      setStartItem(startItem + itemsInSet);
    }
  }, [startItem]);

  useEffect(() => {
    const element = cardContainerRef.current;
    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    logger.debug("Fetching Hacker News top stories.");
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

    const element = cardContainerRef.current;
    element.removeEventListener('scroll', handleScroll);

    const itemsToFetch = topStories.current.slice(startItem, startItem + itemsInSet);
    setIsFetchingCards(true);
    const promises = [];
    const currentCardInfo = cardInfo.current;
    const newCardInfo = []

    itemsToFetch.forEach((item, index) => {
      logger.debug(`Fetching HN item ${item}`);
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

  const navbarHeight = 80;

  function handleReload() {
    logger.debug("Reloading HN top stories.");
    window.location.reload();
  }

  function handleBack() {
    setShowHNItem(false);
  }

  return (
    <MainContainer>
      <NavBar
        showBackButton={showHNItem}
        height={navbarHeight}
        handleReload={handleReload}
        handleBack={handleBack}
      />
      {isFetchingCards ? <Spinner>
        <FontAwesomeIcon icon={faCog} />
      </Spinner> : null}
      <Content>
        <CardsContainer ref={cardContainerRef}
          marginTop={navbarHeight}
          hide={showHNItem}
        >
          {cardInfo.current.map((info, index) => <Card
              key={uuidv4()}
              by={info.by}
              time={info.time}
              title={info.title}
              url={info.url}
              bgColor={isEven(index) ? Colors.green3 : Colors.green1}
              showHNItem={setShowHNItem}
              />
            )
          }
        </CardsContainer>
        <HNItem marginTop={navbarHeight}
          show={showHNItem}
        />
      </Content>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: block;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 200vw;
`;

const CardsContainer = styled.div`
  margin-top: ${props => props.marginTop}px;
  width: 100vw;
  height: calc(100vh - ${props => props.marginTop}px);
  overflow-y: scroll;

  ${props => props.hide ? `
    transition: all 0.3s ease-out;
    transform: translate(-100vw);
  ` : null }
`;

const Spinner = styled.div`
  margin-top: 120px;
  text-align: center;
  background-color: transparent;
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Main;
