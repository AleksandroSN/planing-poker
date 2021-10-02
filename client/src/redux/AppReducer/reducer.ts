import { FluxStandardAction } from "flux-standard-action";
import { AppReducerActions } from "./actions";

export type AppState = {
  isLoading: boolean;
  isError: boolean;
  chatOpen: boolean;
};

const initialAppState: AppState = {
  isLoading: false,
  isError: false,
  chatOpen: false,
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
    default:
      return state;
  }
};
