import { Issue } from "../../Socket/types";

export interface CoversDataModel {
  idx: number;
  selected: null | boolean;
}

export interface CardsValueModel {
  // scoreTypeShort: string;
  value: string;
}
export interface IssuesModel {
  title: string;
  link: string;
  priority: "Low" | "Middle" | "Hight";
  lobbyId: string;
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
