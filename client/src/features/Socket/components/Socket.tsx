import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
} from "../lib/getAndPutData";
import { SocketSingleton } from "../lib/Singleton";
import { ChatMessage, Issue, Player, SocketActions } from "../types";

export const Socket = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.player) {
        dispatch({ action: "IS_LOADING_DATA", payload: true });

        const localPlayer = JSON.parse(localStorage.player) as Player;
        const socket = SocketSingleton.getInstance().getSocket();
        await socket.connect();
        socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
          dispatch({ action: "ADD_PLAYER", payload: player });
        });
        socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
          dispatch({ action: "ADD_ISSUE", payload: issue });
        });
        socket.on(SocketActions.RECIEVE_NEW_MESSAGE, (message: ChatMessage) => {
          dispatch({ action: "ADD_CHAT_MESSAGE", payload: message });
        });
        const lobbyMembers = await getLobbyPlayers(socket, localPlayer);
        dispatch({ action: "UPDATE_PLAYERS", payload: lobbyMembers });
        const lobbyIssues = await getLobbyIssues(socket, localPlayer);
        dispatch({ action: "UPDATE_ISSUES", payload: lobbyIssues });
        const lobbyMessages = await getLobbyMessages(
          socket,
          localPlayer,
          "0",
          20
        );
        dispatch({ action: "UPDATE_CHAT_MESSAGES", payload: lobbyMessages });

        dispatch({ action: "IS_LOADING_DATA", payload: false });
      }
    })();
  });
  return <></>;
};
