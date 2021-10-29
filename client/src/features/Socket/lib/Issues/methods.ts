import { Dispatch } from "redux";
import { SocketSingleton } from "../Singleton";
import { IssuesModel } from "../../../../types/interface";
import { Issue } from "../../types";
import { deleteExistIssue, sendNewIssue, updateExistIssue } from "./sockets";

export const addNewIssue = (
  newIssue: IssuesModel,
  dispatch: Dispatch
): void => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  sendNewIssue(socket, newIssue);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};

export const updateIssue = (newIssue: Issue, dispatch: Dispatch): void => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  updateExistIssue(socket, newIssue);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};

export const deleteIssue = (newIssue: Issue, dispatch: Dispatch): void => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  deleteExistIssue(socket, newIssue);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};
