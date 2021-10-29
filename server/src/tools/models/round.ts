import { db } from "../../db/db";
import { RoundControl } from "../../types";

export const createRoundControl = (lobbyId: string): Promise<RoundControl> => {
  const newRoundStatus: RoundControl = { status: "default" };
  db.roundControl.set(lobbyId, newRoundStatus);
  return Promise.resolve(newRoundStatus);
};

export const changeRoundStatus = (
  lobbyId: string,
  status: "default" | "isRun" | "isStoped"
): Promise<RoundControl> => {
  const newRoundStatus = { ...db.roundControl.get(lobbyId), status };
  db.roundControl.set(lobbyId, newRoundStatus);
  return Promise.resolve(newRoundStatus);
};

export const getRoundControl = (
  lobbyId: string
): Promise<RoundControl | null> => {
  const roundControle = db.roundControl.get(lobbyId);
  if (roundControle) return Promise.resolve(roundControle);
  return Promise.resolve(null);
};
