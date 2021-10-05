import { Server } from "socket.io";
import { Player, SocketActions } from "../../types";
import { deletePlayer, getPlayersQtyInLobby } from "../models";

type KickVoting = {
  startVoting: () => void;
  checkVoters: (player: Player) => boolean;
  checkProcess: () => boolean;
  addVoice: (members: number, player: Player) => void;
};

const kickVoting = (io: Server, victim: Player) => {
  const voters: Set<string> = new Set();
  let isVoting = false;
  let votes = 0;
  let timer: NodeJS.Timer;
  return {
    startVoting: () => {
      votes = 1;
      isVoting = true;
      timer = setTimeout(() => {
        voters.clear();
        isVoting = false;
        votes = 0;
        clearTimeout(timer);
      }, 180 * 1000);
    },
    checkVoters: (player: Player) => voters.has(player.id),
    checkProcess: () => isVoting,
    addVoice: async (members: number, player: Player) => {
      if (!voters.has(player.id)) {
        voters.add(player.id);
        console.log("Votes:", votes);
        votes += 1;
        if (votes >= members * 0.5) {
          isVoting = false;
          votes = 0;
          clearTimeout(timer);
          await deletePlayer(victim.id);
          io.to(victim.lobbyId).emit(
            SocketActions.NOTIFY_ABOUT_KICKING_MEMBER,
            victim
          );
        }
      }
    },
  };
};

export const kickDb = (io: Server) => {
  const kicks: Map<string, KickVoting> = new Map();
  return {
    kickMember: async (
      requester: Player,
      victim: Player,
      callback: (response: { isStarted: boolean; message: string }) => void
    ) => {
      switch (requester.role) {
        case "Dealer":
          await deletePlayer(victim.id);
          io.to(requester.lobbyId).emit(
            SocketActions.NOTIFY_ABOUT_KICKING_MEMBER,
            victim
          );
          callback({ isStarted: true, message: "done" });
          break;
        case "Member": {
          const playerQty = await getPlayersQtyInLobby(requester.lobbyId);
          if (playerQty <= 4) {
            callback({ isStarted: false, message: "NOT_ENOUGH_PLAYERS" });
            break;
          }
          if (!kicks.has(requester.lobbyId)) {
            const kick = kickVoting(io, victim);
            kick.startVoting();
            kicks.set(requester.lobbyId, kick);
            callback({ isStarted: true, message: "VOTING_STARTED" });
            io.to(requester.lobbyId).emit(
              SocketActions.SUGGEST_ALL_TO_KICK_MEMBER,
              victim,
              requester
            );
            break;
          }
          const vProcess = kicks
            .get(requester.lobbyId)
            ?.checkProcess() as boolean;
          if (vProcess) {
            callback({ isStarted: false, message: "VOTING_ALREADY_STARTED" });
            break;
          } else {
            const kick = kicks.get(requester.lobbyId) as KickVoting;
            kick.startVoting();
            callback({ isStarted: true, message: "VOTING_STARTED" });
            io.to(requester.lobbyId).emit(
              SocketActions.SUGGEST_ALL_TO_KICK_MEMBER,
              victim,
              requester
            );
            break;
          }
        }
      }
    },
    voteForKicking: async (
      player: Player,
      callback: (response: { isVoted: boolean; message: string }) => void
    ) => {
      const playerQty = await getPlayersQtyInLobby(player.lobbyId);
      if (playerQty <= 4) {
        callback({ isVoted: false, message: "NOT_ENOUGH_PLAYERS" });
        return;
      }
      if (!kicks.has(player.lobbyId)) {
        callback({ isVoted: false, message: "VOTING_DOES_NOT_EXIST" });
        return;
      }
      const kick = kicks.get(player.lobbyId) as KickVoting;
      if (!kick.checkProcess()) {
        callback({ isVoted: false, message: "VOTING_DOES_NOT_START" });
        return;
      }
      if (kick.checkVoters(player)) {
        callback({ isVoted: false, message: "PLAYER_HAS_ALREADY_VOTED" });
        return;
      }
      console.log("playerQty: ", playerQty);
      kick.addVoice(playerQty, player);
      callback({ isVoted: true, message: "VOTED" });
    },
  };
};
