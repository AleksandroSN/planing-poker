import { FunctionComponent } from "react";
import { ResultOnCards } from "../../../../components";
import { Issue } from "../../../../components/Issues/IssueItem/Issue";
import { IssueWithResultProps } from "./types";

export const IssueWithResult: FunctionComponent<IssueWithResultProps> = ({
  id,
  title,
  priority,
  link,
  // issueStatus,
}): JSX.Element => (
  <div className="round-result__result-item">
    <Issue
      id={id}
      title={title}
      priority={priority}
      link={link}
      issueStatus="created"
    />
    <ResultOnCards />
  </div>
);
