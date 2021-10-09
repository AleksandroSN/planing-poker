import { emitStartGame } from "./socket";
import { SocketSingleton } from "../Singleton";

export const startGame = (lobbyId: string): void => {
  const socket = SocketSingleton.getInstance().getSocket();
  emitStartGame(socket, lobbyId);
};
