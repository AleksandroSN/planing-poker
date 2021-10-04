import { Player } from "../features/Socket/types";

export const isReallyYou = (playerId: string): boolean => {
  const localPlayer = sessionStorage.getItem("player");
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    const checkIsYou = playerId === player.id;
    return checkIsYou;
  }
  return false;
};
