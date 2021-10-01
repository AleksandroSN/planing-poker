import { Player } from "../features/Socket/types";

export const isReallyYou = (strFirstName: string): boolean => {
  const localPlayer = sessionStorage.getItem("player");
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    const checkIsYou = strFirstName === player.firstName;
    return checkIsYou;
  }
  return false;
};
