import { SocketAPI } from "..";
import { IssuesModel } from "../../../../components/Issues";
import { Issue, SocketActions } from "../../types";

export const sendNewIssue = (
  socket: SocketAPI,
  newIssue: IssuesModel
): void => {
  socket.emit(SocketActions.ADD_NEW_ISSUE, [newIssue], false);
};

export const updateExistIssue = (
  socket: SocketAPI,
  updatedIssue: Issue
): void => {
  socket.emit(SocketActions.RECIEVE_UPDATED_ISSUE, [updatedIssue], false);
};

export const deleteExistIssue = (
  socket: SocketAPI,
  updatedIssue: Issue
): void => {
  socket.emit(SocketActions.RECIEVE_DELETED_ISSUE, [updatedIssue], true);
};
