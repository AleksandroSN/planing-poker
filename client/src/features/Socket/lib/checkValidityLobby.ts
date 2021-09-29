import { SocketMethods } from ".";
import { SocketSingleton } from "./Singleton";

export const checkValidityLobby = async (lobbyID: string): Promise<boolean> => {
  const socket = SocketSingleton.getInstance().getSocket();
  await socket.connect();
  const { isValidate } = await SocketMethods.validateLobby(lobbyID, socket);
  return isValidate;
};
