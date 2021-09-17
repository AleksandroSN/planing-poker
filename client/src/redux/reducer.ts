import { Socket } from "socket.io-client";
import { FluxStandardAction } from "flux-standard-action";
import { combineReducers } from "redux";

interface SocketConnectionState {
  socket: Socket | undefined;
}

const initialSocketConnectionState: SocketConnectionState = {
  socket: undefined,
};

export const socketConnectionReducer = (
  state: SocketConnectionState = initialSocketConnectionState,
  action: FluxStandardAction
): SocketConnectionState => {
  switch (action.type) {
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  socketConnectionReducer,
});
