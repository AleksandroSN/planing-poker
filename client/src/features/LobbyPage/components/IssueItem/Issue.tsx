import { FunctionComponent } from "react";
import { AddIssue, IssueItem } from ".";
import "./issue.scss";

interface IssueProps {
  issueName: string;
  priority: string;
}

export const Issue: FunctionComponent<IssueProps> = ({
  issueName,
  priority,
}): JSX.Element => {
  if (!issueName) {
    return <AddIssue />;
  }
  return (
    <IssueItem key={issueName} issueName={issueName} priority={priority} />
  );
};
