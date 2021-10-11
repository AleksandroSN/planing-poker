import { FunctionComponent, useEffect, useState } from "react";
import { ResultState } from "../../redux/ResultReducer/reducer";
import {
  GameSettingsCurrent,
  IssuesRedux,
  useAppSelector,
} from "../../redux/store";
import "./style.scss";
import { CardsWithStats } from "../CardsWithStats";

interface ResultsData {
  value: string;
  stat: number;
}

interface ResultOnCardsProps {
  issueResults: ResultState;
  issueId: string;
}

export const ResultOnCards: FunctionComponent<ResultOnCardsProps> = ({
  issueResults,
  issueId,
}): JSX.Element => {
  const [resultCards, setResultCards] = useState<ResultsData[]>([]);
  const { scoreTypeShort } = useAppSelector(GameSettingsCurrent);
  const { issues } = useAppSelector(IssuesRedux);
  const votingIssueIdx = issues.findIndex((issue) => issue.id === issueId);
  const votingIssue = issues[votingIssueIdx];
  const issueWithResults = issueResults[votingIssue.id];
  useEffect(() => {
    const resArr: ResultsData[] = [];
    if (issueWithResults) {
      Object.keys(issueWithResults.results).forEach((cardValue) => {
        const resultObj = {
          value: cardValue,
          stat: issueWithResults.results[cardValue],
        };
        resArr.push(resultObj);
      });
    }
    setResultCards(resArr);
  }, [issueResults]);

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
