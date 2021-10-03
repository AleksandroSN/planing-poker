import { FunctionComponent, useContext } from "react";
import { IssueContext } from "../../lib/context/issueContext";
import "./issue.scss";

interface IssueProps {
  id: string;
  issueName: string;
  link: string;
  priority: "Low" | "Middle" | "Hight";
}

export const IssueItem: FunctionComponent<IssueProps> = ({
  id,
  issueName,
  link,
  priority,
}): JSX.Element => {
  const { toggleIsOpen, deleteIssues, findIssue } = useContext(IssueContext);

  const updateIssue = () => {
    findIssue(id);
    toggleIsOpen();
  };

  return (
    <div className="issues__item">
      <div className="issues__item-row">
        <a href={link} className="issues__item-name">{`Issue ${issueName}`}</a>
        <div className="issues__item-buttons">
          <button type="button" onClick={updateIssue}>
            <img src="../icons/edit.svg" alt="edit issue" />
          </button>
          <button type="button" onClick={() => deleteIssues(id)}>
            <img src="../icons/trash.svg" alt="delete issue" />
          </button>
        </div>
      </div>
      <div className="issues__item-subrow">{`${priority} priority`}</div>
    </div>
  );
};
