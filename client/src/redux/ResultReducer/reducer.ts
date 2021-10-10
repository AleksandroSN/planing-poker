import { FluxStandardAction } from "flux-standard-action";
import { ResultReducerActions } from "./actions";

type IssueId = string;
type PlayerId = string;
type CardValue = string;

type ResultData = {
  votes: Record<PlayerId, number>;
  results: Record<CardValue, number>;
};

export type ResultState = Record<IssueId, ResultData>;

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
      const localState = state;
      if (localState[newData.issue] === undefined) {
        localState[newData.issue] = {
          votes: {},
          results: {},
        };
      }
      const newState = {
        ...localState,
        [newData.issue]: {
          results: { ...localState[newData.issue].results },
          votes: {
            ...localState[newData.issue].votes,
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
