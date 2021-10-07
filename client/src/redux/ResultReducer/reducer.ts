import { FluxStandardAction } from "flux-standard-action";
import { ResultReducerActions } from "./actions";

type ResultData = {
  votes: Record<string, number>;
  results: Record<string, number>;
};

export type ResultState = Record<string, ResultData>;

const initialResultState: ResultState = {};

type Vote = {
  issue: string;
  player: string;
  value: number;
};

type IssueResult = {
  issue: string; // issueId
  results: ResultData;
};

export const ResultReducer = (
  state: ResultState = initialResultState,
  action: FluxStandardAction
): ResultState => {
  switch (action.type) {
    case ResultReducerActions.addNewVoteForIssue: {
      const newData = action.payload as unknown as Vote;
      const newState = {
        ...state,
        [newData.issue]: {
          results: { ...state[newData.issue].results },
          votes: {
            ...state[newData.issue].votes,
            [newData.player]: newData.value,
          },
        },
      };
      return newState;
    }
    case ResultReducerActions.updateIssueVotingResult: {
      const newData = action.payload as unknown as IssueResult;
      const newState = {
        ...state,
        [newData.issue]: {
          results: newData.results.results,
          votes: newData.results.votes,
        },
      };
      return newState;
    }
    case ResultReducerActions.updateIssuesVotingResult: {
      const newData = action.payload as unknown as ResultState;
      return newData;
    }
    default:
      return state;
  }
};
