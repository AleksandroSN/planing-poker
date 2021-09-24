import { Server } from "socket.io";
import { Issue, NewIssue, SocketActions } from "../../types";
import { createNewIssue, getIssuesInLobby } from "../models";

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
