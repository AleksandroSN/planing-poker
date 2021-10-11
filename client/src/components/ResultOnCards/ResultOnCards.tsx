import { FunctionComponent, useEffect, useState } from "react";
import {
  GameSettingsCurrent,
  ResultRedux,
  useAppSelector,
} from "../../redux/store";
import { CardsWithStats } from "../CardsWithStats";
import "./style.scss";

interface ResultsData {
  value: string;
  stat: number;
}

export const ResultOnCards: FunctionComponent = (): JSX.Element => {
  const [resultCards, setResultCards] = useState<ResultsData[]>([]);
  const issueResults = useAppSelector(ResultRedux);
  const { scoreTypeShort } = useAppSelector(GameSettingsCurrent);

  useEffect(() => {
    const resArr: ResultsData[] = [];
    Object.keys(issueResults).forEach((issue) => {
      Object.keys(issueResults[issue].results).forEach((cardValue) => {
        const resultObj = {
          value: cardValue,
          stat: issueResults[issue].results[cardValue],
        };
        resArr.push(resultObj);
      });
    });
    setResultCards(resArr);
  }, [issueResults]);

  // clear after start round

  const renderCards = resultCards.map((card) => {
    return (
      <CardsWithStats
        key={card.value}
        value={card.value}
        scoreTypeShort={scoreTypeShort}
        stats={card.stat}
      />
    );
  });
  return <div className="game-cards__result-container">{renderCards}</div>;
};
