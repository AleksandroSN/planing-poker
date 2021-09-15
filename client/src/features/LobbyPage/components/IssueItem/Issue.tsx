import { FunctionComponent } from "react";
import { AddIssue, IssueItem } from ".";
import { IssuesModel } from "../../types/interface";
import "./issue.scss";

interface IssueProps {
  issueName: string;
  link: string;
  priority: string;
  toggleModal: () => void;
  deleteIssue: () => void;
  updateIssues: (data: IssuesModel) => void;
}

export const Issue: FunctionComponent<IssueProps> = ({
  issueName,
  link,
  priority,
  toggleModal,
  deleteIssue,
  updateIssues,
}): JSX.Element => {
  if (!issueName) {
    return <AddIssue toggleModal={toggleModal} />;
  }
  return (
    <IssueItem
      key={issueName}
      issueName={issueName}
      link={link}
      priority={priority}
      deleteIssue={deleteIssue}
      updateIssues={updateIssues}
    />
  );
};
