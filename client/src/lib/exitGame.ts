import { Dispatch } from "redux";
import { deletePlayer } from "../features/Socket/lib/players/methods";
import { Player } from "../features/Socket/types";

export const exitGame = (dispatch: Dispatch): void => {
  const localPlayer = sessionStorage.getItem("player");

  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    dispatch({ type: "UPDATE_SETTINGS", payload: { appStage: "out" } });
    deletePlayer(player, dispatch);
  }
};
