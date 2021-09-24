// to do add in callback and call in click

import { Dispatch } from "redux";
import { SocketMethods, SocketSingleton } from ".";
import { NewPlayer, Player, SocketActions } from "../types";

export const createMaster = async (
  newPlayer: NewPlayer,
  dispatch: Dispatch
): Promise<void> => {
  const socket = SocketSingleton.getInstance().getSocket();
  await socket.connect();
  const lobby = await SocketMethods.createNewLobby(socket, newPlayer);
  dispatch({ type: "ADD_PLAYER", payload: lobby.player });
  dispatch({ type: "UPDATE_SETTINGS", payload: lobby.initLobbySettings });
  // socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
  // });
};
