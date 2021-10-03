import { IssuesModel } from "../components/Issues";
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
  Priority: "Low" | "Middle" | "Hight";
  "Scrum master as player": string;
  "Changing card in round end": string;
  "Is timer needed": string;
  minutes: string;
  seconds: string;
  "Choose file": string | FileList;
  "Connect as Observer": string;
  ChatMessage: string;
}

export interface UploadResponse {
  name: string;
  path: string;
}

export interface IssueContextModel {
  isOpen: boolean;
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
