import { FunctionComponent } from "react";
import "./style.scss";

interface IssueProps {
  message?: string;
}

export const Issue: FunctionComponent<IssueProps> = ({
  message = "Hello",
}): JSX.Element => {
  return <div className="issues__item">{message}</div>;
};
