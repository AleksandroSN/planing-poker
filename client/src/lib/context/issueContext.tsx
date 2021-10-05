import { useState, useCallback, createContext } from "react";
import { useDispatch } from "react-redux";
import { isReallyYou } from "..";
import {
  addNewIssue,
  deleteIssue,
  updateIssue,
} from "../../features/Socket/lib/Issues/methods";
import { Issue } from "../../features/Socket/types";
import {
  useAppSelector,
  GameSettingsCurrent,
  IssuesRedux,
} from "../../redux/store";
import { IssueContextModel, IssuesModel } from "../../types/interface";

const DEFAULT_STATE_ISSUES: IssueContextModel = {
  isOpen: false,
  isMaster: false,
  isLobby: true,
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
  const [currentIssue, setCurrentIssue] = useState<Issue>();
  const { lobbyId, masterId, appStage } = useAppSelector(GameSettingsCurrent);
  const { issues } = useAppSelector(IssuesRedux);
  const dispatch = useDispatch();
  const toggleIsOpen = useCallback(() => {
    setIsOpen((x) => !x);
  }, []);
  const isMaster = isReallyYou(masterId);
  const isLobby = appStage === "lobby";
  const addIssue = async (data: IssuesModel) => {
    await addNewIssue(data, dispatch);
  };
  const deleteIssues = async (id: string) => {
    const issueIdx = issues.findIndex((x) => x.id === id);
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
    isMaster,
    isLobby,
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
