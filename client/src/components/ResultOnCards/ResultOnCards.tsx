import { FunctionComponent, useEffect, useState } from "react";
import {
  AppSettings,
  GameSettingsCurrent,
  IssuesRedux,
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
  const { issues } = useAppSelector(IssuesRedux);
  const votingIssueIdx = issues.findIndex(
    (issue) => issue.issueStatus === "voting"
  );
  const votingIssue = issues[votingIssueIdx];
  const issueWithResults = issueResults[votingIssue.id];
  useEffect(() => {
    const resArr: ResultsData[] = [];
    Object.keys(issueWithResults.results).forEach((cardValue) => {
      const resultObj = {
        value: cardValue,
        stat: issueWithResults.results[cardValue],
      };
      resArr.push(resultObj);
    });
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
