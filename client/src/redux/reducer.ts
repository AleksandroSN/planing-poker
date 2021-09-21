import { FluxStandardAction } from "flux-standard-action";
import { combineReducers } from "redux";
import { ChatMessage, Issue, Player } from "../features/Socket/types";

type AppState = {
  isLoading: boolean;
  isError: boolean;
};

type PlayersState = {
  players: Player[];
};

type IssuesState = {
  issues: Issue[];
};

type ChatMessagesState = {
  chatMessages: ChatMessage[];
};

const initialAppState: AppState = {
  isLoading: false,
  isError: false,
};

const initialPlayerState: PlayersState = {
  players: [],
};

const initialIssuesState: IssuesState = {
  issues: [],
};

const initialChatMessagesState: ChatMessagesState = {
  chatMessages: [],
};

export const appReducer = (
  state: AppState = initialAppState,
  action: FluxStandardAction
): AppState => {
  switch (action.type) {
    case "IS_LOADING_DATA": {
      const isLoading = action.payload as unknown as boolean;
      return { ...state, isLoading };
    }
    case "IS_ERROR_HAPPEND": {
      const isError = action.payload as unknown as boolean;
      return { ...state, isError };
    }
    default:
      return state;
  }
};

export const playersReducer = (
  state: PlayersState = initialPlayerState,
  action: FluxStandardAction
): PlayersState => {
  switch (action.type) {
    case "ADD_PLAYER": {
      const newPlayer = action.payload as unknown as Player;
      return { ...state, players: [...state.players, newPlayer] };
    }
    case "UPDATE_PLAYERS": {
      const newPlayers = action.payload as unknown as Player[];
      return { ...state, players: newPlayers };
    }
    default:
      return state;
  }
};

export const issuesReducer = (
  state: IssuesState = initialIssuesState,
  action: FluxStandardAction
): IssuesState => {
  switch (action.type) {
    case "ADD_ISSUE": {
      const newIssue = action.payload as unknown as Issue;
      return { ...state, issues: [...state.issues, newIssue] };
    }
    case "UPDATE_ISSUES": {
      const newIssues = action.payload as unknown as Issue[];
      return { ...state, issues: newIssues };
    }
    default:
      return state;
  }
};

export const chatMessagesReducer = (
  state: ChatMessagesState = initialChatMessagesState,
  action: FluxStandardAction
): ChatMessagesState => {
  switch (action.type) {
    case "ADD_CHAT_MESSAGE": {
      const newMessage = action.payload as unknown as ChatMessage;
      return { ...state, chatMessages: [...state.chatMessages, newMessage] };
    }
    case "UPDATE_CHAT_MESSAGES": {
      const newMessages = action.payload as unknown as ChatMessage[];
      return { ...state, chatMessages: newMessages };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  appReducer,
  playersReducer,
  issuesReducer,
  chatMessagesReducer,
});
