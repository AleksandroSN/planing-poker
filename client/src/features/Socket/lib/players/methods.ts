import { Dispatch } from "redux";
import { Player } from "../../types";
import { SocketSingleton } from "../Singleton";
import { deleteTeamMember } from "./sockets";

export const deletePlayer = (player: Player, dispatch: Dispatch): void => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  deleteTeamMember(player, socket);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};
