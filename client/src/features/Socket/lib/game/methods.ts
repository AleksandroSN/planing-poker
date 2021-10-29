import { emitNextIssue, emitStartGame } from "./socket";
import { Issue, Player } from "../../types";
import { SocketSingleton } from "../Singleton";
import { sendVotedPlayer } from "./sockets";

export const startGame = (): void => {
  const player = sessionStorage.getItem("player");
  const { lobbyId } = JSON.parse(player as string) as Player;
  const socket = SocketSingleton.getInstance().getSocket();
  emitStartGame(socket, lobbyId);
};
export const nextIssueVoting = (): void => {
  const player = sessionStorage.getItem("player");
  const { lobbyId } = JSON.parse(player as string) as Player;
  const socket = SocketSingleton.getInstance().getSocket();
  emitNextIssue(socket, lobbyId);
};

export const sendIssueVote = (
  player: Player,
  issue: Issue,
  score: string
): void => {
  const socket = SocketSingleton.getInstance().getSocket();
  sendVotedPlayer(socket, player, issue, score);
};
