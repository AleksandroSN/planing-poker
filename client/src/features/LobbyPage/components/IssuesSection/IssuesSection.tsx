import { FunctionComponent } from "react";
import "./style.scss";

interface IssuesSectionProps {
  message?: string;
}

export const IssuesSection: FunctionComponent<IssuesSectionProps> = ({
  message = "Issues Sections",
}): JSX.Element => {
  return <div className="issues__wrapper">{message}</div>;
};
