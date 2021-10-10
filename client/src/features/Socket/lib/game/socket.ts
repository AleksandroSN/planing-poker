import { SocketAPI } from "../SocketAPI";
import { SocketActions } from "../../types";

export const emitStartGame = (socket: SocketAPI, lobbyId: string): void => {
  socket.emit(SocketActions.RUN_ROUND, [lobbyId], true);
};
