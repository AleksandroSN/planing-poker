import { FunctionComponent } from "react";
import { ResultOnCards } from "../../../../components";
import { Issue } from "../../../../components/Issues/IssueItem/Issue";
import {
  useAppSelector,
  ResultRedux,
  IssuesRedux,
} from "../../../../redux/store";

export const GameResult: FunctionComponent = (): JSX.Element => {
  const issueResults = useAppSelector(ResultRedux);
  const { issues } = useAppSelector(IssuesRedux);
  const result = issues.map((issue) => {
    return (
      <div className="round-result__result-item">
        <Issue
          id={issue.id}
          title={issue.title}
          priority={issue.priority}
          link={issue.link}
          issueStatus="created"
        />
        <ResultOnCards issueResults={issueResults} issueId={issue.id} />
      </div>
    );
  });
  return <>{result}</>;
};
