import { FluxStandardAction } from "flux-standard-action";
import { Player } from "../../features/Socket/types";
import { AppReducerActions } from "./actions";

type KickVoteStart = {
  isVisible: boolean;
  victim?: Player;
};

type KickSuggestStart = {
  isVisible: boolean;
  initiator?: Player;
  victim?: Player;
};

export type AppState = {
  isLoading: boolean;
  isError: boolean;
  chatOpen: boolean;
  kickVoteStart: KickVoteStart;
  kickVoteSuggest: KickSuggestStart;
  kickMemberNotify: boolean;
};

const initialAppState: AppState = {
  isLoading: false,
  isError: false,
  chatOpen: false,
  kickVoteStart: {
    isVisible: false,
  },
  kickVoteSuggest: {
    isVisible: false,
  },
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
      const kickVoteStart = action.payload as unknown as KickVoteStart;
      return { ...state, kickVoteStart };
    }
    case AppReducerActions.kickVoteSuggest: {
      const kickVoteSuggest = action.payload as unknown as KickSuggestStart;
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
