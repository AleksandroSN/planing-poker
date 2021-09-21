import { createStore } from "redux";
import { rootReducer } from "./reducer";

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
