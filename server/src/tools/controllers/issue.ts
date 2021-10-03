import { Server } from "socket.io";
import { Issue, NewIssue, SocketActions } from "../../types";
import {
  createNewIssue,
  deleteIssueMd,
  getIssuesInLobby,
  updateIssueMd,
} from "../models";

export const addNewIssue = async (
  io: Server,
  newIssie: NewIssue
): Promise<void> => {
  const issue = await createNewIssue(newIssie);
  io.to(issue.lobbyId).emit(SocketActions.RECIEVE_NEW_ISSUE, issue);
};

export const getLobbyIssues = async (
  lobbyId: string,
  callback: (issues: Issue[]) => void
): Promise<void> => {
  const issues = await getIssuesInLobby(lobbyId);
  callback(issues);
};

export const updateIssue = async (io: Server, issue: Issue): Promise<void> => {
  await updateIssueMd(issue);
  io.to(issue.lobbyId).emit(SocketActions.RECIEVE_UPDATED_ISSUE, issue);
};

export const deleteIssue = async (io: Server, issue: Issue): Promise<void> => {
  await deleteIssueMd(issue.id);
  io.to(issue.lobbyId).emit(SocketActions.RECIEVE_DELETED_ISSUE, issue);
};
