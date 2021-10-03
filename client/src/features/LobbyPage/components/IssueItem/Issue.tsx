import { FunctionComponent, useContext } from "react";
import { IssueItem } from "./IssueItem";
import { AddIssue } from "./AddIssue";
import { IssueContext } from "../../lib/context/issueContext";
import "./issue.scss";

interface IssueProps {
  id: string;
  title: string;
  link: string;
  priority: "Low" | "Middle" | "Hight";
}

export const Issue: FunctionComponent<IssueProps> = ({
  id,
  title,
  link,
  priority,
}): JSX.Element => {
  const { toggleIsOpen } = useContext(IssueContext);

  if (!title) {
    return <AddIssue toggleModal={toggleIsOpen} />;
  }
  return (
    <IssueItem
      key={title}
      id={id}
      issueName={title}
      link={link}
      priority={priority}
    />
  );
};
