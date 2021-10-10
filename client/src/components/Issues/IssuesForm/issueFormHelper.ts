import { useContext } from "react";
import { FormValues, IssuesModel } from "../../../types/interface";
import { Issue } from "../../../features/Socket/types";
import { IssueFormHelperModel } from "./types";
import { IssueContext } from "../../../lib/context/issueContext";

export const IssueFormHelper = (): IssueFormHelperModel => {
  const {
    addIssue,
    toggleIsOpen,
    updateIssues,
    clearCurrentIssue,
    currentIssue,
    lobbyId,
  } = useContext(IssueContext);

  const addNewIssue = async (data: FormValues) => {
    const newIssue: IssuesModel = {
      link: data.Link,
      title: data.Title,
      priority: data.Priority,
      lobbyId,
      issueStatus: "created",
    };
    await addIssue(newIssue);
    toggleIsOpen();
  };

  const updateIssue = async (data: FormValues) => {
    const newIssue: Issue = {
      id: String(currentIssue?.id),
      link: data.Link,
      title: data.Title,
      priority: data.Priority,
      issueStatus: "created",
      lobbyId,
      issueStatus: "created",
    };
    await updateIssues(newIssue);
    clearCurrentIssue();
    toggleIsOpen();
  };

  const clearIssue = () => {
    clearCurrentIssue();
    toggleIsOpen();
  };

  return {
    addNewIssue,
    updateIssue,
    clearIssue,
    currentIssue,
  };
};
