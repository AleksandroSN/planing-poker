import { FluxStandardAction } from "flux-standard-action";
import { AppReducerActions } from "./actions";

type AppState = {
  isLoading: boolean;
  isError: boolean;
};

const initialAppState: AppState = {
  isLoading: false,
  isError: false,
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
    default:
      return state;
  }
};
