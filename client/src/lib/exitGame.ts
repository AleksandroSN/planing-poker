import { Dispatch } from "redux";

export const exitGame = (dispatch: Dispatch): void => {
  dispatch({ type: "UPDATE_SETTINGS", payload: { appStage: "out" } });
};
