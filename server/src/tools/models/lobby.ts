import { db } from "../../db/db";
import { LobbySetting } from "../../types";

export const setLobbySettings = (settings: LobbySetting): Promise<boolean> => {
  db.lobbySettings.set(settings.lobbyId, settings);
  return Promise.resolve(true);
};

export const getLobbySettings = (
  lobbyId: string
): Promise<LobbySetting | null> => {
  if (db.lobbySettings.has(lobbyId)) {
    return Promise.resolve(db.lobbySettings.get(lobbyId) as LobbySetting);
  } else return Promise.resolve(null);
};
