import { Dispatch } from "redux";
import { SocketMethods } from ".";
import { SocketSingleton } from "./Singleton";

export const checkValidityLobby = async (
  lobbyID: string,
  dispatch: Dispatch
): Promise<boolean> => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  await socket.connect();
  const { isValidate } = await SocketMethods.validateLobby(lobbyID, socket);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
  return isValidate;
};
