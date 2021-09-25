// to do add in callback and call in click

import { Dispatch } from "redux";
import { SocketMethods, SocketSingleton } from ".";
import { ChatMessage, Issue, NewPlayer, Player, SocketActions } from "../types";

export const createMaster = async (
  newPlayer: NewPlayer,
  dispatch: Dispatch
): Promise<void> => {
  const socket = SocketSingleton.getInstance().getSocket();
  await socket.connect();
  const lobby = await SocketMethods.createNewLobby(socket, newPlayer);
  dispatch({ type: "ADD_PLAYER", payload: lobby.player });
  dispatch({ type: "UPDATE_SETTINGS", payload: lobby.initLobbySettings });
  socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
    dispatch({ type: "ADD_PLAYER", payload: player });
  }); // update members
  socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
    dispatch({ type: "ADD_ISSUE", payload: issue });
  }); // update issue
  socket.on(SocketActions.RECIEVE_NEW_MESSAGE, (message: ChatMessage) => {
    dispatch({ type: "ADD_CHAT_MESSAGE", payload: message });
  }); // update messages
  // TO DO change game status listener
  // update game setting master listener
};
