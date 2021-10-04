import { FunctionComponent, useContext, useMemo } from "react";
import { Modal } from "../..";
import { IssueContext } from "../../../lib/context/issueContext";
import { Issue } from "../IssueItem/Issue";
import { IssuesForm } from "../IssuesForm";
import { IssueFormHelper } from "../IssuesForm/issueFormHelper";
import "./issueSection.scss";

export const IssuesSection: FunctionComponent = (): JSX.Element => {
  const { issues, isOpen, currentIssue, isMaster } = useContext(IssueContext);
  const { clearIssue } = IssueFormHelper();
  const renderIssues = issues.map(({ id, title, link, priority }) => {
    return (
      <Issue key={id} id={id} title={title} link={link} priority={priority} />
    );
  });
  const renderAll = [
    ...renderIssues,
    <Issue key={Math.random() * 50} id="" title="" link="" priority="Low" />,
  ];

  const memoRenderAll = useMemo(() => renderAll, [issues]);
  const memoRenderIssues = useMemo(() => renderIssues, [issues]);

  return (
    <>
      <Modal
        open={isOpen}
        idForm="issue-form"
        onCancel={clearIssue}
        buttonTextConfirm={currentIssue ? `Update` : "Create"}
        buttonTextCancel="Cancel"
        heading={
          currentIssue
            ? `Update Issue ${currentIssue.title}`
            : "Create new Issue"
        }
      >
        <IssuesForm />
      </Modal>
      <div className="issues__wrapper">
        {isMaster ? memoRenderAll : memoRenderIssues}
      </div>
    </>
  );
};
