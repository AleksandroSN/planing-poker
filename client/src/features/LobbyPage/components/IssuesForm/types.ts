import { FormValues } from "../../../../types/interface";
import { Issue } from "../../../Socket/types";

export interface IssueFormHelperModel {
  addNewIssue: (data: FormValues) => void;
  updateIssue: (data: FormValues) => void;
  clearIssue: () => void;
  currentIssue: Issue | undefined;
}
