export interface CoversDataModel {
  idx: number;
  selected: null | boolean;
}

export interface CardsValueModel {
  scoreTypeShort: string;
  value: string;
}
export interface IssuesModel {
  id: number;
  title: string;
  link: string;
  priority: string;
}

export interface IssueContextModel {
  isOpen: boolean;
  toggleIsOpen: () => void;
  issues: IssuesModel[];
  newIssue: Record<string, IssuesModel>;
  addIssue: (data: IssuesModel) => void;
  deleteIssue: (data: IssuesModel) => void;
  updateIssues: (data: IssuesModel) => void;
}
