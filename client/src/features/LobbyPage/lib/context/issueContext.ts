import { createContext, useCallback, useState } from "react";
import { issuesMocks } from "../../components/Issues/issuesMocks";
import { IssueContextModel, IssuesModel } from "../../types/interface";

const DEFAULT_STATE_ISSUES: IssueContextModel = {
  isOpen: false,
  toggleIsOpen: () => {},
  issues: [],
  newIssue: {},
  addIssue: () => {},
  deleteIssue: () => {},
  updateIssues: () => {},
};

export const IssueContext =
  createContext<IssueContextModel>(DEFAULT_STATE_ISSUES);

export const IssueContextHelper = (): IssueContextModel => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [issues, setIssues] = useState<IssuesModel[]>(issuesMocks);
  const [newIssue, setNewIssue] = useState<Record<string, IssuesModel>>({});
  const toggleIsOpen = useCallback(() => {
    setIsOpen((x) => !x);
  }, []);
  const addIssue = useCallback((data: IssuesModel) => {
    setIssues((arr) => [...arr, data]);
  }, []);
  const deleteIssue = useCallback(
    (data: IssuesModel) => {
      const issueIdx = issues.findIndex((x) => x.title === data.title);
      setIssues((arr) => [
        ...arr.slice(0, issueIdx),
        ...arr.slice(issueIdx + 1),
      ]);
    },
    [issues]
  );
  const updateIssues = useCallback(
    (data: IssuesModel) => {
      const issueIdx = issues.findIndex((x) => x.id === data.id);
      setIssues((arr) => [
        ...arr.slice(0, issueIdx),
        data,
        ...arr.slice(issueIdx + 1),
      ]);
    },
    [issues]
  );
  return {
    isOpen,
    toggleIsOpen,
    issues,
    newIssue,
    addIssue,
    deleteIssue,
    updateIssues,
  };
};
