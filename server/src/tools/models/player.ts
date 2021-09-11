import { db } from "../../db/db";
import { v4 as uuidv4 } from "uuid";
import { NewPlayer, Player } from "../../types";
import { deleteSmth, getSmthById, getSmthInLobby } from "../shared";

export const getPlayersInLobby = (lobby: string): Promise<Player[]> => {
  return getSmthInLobby(lobby, db.players);
};

export const getPlayerById = (playerId: string): Promise<Player | false> => {
  return getSmthById(playerId, db.players);
};

export const createNewPlayer = (
  newPlayer: NewPlayer,
  lobbyId: string
): Promise<Player> => {
  const player = {
    ...newPlayer,
    id: uuidv4(),
    lobbyId,
  };
  db.players.push(player);
  return Promise.resolve(player);
};

export const deletePlayer = (playerId: string): Promise<Player | false> => {
  return deleteSmth(playerId, db.players);
};
