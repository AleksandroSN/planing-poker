import { Issue, Player, SocketActions } from "../../types";
import { SocketAPI } from "../SocketAPI";

export const sendVotedPlayer = (
  socket: SocketAPI,
  player: Player,
  issue: Issue,
  score: string
): void => {
  socket.emit(
    SocketActions.GIVE_A_VOTE_FOR_ISSUE,
    [player, issue, score],
    true
  );
  console.log(player, issue, score);
};
