import { FormValues } from "../../../../types/interface";
import { IssuesModel } from "../../types/interface";

export interface IssueFormHelperModel {
  addNewIssue: (data: FormValues) => void;
  updateIssue: (data: FormValues) => void;
  clearIssue: () => void;
  currentIssue: IssuesModel | undefined;
}
