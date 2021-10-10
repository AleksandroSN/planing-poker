import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
  getLobbySettings,
  reconnectToLobby,
  validateLobby,
} from "../lib/getAndPutData";
import { SocketSingleton } from "../lib";
import {
  ChatMessage,
  Issue,
  LobbySetting,
  Player,
  RoundControl,
  SocketActions,
} from "../types";
import { numberToArr } from "../../../lib";

export const Socket = (): JSX.Element => {
  const dispatch = useDispatch();

  // TO DO add data for timer in redux
  // add socket tik-tak

  useEffect(() => {
    (async () => {
      if (sessionStorage.player) {
        dispatch({ type: "IS_LOADING_DATA", payload: true });

        const localPlayer = JSON.parse(sessionStorage.player) as Player;
        const socket = SocketSingleton.getInstance().getSocket();
        await socket.connect();
        const lobbyIsValid = await validateLobby(localPlayer.lobbyId, socket);
        if (lobbyIsValid.isValidate) {
          await reconnectToLobby(localPlayer, socket);

          socket.on(
            SocketActions.NOTIFY_ABOUT_APP_STAGE,
            (newLobbySettings: LobbySetting) => {
              dispatch({ type: "UPDATE_SETTINGS", payload: newLobbySettings });
            }
          );
          socket.on(SocketActions.NOTIFY_ABOUT_ROUND_RUNNIG, (issue: Issue) => {
            const payload = {
              isRun: true,
              currentIssue: issue,
            };
            dispatch({ type: "CONTROL_ROUND", payload });
          });
          socket.on(
            SocketActions.NOTIFY_ABOUT_ROUND_STOP,
            (
              result: Map<number, number>,
              voters: Map<string, number>,
              issue: Issue
            ) => {
              const votes: Record<string, number> = {};
              const results: Record<string, number> = {};
              result.forEach((value, key) => {
                results[`${key}`] = value;
              });
              voters.forEach((value, key) => {
                votes[key] = value;
              });
              const payload = {
                issue: issue.id,
                results: {
                  votes,
                  results,
                },
              };
              dispatch({
                type: "CONTROL_ROUND",
                payload: { isRun: false, currentIssue: issue },
              });
              dispatch({ type: "UPDATE_ISSUE_VOTING_RESULT", payload });
            }
          );
          socket.on(
            SocketActions.NOTIFY_ABOUT_ROUND_RUNNIG,
            (roundControl: RoundControl) => {
              dispatch({ type: "CONTROL_ROUND", payload: roundControl });
            }
          );
          socket.on(SocketActions.TIK_TAK, (time: Array<string>) => {
            dispatch({ type: "TIK_TAK", payload: time });
          });
          socket.on(
            SocketActions.NOTIFY_ABOUT_ROUND_STOP,
            (
              result: Map<number, number>,
              voters: Map<string, number>,
              issue: Issue,
              roundControl: RoundControl
            ) => {
              const votes: Record<string, number> = {};
              const results: Record<string, number> = {};
              result.forEach((value, key) => {
                results[`${key}`] = value;
              });
              voters.forEach((value, key) => {
                votes[key] = value;
              });
              const payload = {
                issue: issue.id,
                results: {
                  votes,
                  results,
                },
              };
              dispatch({
                type: "CONTROL_ROUND",
                payload: roundControl,
              });
              dispatch({ type: "UPDATE_ISSUE_VOTING_RESULT", payload });
            }
          );
          socket.on(
            SocketActions.NOTIFY_ABOUT_NEW_VOTE_FOR_ISSUE,
            (issue: Issue, player: Player, score: number) => {
              const payload = {
                issue: issue.id,
                player: player.id,
                value: score,
              };
              dispatch({ type: "ADD_NEW_VOTE_FOR_ISSUE", payload });
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
          socket.on(
            SocketActions.NOTIFY_ABOUT_KICKING_MEMBER,
            (player: Player) => {
              if (localPlayer.id !== player.id) {
                dispatch({ type: "DELETE_PLAYER", payload: player });
              } else {
                dispatch({ type: "OUT_GAME_SETTINGS", payload: player });
              }
            }
          );
          socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
            dispatch({ type: "ADD_ISSUE", payload: issue });
          }); // update issue
          socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, (issue: Issue) => {
            dispatch({ type: "UPDATE_ISSUE", payload: issue });
          });
          socket.on(SocketActions.RECIEVE_DELETED_ISSUE, (issue: Issue) => {
            dispatch({ type: "DELETE_ISSUE", payload: issue });
          });
          socket.on(
            SocketActions.RECIEVE_NEW_MESSAGE,
            (message: ChatMessage) => {
              dispatch({ type: "ADD_CHAT_MESSAGE", payload: message });
            }
          ); // update messages
          socket.on(
            SocketActions.RECIEVE_NEXT_ROUND_DATA,
            (issues: Issue[], roundControl: RoundControl) => {
              dispatch({ type: "UPDATE_ISSUES", payload: issues });
              dispatch({
                type: "CONTROL_ROUND",
                payload: roundControl,
              });
            }
          );
          const LobbySettings = await getLobbySettings(
            socket,
            localPlayer.lobbyId
          );
          dispatch({
            type: "UPDATE_SETTINGS",
            payload: LobbySettings.lobbySettings,
          });
          dispatch({
            type: "TIK_TAK",
            payload: numberToArr(LobbySettings.lobbySettings.roundTime),
          });
          dispatch({
            type: "CONTROL_ROUND",
            payload: LobbySettings.roundControl,
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
        }
        dispatch({ type: "IS_LOADING_DATA", payload: false });
      }
    })();
  });
  return <></>;
};
