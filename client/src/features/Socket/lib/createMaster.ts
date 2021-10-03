import { Dispatch } from "redux";
import { SocketMethods, SocketSingleton } from ".";
import {
  ChatMessage,
  Issue,
  LobbySetting,
  NewPlayer,
  Player,
  SocketActions,
} from "../types";

export const createMaster = async (
  newPlayer: NewPlayer,
  dispatch: Dispatch
): Promise<Player> => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
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
  }); // add issue
  socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, (issue: Issue) => {
    dispatch({ type: "UPDATE_ISSUE", payload: issue });
  }); // update issue
  socket.on(SocketActions.RECIEVE_DELETED_ISSUE, (issue: Issue) => {
    dispatch({ type: "DELETE_ISSUE", payload: issue });
  }); // update issue
  socket.on(SocketActions.RECIEVE_NEW_MESSAGE, (message: ChatMessage) => {
    dispatch({ type: "ADD_CHAT_MESSAGE", payload: message });
  }); // update messages
  socket.on(
    SocketActions.NOTIFY_ABOUT_APP_STAGE,
    (newLobbySettings: LobbySetting) => {
      dispatch({ type: "UPDATE_SETTINGS", payload: newLobbySettings });
    }
  );
  socket.on(
    SocketActions.NOTIFY_ABOUT_NEW_SETTINGS,
    (newLobbySettings: LobbySetting) => {
      dispatch({ type: "UPDATE_SETTINGS", payload: newLobbySettings });
    }
  );
  // TO DO change game status listener
  // update game setting master listener
  dispatch({ type: "IS_LOADING_DATA", payload: false });
  return lobby.player;
};
