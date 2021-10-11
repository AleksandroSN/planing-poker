import { SocketAPI } from "../SocketAPI";
import { SocketActions } from "../../types";

export const emitStartGame = (socket: SocketAPI, lobbyId: string): void => {
  socket.emit(SocketActions.RUN_ROUND, [lobbyId], true);
};

export const emitNextIssue = (socket: SocketAPI, lobbyId: string): void => {
  socket.emit(SocketActions.NEXT_ISSUE_FOR_VOTING, [lobbyId], true);
};
