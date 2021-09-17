import { useContext } from "react";
import { FormValues } from "../../../../types/interface";
import { IssueContext } from "../../lib/context/issueContext";
import { IssuesModel } from "../../types/interface";
import { IssueFormHelperModel } from "./types";

export const IssueFormHelper = (): IssueFormHelperModel => {
  const {
    addIssue,
    toggleIsOpen,
    updateIssues,
    clearCurrentIssue,
    issues,
    currentIssue,
  } = useContext(IssueContext);

  const addNewIssue = (data: FormValues) => {
    const newIssue: IssuesModel = {
      id: issues.length + 1,
      link: data["Link:"],
      title: data["Title:"],
      priority: data["Priority:"],
    };
    addIssue(newIssue);
    toggleIsOpen();
  };

  const updateIssue = (data: FormValues) => {
    const newIssue: IssuesModel = {
      id: currentIssue?.id as number,
      link: data["Link:"],
      title: data["Title:"],
      priority: data["Priority:"],
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
