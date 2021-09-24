import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
} from "../lib/getAndPutData";
import { SocketSingleton } from "../lib";
import { ChatMessage, Issue, Player, SocketActions } from "../types";

export const Socket = (): JSX.Element => {
  const dispatch = useDispatch();

  // TO DO add data for timer in redux
  // add socket tik-tak

  useEffect(() => {
    (async () => {
      if (localStorage.player) {
        dispatch({ type: "IS_LOADING_DATA", payload: true });

        const localPlayer = JSON.parse(localStorage.player) as Player;
        const socket = SocketSingleton.getInstance().getSocket();
        await socket.connect();
        socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
          dispatch({ type: "ADD_PLAYER", payload: player });
        });
        socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
          dispatch({ type: "ADD_ISSUE", payload: issue });
        });
        socket.on(SocketActions.RECIEVE_NEW_MESSAGE, (message: ChatMessage) => {
          dispatch({ type: "ADD_CHAT_MESSAGE", payload: message });
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
