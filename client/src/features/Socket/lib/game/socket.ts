import { SocketAPI } from "../SocketAPI";
import { Issue, SocketActions } from "../../types";

export const runGame = (socket: SocketAPI, issue: Issue): void => {
  socket.emit(SocketActions.RUN_ROUND, [issue], false);
};
