import { FunctionComponent } from "react";
import { Button } from "../../../../components";
import { IssuesRedux, useAppSelector } from "../../../../redux/store";
import { nextIssueVoting, startGame } from "../../../Socket/lib/game/methods";

export const GameControll: FunctionComponent = (): JSX.Element => {
  const { issues } = useAppSelector(IssuesRedux);
  const issueIndex = issues.findIndex(
    (issue) => issue.issueStatus === "voting"
  );
  const isLastIssue = issueIndex === issues.length - 1; // move in lib
  return (
    <div className="game-issues__control">
      <Button type="button" onClick={startGame} classes="button-start">
        Restart Round
      </Button>
      <Button
        type="button"
        onClick={nextIssueVoting}
        classes="button-start"
        isDisabled={isLastIssue}
      >
        Next issue
      </Button>
    </div>
  );
};
