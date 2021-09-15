import { FunctionComponent, useContext } from "react";
import { IssueItem } from "./IssueItem";
import { AddIssue } from "./AddIssue";
import "./issue.scss";
import { IssueContext } from "../../lib/context/issueContext";

interface IssueProps {
  id: number;
  issueName: string;
  link: string;
  priority: string;
}

export const Issue: FunctionComponent<IssueProps> = ({
  id,
  issueName,
  link,
  priority,
}): JSX.Element => {
  const { toggleIsOpen, deleteIssue, updateIssues } = useContext(IssueContext);

  if (!issueName) {
    return <AddIssue toggleModal={toggleIsOpen} />;
  }
  return (
    <IssueItem
      key={issueName}
      id={id}
      issueName={issueName}
      link={link}
      priority={priority}
      deleteIssue={deleteIssue}
      updateIssues={updateIssues}
    />
  );
};
