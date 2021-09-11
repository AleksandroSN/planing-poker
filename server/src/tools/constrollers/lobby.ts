import { Socket } from "socket.io";
import { LobbySetting, NewPlayer, Player } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { createNewPlayer, getPlayerById, setLobbySettings } from "../models";
import { initialLobbySettings } from "../../config/initialization";

export const createNewRoom = async (
  socket: Socket,
  master: NewPlayer,
  callback: (player: Player, initLobbySettings: LobbySetting) => void
): Promise<void> => {
  const newLobby = uuidv4();
  socket.join(newLobby);
  const player = await createNewPlayer(master, newLobby);
  const initLobbySettings = {
    ...initialLobbySettings,
    lobbyId: newLobby,
    masterId: player.id,
  };
  await setLobbySettings(initLobbySettings);
  callback(player, initLobbySettings);
};

export const reconnectToLobby = async (
  socket: Socket,
  player: Player,
  callback: (success: boolean) => void
): Promise<void> => {
  const checkPlaer = await getPlayerById(player.id);
  if (checkPlaer) {
    socket.join(player.lobbyId);
    callback(true);
  } else callback(false);
};
