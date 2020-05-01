import React, {useEffect} from "react";
import Card from "./Card";
import logger from "../logger";
import ApiClient from "../lib/ApiClient";
import config from "../config";

export default function Cards(props) {
  const {items} = props;
  const cardsInfo = [];
  const hnApiUrl = config.hnApiUrl;

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
  }, [items]);

  const cards = cardsInfo.map((item, index) =>
    <Card key={index} props={{
      by: item.by,
      time: item.time,
      title: item.title,
      url: item.url
    }}/>
  );
  return <>
    {cards}
  </>;
}