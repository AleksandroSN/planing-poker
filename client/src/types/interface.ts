import { Issue } from "../features/Socket/types";

export interface FormValues {
  "": string;
  "Your first name": string;
  "Your last name": string;
  "Your Job position": string;
  "Score type": string;
  "Score type (Short)": string;
  Title: string;
  Link: string;
  Priority: "Low" | "Middle" | "High";
  "Scrum master as player": boolean;
  "Changing card in round end": boolean;
  "Is timer needed": boolean;
  minutes: string;
  seconds: string;
  "Choose file": string | FileList;
  "Connect as Observer": boolean;
  ChatMessage: string;
  cardsValue: string;
}

export interface UploadResponse {
  name: string;
  path: string;
}

export interface IssueContextModel {
  isOpen: boolean;
  isMaster: boolean;
  isLobby: boolean;
  lobbyId: string;
  toggleIsOpen: () => void;
  issues: Issue[];
  currentIssue: Issue | undefined;
  addIssue: (data: IssuesModel) => Promise<void>;
  deleteIssues: (id: string) => Promise<void>;
  updateIssues: (data: Issue) => Promise<void>;
  findIssue: (id: string) => void;
  clearCurrentIssue: () => void;
}

export interface IssuesModel {
  title: string;
  link: string;
  priority: "Low" | "Middle" | "High";
  lobbyId: string;
}
