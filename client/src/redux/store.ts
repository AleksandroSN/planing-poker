import { combineReducers, createStore } from "redux";
import { appReducer } from "./AppReducer";
import { chatMessagesReducer } from "./ChatMessagesReducer";
import { issuesReducer } from "./IssuesReducer";
import { playersReducer } from "./PlayersReducer";

const rootReducer = combineReducers({
  appReducer,
  playersReducer,
  issuesReducer,
  chatMessagesReducer,
});

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
