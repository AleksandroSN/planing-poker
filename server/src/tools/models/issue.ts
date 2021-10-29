import { db } from "../../db/db";
import { v4 as uuidv4 } from "uuid";
import { Issue, NewIssue } from "../../types";
import { deleteSmth, getSmthById, getSmthInLobby } from "../shared";

export const getIssuesInLobby = (lobby: string): Promise<Issue[]> => {
  return getSmthInLobby(lobby, db.issues);
};

export const getIssueById = (issueId: string): Promise<Issue | false> => {
  return getSmthById(issueId, db.issues);
};

export const getVotingIssue = async (lobby: string): Promise<Issue> => {
  const issuesInLobby = await getSmthInLobby(lobby, db.issues);
  const index = issuesInLobby.findIndex(
    (issue) => issue.issueStatus === "voting"
  );
  return Promise.resolve(issuesInLobby[index]);
};

export const createNewIssue = (newIssue: NewIssue): Promise<Issue> => {
  const issue = {
    ...newIssue,
    id: uuidv4(),
  };
  db.issues.push(issue);
  return Promise.resolve(issue);
};

export const updateIssueMd = (issue: Issue): Promise<Issue> => {
  deleteSmth(issue.id, db.issues);
  db.issues.push(issue);
  return Promise.resolve(issue);
};

export const deleteIssueMd = (issueId: string): Promise<Issue | false> => {
  return deleteSmth(issueId, db.issues);
};

export const getCurrentIssue = (lobbyId: string): Promise<Issue | null> => {
  const issuesInLobby = db.issues.filter((itm) => itm.lobbyId === lobbyId);
  const index = issuesInLobby.findIndex((itm) => itm.issueStatus === "voting");
  let result: Issue | null;
  if (!index) {
    result = null;
  } else {
    result = issuesInLobby[index];
  }
  return Promise.resolve(result);
};

export const setNewCurrentIssue = (lobbyId: string): Promise<Issue[]> => {
  const issues = db.issues.filter((itm) => itm.lobbyId === lobbyId);
  const currentVotingIndex = issues.findIndex(
    (itm) => itm.issueStatus === "voting"
  );
  issues[currentVotingIndex].issueStatus = "voted";
  const newVotingIndex = issues.findIndex(
    (itm) => itm.issueStatus === "created"
  );
  if (newVotingIndex < 0) {
    return Promise.resolve(issues);
  }
  issues[newVotingIndex].issueStatus = "voting";
  return Promise.resolve(issues);
};
