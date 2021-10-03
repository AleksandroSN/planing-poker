import { FluxStandardAction } from "flux-standard-action";
import { AppReducerActions } from "./actions";

export type AppState = {
  isLoading: boolean;
  isError: boolean;
  chatOpen: boolean;
  kickVoteStart: boolean;
  kickVoteSuggest: boolean;
  kickMemberNotify: boolean;
};

const initialAppState: AppState = {
  isLoading: false,
  isError: false,
  chatOpen: false,
  kickVoteStart: false,
  kickVoteSuggest: false,
  kickMemberNotify: false,
};

export const appReducer = (
  state: AppState = initialAppState,
  action: FluxStandardAction
): AppState => {
  switch (action.type) {
    case AppReducerActions.loadData: {
      const isLoading = action.payload as unknown as boolean;
      return { ...state, isLoading };
    }
    case AppReducerActions.errorHappend: {
      const isError = action.payload as unknown as boolean;
      return { ...state, isError };
    }
    case AppReducerActions.toggleChatState: {
      const { chatOpen } = action.payload as unknown as AppState;
      return { ...state, chatOpen };
    }
    case AppReducerActions.kickVoteStart: {
      const kickVoteStart = action.payload as unknown as boolean;
      return { ...state, kickVoteStart };
    }
    case AppReducerActions.kickVoteSuggest: {
      const kickVoteSuggest = action.payload as unknown as boolean;
      return { ...state, kickVoteSuggest };
    }
    case AppReducerActions.kickMemberNotify: {
      const kickMemberNotify = action.payload as unknown as boolean;
      return { ...state, kickMemberNotify };
    }
    default:
      return state;
  }
};
