import { FunctionComponent, useState } from "react";
import { IssuesModel } from "../../types/interface";
import { Issue } from "../IssueItem";
import { issuesMocks } from "./issuesMocks";
import "./issueSection.scss";

interface IssuesSectionProps {
  message?: string;
}

export const IssuesSection: FunctionComponent<IssuesSectionProps> =
  (): JSX.Element => {
    const [issue, setIssue] = useState<IssuesModel[]>(issuesMocks);

    const renderIssues = issue.map(({ name, priority }) => {
      return <Issue key={name} issueName={name} priority={priority} />;
    });
    const renderAll = [
      ...renderIssues,
      <Issue key={0} issueName="" priority="" />,
    ];
    return <div className="issues__wrapper">{renderAll}</div>;
  };
