import { SocketAPI } from "../SocketAPI";
import { Player, SocketActions } from "../../types";

export const deleteTeamMember = (player: Player, socket: SocketAPI): void => {
  socket.emit(SocketActions.DELETE_TEAM_MEMBER, [player], false);
};
