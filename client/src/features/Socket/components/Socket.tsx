import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
  getLobbySettings,
  reconnectToLobby,
} from "../lib/getAndPutData";
import { SocketSingleton } from "../lib";
import {
  ChatMessage,
  Issue,
  LobbySetting,
  Player,
  SocketActions,
} from "../types";

export const Socket = (): JSX.Element => {
  const dispatch = useDispatch();

  // TO DO add data for timer in redux
  // add socket tik-tak

  useEffect(() => {
    (async () => {
      if (sessionStorage.player) {
        dispatch({ type: "IS_LOADING_DATA", payload: true });

        const localPlayer = JSON.parse(sessionStorage.player) as Player;
        dispatch({
          type: "UPDATE_SETTINGS",
          payload: { lobbyId: localPlayer.lobbyId },
        });
        const socket = SocketSingleton.getInstance().getSocket();
        await socket.connect();
        await reconnectToLobby(localPlayer, socket);

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
        const LobbySettings = await getLobbySettings(
          socket,
          localPlayer.lobbyId
        );
        dispatch({
          type: "UPDATE_SETTINGS",
          payload: LobbySettings.lobbySettings,
        });
        const lobbyMembers = await getLobbyPlayers(socket, localPlayer);
        dispatch({ type: "UPDATE_PLAYERS", payload: lobbyMembers });
        const lobbyIssues = await getLobbyIssues(socket, localPlayer);
        dispatch({ type: "UPDATE_ISSUES", payload: lobbyIssues });
        const lobbyMessages = await getLobbyMessages(
          socket,
          localPlayer,
          "0",
          20
        );
        dispatch({ type: "UPDATE_CHAT_MESSAGES", payload: lobbyMessages });

        dispatch({ type: "IS_LOADING_DATA", payload: false });
      }
    })();
  });
  return <></>;
};
