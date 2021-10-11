import { Dispatch } from "redux";
import { SocketMethods, SocketSingleton } from ".";
import { numberToArr } from "../../../lib";
import { AppReducerActions } from "../../../redux/AppReducer/actions";
import {
  ChatMessage,
  Issue,
  LobbySetting,
  NewPlayer,
  Player,
  RoundControl,
  SocketActions,
} from "../types";
import {
  getLobbyIssues,
  getLobbyMessages,
  getLobbyPlayers,
} from "./getAndPutData";

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
  dispatch({ type: "CONTROL_ROUND", payload: lobby.roundControl });
  const lobbyMembers = await getLobbyPlayers(socket, lobby.player);
  dispatch({ type: "UPDATE_PLAYERS", payload: lobbyMembers });
  const lobbyIssues = await getLobbyIssues(socket, lobby.player);
  dispatch({ type: "UPDATE_ISSUES", payload: lobbyIssues });
  const lobbyMessages = await getLobbyMessages(socket, lobby.player, "0", 20);
  dispatch({ type: "UPDATE_CHAT_MESSAGES", payload: lobbyMessages });
  dispatch({
    type: "TIK_TAK",
    payload: numberToArr(lobby.initLobbySettings.roundTime),
  });
  socket.on(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, (player: Player) => {
    dispatch({ type: "ADD_PLAYER", payload: player });
  }); // update members
  socket.on(SocketActions.SUGGEST_ALL_TO_KICK_MEMBER, (victim, requester) => {
    dispatch({
      type: AppReducerActions.kickVoteSuggest,
      payload: { isVisible: true, victim, initiator: requester },
    });
  });
  socket.on(SocketActions.NOTIFY_ABOUT_KICKING_MEMBER, (player: Player) => {
    if (lobby.player.id !== player.id) {
      dispatch({ type: "DELETE_PLAYER", payload: player });
    } else {
      dispatch({ type: "OUT_GAME_SETTINGS", payload: player });
    }
  });
  socket.on(SocketActions.RECIEVE_NEW_ISSUE, (issue: Issue) => {
    dispatch({ type: "ADD_ISSUE", payload: issue });
  }); // add issue
  socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, (issue: Issue) => {
    dispatch({ type: "UPDATE_ISSUE", payload: issue });
  });
  socket.on(SocketActions.RECIEVE_DELETED_ISSUE, (issue: Issue) => {
    dispatch({ type: "DELETE_ISSUE", payload: issue });
  });
  socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, (issue: Issue) => {
    dispatch({ type: "UPDATE_ISSUE", payload: issue });
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
  socket.on(
    SocketActions.NOTIFY_ABOUT_ROUND_RUNNIG,
    (roundControl: RoundControl) => {
      dispatch({ type: "CONTROL_ROUND", payload: roundControl });
    }
  );
  socket.on(
    SocketActions.NOTIFY_ABOUT_ROUND_STOP,
    (
      results: Record<string, number>,
      votes: Record<string, string>,
      issue: Issue,
      roundControl: RoundControl
    ) => {
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
      // console.log("data for dispatch: ", payload);
      dispatch({ type: "ADD_NEW_VOTE_FOR_ISSUE", payload });
    }
  );
  socket.on(SocketActions.TIK_TAK, (time: Array<string>) => {
    dispatch({ type: "TIK_TAK", payload: time });
  });
  // TO DO change game status listener
  dispatch({ type: "IS_LOADING_DATA", payload: false });
  return lobby.player;
};
