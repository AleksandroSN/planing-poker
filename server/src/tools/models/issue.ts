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
