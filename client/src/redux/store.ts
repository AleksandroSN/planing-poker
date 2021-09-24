import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import { Player } from "../features/Socket/types";
import { appReducer } from "./AppReducer";
import { chatMessagesReducer } from "./ChatMessagesReducer";
import { issuesReducer } from "./IssuesReducer";
import { playersReducer } from "./PlayersReducer";
import { gameSettingsReducer } from "./GameSettingsReducer";

const rootReducer = combineReducers({
  appReducer,
  playersReducer,
  issuesReducer,
  chatMessagesReducer,
  gameSettingsReducer,
});

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const Players = (state: RootState): Player[] =>
  state.playersReducer.players;
export const GameSettingsState = (state: RootState) =>
  state.gameSettingsReducer;
/* eslint-enable */
