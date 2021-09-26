import { FluxStandardAction } from "flux-standard-action";
import { Issue } from "../../features/Socket/types";
import { IssuesReducerActions } from "./actions";

type IssuesState = {
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
    default:
      return state;
  }
};
