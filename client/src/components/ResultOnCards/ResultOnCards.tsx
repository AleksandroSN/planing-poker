import { FunctionComponent, useState } from "react";
import { CardsWithStats } from "../CardsWithStats";
import { cardsMock } from "./cardsMock";
import "./style.scss";

export const ResultOnCards: FunctionComponent = (): JSX.Element => {
  const [resultCards, setResultCards] = useState(cardsMock);
  const renderCards = resultCards.map((card) => {
    return (
      <CardsWithStats
        key={card.value}
        value={card.value}
        scoreTypeShort={card.scoreTypeShort}
        stats={card.stats}
      />
    );
  });
  return <div className="game-cards__result-container">{renderCards}</div>;
};
