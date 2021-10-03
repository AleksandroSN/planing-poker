import { useContext } from "react";
import { FormValues } from "../../../../types/interface";
import { Issue } from "../../../Socket/types";
import { IssueContext } from "../../lib/context/issueContext";
import { IssuesModel } from "../../types/interface";
import { IssueFormHelperModel } from "./types";

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
    };
    await addIssue(newIssue);
    toggleIsOpen();
  };

  const updateIssue = (data: FormValues) => {
    const newIssue: Issue = {
      id: String(currentIssue?.id),
      link: data.Link,
      title: data.Title,
      priority: data.Priority,
      lobbyId,
    };
    updateIssues(newIssue);
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
