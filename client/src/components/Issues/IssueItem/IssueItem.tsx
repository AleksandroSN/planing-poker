import { FunctionComponent, useContext } from "react";
import { IssueContext } from "../../../lib/context/issueContext";
import "./issue.scss";

interface IssueProps {
  id: string;
  issueName: string;
  link: string;
  priority: "Low" | "Middle" | "High";
  issueStatus: "created" | "voting" | "voted";
}

export const IssueItem: FunctionComponent<IssueProps> = ({
  id,
  issueName,
  link,
  priority,
  issueStatus,
}): JSX.Element => {
  const { toggleIsOpen, deleteIssues, findIssue, isMaster, appStage } =
    useContext(IssueContext);

  const updateIssue = () => {
    findIssue(id);
    toggleIsOpen();
  };

  const toggleClass = (): string => {
    if (issueStatus === "voting") {
      return "window issues__item voting";
    }
    if (issueStatus === "voted") {
      return "window issues__item voted";
    }
    return "window issues__item";
  };

  return (
    <div className={toggleClass()}>
      <div className="issues__item-row">
        <a href={link} className="issues__item-name">{`Issue ${issueName}`}</a>
        <div className="issues__item-buttons">
          {appStage === "lobby" && (
            <button type="button" onClick={updateIssue}>
              <img src="../icons/edit.svg" alt="edit issue" />
            </button>
          )}
          {isMaster && issueStatus !== "voting" && (
            <button type="button" onClick={() => deleteIssues(id)}>
              <img src="../icons/trash.svg" alt="delete issue" />
            </button>
          )}
        </div>
      </div>
      <div className="issues__item-subrow">{`${priority} priority`}</div>
    </div>
  );
};
