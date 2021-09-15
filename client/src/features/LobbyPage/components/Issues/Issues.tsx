import { FunctionComponent, useState } from "react";
import { Modal } from "../../../MainPage";
import { IssuesModel } from "../../types/interface";
import { Issue } from "../IssueItem/Issue";
import { IssuesForm } from "../IssuesForm";
// import { IssuesSection } from "../IssuesSection";
import { issuesMocks } from "./issuesMocks";
import "./style.scss";

interface IssuesProps {
  message?: string;
}

export const Issues: FunctionComponent<IssuesProps> = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [issue, setIssue] = useState<IssuesModel[]>(issuesMocks);

  const toggleModal = () => {
    setOpenModal((x) => !x);
  };

  const addIssue = () => {
    const data: IssuesModel = {
      title: "test",
      link: "https://figma.com",
      priority: "High",
    };
    setIssue((arr) => [...arr, data]);
    toggleModal();
  };

  const deleteIssue = () => {
    const issueIdx = issue.findIndex((x) => x.title === "test");
    setIssue((arr) => [...arr.slice(0, issueIdx), ...arr.slice(issueIdx + 1)]);
  };

  // console.log(issue);

  const updateIssues = (data: IssuesModel) => {
    setIssue((old) => [...old, data]);
  };

  const renderIssues = issue.map(({ title, link, priority }) => {
    return (
      <Issue
        key={title}
        issueName={title}
        link={link}
        priority={priority}
        toggleModal={toggleModal}
        deleteIssue={deleteIssue}
        updateIssues={updateIssues}
      />
    );
  });
  const renderAll = [
    ...renderIssues,
    <Issue
      key={0}
      issueName=""
      link=""
      priority=""
      toggleModal={toggleModal}
      deleteIssue={deleteIssue}
      updateIssues={updateIssues}
    />,
  ];
  return (
    <section className="issues">
      <h2 className="issues__title text-xl">Issues:</h2>
      <div className="issues__wrapper">{renderAll}</div>
      <Modal
        open={openModal}
        heading="Create Issuie"
        close={toggleModal}
        handler={addIssue}
        buttonTextConfirm="Yes"
        buttonTextReject="No"
      >
        <IssuesForm />
      </Modal>
    </section>
  );
};
