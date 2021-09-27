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
  lobbyId: string,
  socketId: string
): Promise<Player> => {
  const player = {
    ...newPlayer,
    id: uuidv4(),
    lobbyId,
  };
  db.players.push(player);
  db.sockets.set(player.id, socketId);
  return Promise.resolve(player);
};

export const deletePlayer = (playerId: string): Promise<Player | false> => {
  db.sockets.delete(playerId);
  return deleteSmth(playerId, db.players);
};

export const reconnectPlayer = (
  playerId: string,
  socketId: string
): Promise<void> => {
  db.sockets.set(playerId, socketId);
  return Promise.resolve();
};
