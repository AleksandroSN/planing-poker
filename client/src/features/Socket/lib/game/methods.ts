import { emitStartGame } from "./socket";
import { Issue, Player } from "../../types";
import { SocketSingleton } from "../Singleton";
import { sendVotedPlayer } from "./sockets";

export const startGame = (lobbyId: string): void => {
  const socket = SocketSingleton.getInstance().getSocket();
  emitStartGame(socket, lobbyId);
};

export const sendIssueVote = (
  player: Player,
  issue: Issue,
  score: string
): void => {
  const socket = SocketSingleton.getInstance().getSocket();
  sendVotedPlayer(socket, player, issue, score);
};
