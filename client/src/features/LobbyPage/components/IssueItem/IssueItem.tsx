import { FunctionComponent } from "react";
import { IssuesModel } from "../../types/interface";
import "./issue.scss";

interface IssueProps {
  issueName: string;
  link: string;
  priority: string;
  deleteIssue: () => void;
  updateIssues: (data: IssuesModel) => void;
}

export const IssueItem: FunctionComponent<IssueProps> = ({
  issueName,
  link,
  priority,
  deleteIssue,
  updateIssues,
}): JSX.Element => {
  return (
    <div className="issues__item">
      <div className="issues__item-row">
        <a href={link} className="issues__item-name">{`Issue ${issueName}`}</a>
        <div className="issues__item-buttons">
          <button
            type="button"
            onClick={() =>
              updateIssues({ title: "randomName", link, priority })
            }
          >
            <img src="./icons/edit.svg" alt="edit issue" />
          </button>
          <button type="button" onClick={deleteIssue}>
            <img src="./icons/trash.svg" alt="delete issue" />
          </button>
        </div>
      </div>
      <div className="issues__item-subrow">{`${priority} priority`}</div>
    </div>
  );
};
