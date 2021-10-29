import { Server } from "socket.io";
import { SocketActions } from "../../types";
import { changeRoundStatus, setNewCurrentIssue } from "../models";

export const setNextIssueForVoting = async (io: Server, lobbyId: string) => {
  const updatedIssues = await setNewCurrentIssue(lobbyId);
  const roundControl = await changeRoundStatus(lobbyId, "default");
  io.to(lobbyId).emit(
    SocketActions.RECIEVE_NEXT_ROUND_DATA,
    updatedIssues,
    roundControl
  );
};
