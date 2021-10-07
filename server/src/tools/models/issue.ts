import { db } from "../../db/db";
import { v4 as uuidv4 } from "uuid";
import { Issue, LobbySetting, NewIssue } from "../../types";
import { deleteSmth, getSmthById, getSmthInLobby } from "../shared";
import { getLobbySettings } from ".";

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

export const getCurrentIssue = (lobbyId: string): Promise<Issue | null> => {
  const issuesInLobby = db.issues.filter((itm) => itm.lobbyId === lobbyId);
  const index = issuesInLobby.findIndex((itm) => itm.status === "voting");
  let result: Issue | null;
  if (!index) {
    result = null;
  } else {
    result = issuesInLobby[index];
  }
  return Promise.resolve(result);
};

export const setNewCurrentIssue = (lobbyId: string): Promise<Issue[]> => {
  const settings = getLobbySettings(lobbyId) as unknown as LobbySetting;
  switch (settings.appStage) {
    case "lobby": {

    }
    case "game": {
      
    }
  } 

}
