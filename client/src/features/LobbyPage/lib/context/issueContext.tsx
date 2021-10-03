import { createContext, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
// import { IssuesReducerActions } from "../../../../redux/IssuesReducer/actions";
import {
  GameSettingsCurrent,
  IssuesRedux,
  useAppSelector,
} from "../../../../redux/store";
import {
  addNewIssue,
  deleteIssue,
  updateIssue,
} from "../../../Socket/lib/Issues/methods";
import { Issue } from "../../../Socket/types";
import { IssueContextModel, IssuesModel } from "../../types/interface";

const DEFAULT_STATE_ISSUES: IssueContextModel = {
  isOpen: false,
  lobbyId: "",
  toggleIsOpen: () => {},
  issues: [],
  currentIssue: {
    id: "0",
    title: "",
    link: "",
    priority: "Low",
    lobbyId: "",
  },
  addIssue: async () => {},
  deleteIssues: async () => {},
  updateIssues: async () => {},
  findIssue: () => {},
  clearCurrentIssue: () => {},
};

export const IssueContext =
  createContext<IssueContextModel>(DEFAULT_STATE_ISSUES);

export const IssueContextHelper = (): IssueContextModel => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [localIssues, setIssues] = useState<Issue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<Issue>();
  const { lobbyId } = useAppSelector(GameSettingsCurrent);
  const { issues } = useAppSelector(IssuesRedux);
  const dispatch = useDispatch();
  const toggleIsOpen = useCallback(() => {
    setIsOpen((x) => !x);
  }, []);
  const addIssue = async (data: IssuesModel) => {
    await addNewIssue(data, dispatch);
  };
  const deleteIssues = async (id: string) => {
    // console.log(id);
    const issueIdx = issues.findIndex((x) => x.id === id);
    // console.log(issues[issueIdx]);
    // setIssues((arr) => [...arr.slice(0, issueIdx), ...arr.slice(issueIdx + 1)]);
    await deleteIssue(issues[issueIdx], dispatch);
  };
  const updateIssues = async (data: Issue) => {
    await updateIssue(data, dispatch);
  };
  const findIssue = (id: string) => {
    const curIs = issues.find((el) => el.id === id);
    if (curIs) {
      setCurrentIssue(curIs);
    }
  };
  const clearCurrentIssue = () => {
    setCurrentIssue(undefined);
  };
  return {
    isOpen,
    lobbyId,
    toggleIsOpen,
    issues,
    addIssue,
    deleteIssues,
    updateIssues,
    currentIssue,
    findIssue,
    clearCurrentIssue,
  };
};
