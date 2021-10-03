import { FluxStandardAction } from "flux-standard-action";
import { Issue } from "../../features/Socket/types";
import { IssuesReducerActions } from "./actions";

export type IssuesState = {
  issues: Issue[];
};

const initialIssuesState: IssuesState = {
  issues: [],
};

export const issuesReducer = (
  state: IssuesState = initialIssuesState,
  action: FluxStandardAction
): IssuesState => {
  switch (action.type) {
    case IssuesReducerActions.addIssue: {
      const newIssue = action.payload as unknown as Issue;
      return { ...state, issues: [...state.issues, newIssue] };
    }
    case IssuesReducerActions.updateIssues: {
      const newIssues = action.payload as unknown as Issue[];
      return { ...state, issues: newIssues };
    }
    case IssuesReducerActions.updateIssue: {
      const newIssue = action.payload as unknown as Issue;
      const issueIdx = state.issues.findIndex((x) => x.id === newIssue.id);
      return {
        ...state,
        issues: [
          ...state.issues.slice(0, issueIdx),
          newIssue,
          ...state.issues.slice(issueIdx + 1),
        ],
      };
    }
    case IssuesReducerActions.deleteIssue: {
      const newIssue = action.payload as unknown as Issue;
      const issueIdx = state.issues.findIndex((x) => x.id === newIssue.id);
      return {
        ...state,
        issues: [
          ...state.issues.slice(0, issueIdx),
          ...state.issues.slice(issueIdx + 1),
        ],
      };
    }
    default:
      return state;
  }
};
