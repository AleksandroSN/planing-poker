import { FunctionComponent } from "react";
import "./style.scss";

interface IssueProps {
  issueName: string;
  priority: string;
}

export const Issue: FunctionComponent<IssueProps> = ({
  issueName,
  priority,
}): JSX.Element => {
  return (
    <div className="issues__item">
      <div className="issues__item-row">
        <div className="issues__item-name">{`Issue ${issueName}`}</div>
        <div className="issues__item-buttons">
          <button type="button">1</button>
          <button type="button">2</button>
        </div>
      </div>
      <div className="issues__item-subrow">{`${priority} priority`}</div>
    </div>
  );
};
