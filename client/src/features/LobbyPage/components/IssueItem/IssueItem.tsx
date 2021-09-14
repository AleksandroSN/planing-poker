import { FunctionComponent } from "react";
import "./issue.scss";

interface IssueProps {
  issueName: string;
  priority: string;
}

export const IssueItem: FunctionComponent<IssueProps> = ({
  issueName,
  priority,
}): JSX.Element => {
  return (
    <div className="issues__item">
      <div className="issues__item-row">
        <div className="issues__item-name">{`Issue ${issueName}`}</div>
        <div className="issues__item-buttons">
          <button type="button">
            <img src="./icons/edit.svg" alt="edit issue" />
          </button>
          <button type="button">
            <img src="./icons/trash.svg" alt="delete issue" />
          </button>
        </div>
      </div>
      <div className="issues__item-subrow">{`${priority} priority`}</div>
    </div>
  );
};
