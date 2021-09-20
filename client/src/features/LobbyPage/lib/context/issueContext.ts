import { createContext, useCallback, useState } from "react";
import { issuesMocks } from "../../components/Issues/issuesMocks";
import { IssueContextModel, IssuesModel } from "../../types/interface";

const DEFAULT_STATE_ISSUES: IssueContextModel = {
  isOpen: false,
  toggleIsOpen: () => {},
  issues: [],
  currentIssue: {
    id: 0,
    title: "",
    link: "",
    priority: "low",
  },
  addIssue: () => {},
  deleteIssue: () => {},
  updateIssues: () => {},
  findIssue: () => {},
  clearCurrentIssue: () => {},
};

export const IssueContext =
  createContext<IssueContextModel>(DEFAULT_STATE_ISSUES);

export const IssueContextHelper = (): IssueContextModel => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [issues, setIssues] = useState<IssuesModel[]>(issuesMocks);
  const [currentIssue, setCurrentIssue] = useState<IssuesModel>();
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
  const findIssue = useCallback(
    (id: number) => {
      const curIs = issues.find((el) => el.id === id);
      if (curIs) {
        setCurrentIssue(curIs);
      }
    },
    [issues]
  );
  const clearCurrentIssue = useCallback(() => {
    setCurrentIssue(undefined);
  }, []);
  return {
    isOpen,
    toggleIsOpen,
    issues,
    addIssue,
    deleteIssue,
    updateIssues,
    currentIssue,
    findIssue,
    clearCurrentIssue,
  };
};
