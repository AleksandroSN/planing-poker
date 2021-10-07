import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, createStore, StoreEnhancer } from "redux";
import { Player } from "../features/Socket/types";
import { appReducer } from "./AppReducer";
import { chatMessagesReducer } from "./ChatMessagesReducer";
import { issuesReducer } from "./IssuesReducer";
import { playersReducer } from "./PlayersReducer";
import { gameSettingsReducer } from "./GameSettingsReducer";
import { GameSettingsState } from "./GameSettingsReducer/reducer";
import { AppState } from "./AppReducer/reducer";
import { ChatMessagesState } from "./ChatMessagesReducer/reducer";
import { IssuesState } from "./IssuesReducer/reducer";
import { ResultReducer } from "./ResultReducer";
import { ResultState } from "./ResultReducer/reducer";

const rootReducer = combineReducers({
  appReducer,
  playersReducer,
  issuesReducer,
  chatMessagesReducer,
  gameSettingsReducer,
  ResultReducer,
});

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<
    unknown,
    Record<string, unknown>
  >;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return "__REDUX_DEVTOOLS_EXTENSION__" in arg;
};

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer,
  isReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const Players = (state: RootState): Player[] =>
  state.playersReducer.players;
export const GameSettingsCurrent = (state: RootState): GameSettingsState =>
  state.gameSettingsReducer;
export const AppSettings = (state: RootState): AppState => state.appReducer;
export const ChatMessage = (state: RootState): ChatMessagesState => {
  return state.chatMessagesReducer;
};
export const IssuesRedux = (state: RootState): IssuesState => {
  return state.issuesReducer;
};
export const ResultRedux = (state: RootState): ResultState => {
  return state.ResultReducer;
};
