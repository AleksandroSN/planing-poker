import { Player } from "../features/Socket/types";

export const checkAuth = (idGame: string): boolean => {
  let isLogin = false;
  const localPlayer = sessionStorage.getItem("player");
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    isLogin = player.lobbyId === idGame;
  }
  return isLogin;
};
