import React, {useEffect, useState} from 'react';
import ApiClient from "../lib/ApiClient";
import config from "../config";
import logger from "../logger";
import Card from "../components/Card";
import NavBar from "../components/Navbar";

function Main() {
  const [items, setItems] = useState([]);
  const [startItem, setStartItem] = useState(0);
  const itemsInSet = 10;
  const hnApiUrl = config.hnApiUrl;
  const cardsInfo = [];

  useEffect(() => {
    logger.info("Fetching Hacker News top stories.");
    ApiClient.get(`${hnApiUrl}/topstories.json`)
      .then(resp => {
        setItems(resp.data);
      })
      .catch(error => {
        logger.error("Error fetch HN top stories", error);
      })
  }, []);

  useEffect(() => {
    logger.info("Fetching each Hacker News item");
    const itemsToFetch = items.slice(startItem, itemsInSet);
    itemsToFetch.forEach((itemNumber) => {
      ApiClient.get(`${hnApiUrl}/item/${itemNumber}.json`)
        .then(resp => {
          cardsInfo.push(resp.data);
        })
        .catch(error => {
          logger.error(`Error fetch HN item ${itemNumber}`, error);
        })
    });
  }, []);

  const cards = cardsInfo.map((item, index) =>
    <Card key={index} props={{...item}}/>
  );

  return (
    <>
      <NavBar />
      {cards}
    </>
  );
}

export default Main;
