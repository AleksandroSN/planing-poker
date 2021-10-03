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
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
} from "./getAndPutData";

export const createMember = async (
  newPlayer: NewPlayer,
  currentLobby: LobbySetting,
  dispatch: Dispatch
): Promise<Player> => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  // await socket.connect();
  const lobby = await SocketMethods.connectToLobby(
    socket,
    newPlayer,
    currentLobby
  );
  dispatch({ type: "ADD_PLAYER", payload: lobby.player });
  dispatch({ type: "UPDATE_SETTINGS", payload: lobby.initLobbySettings });
  const lobbyMembers = await getLobbyPlayers(socket, lobby.player);
  dispatch({ type: "UPDATE_PLAYERS", payload: lobbyMembers });
  const lobbyIssues = await getLobbyIssues(socket, lobby.player);
  dispatch({ type: "UPDATE_ISSUES", payload: lobbyIssues });
  const lobbyMessages = await getLobbyMessages(socket, lobby.player, "0", 20);
  dispatch({ type: "UPDATE_CHAT_MESSAGES", payload: lobbyMessages });
  socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
    dispatch({ type: "ADD_PLAYER", payload: player });
  }); // update members
  socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
    dispatch({ type: "ADD_ISSUE", payload: issue });
  }); // update issue
  socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, (issue: Issue) => {
    dispatch({ type: "UPDATE_ISSUE", payload: issue });
  });
  socket.on(SocketActions.RECIEVE_DELETED_ISSUE, (issue: Issue) => {
    dispatch({ type: "DELETE_ISSUE", payload: issue });
  });
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
