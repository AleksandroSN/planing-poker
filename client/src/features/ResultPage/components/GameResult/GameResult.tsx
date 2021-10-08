import { FunctionComponent } from "react";
import { IssueWithResult } from "../IssueWithResult";
import { mockData } from "./gameResultsMock";

export const GameResult: FunctionComponent = (): JSX.Element => {
  const result = mockData.map((issue) => {
    return (
      <IssueWithResult
        key={issue.id}
        id={issue.id}
        title={issue.title}
        link={issue.link}
        priority={issue.priority}
      />
    );
  });
  return <>{result}</>;
};
