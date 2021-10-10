import { Server } from "socket.io";
import { Issue, Player, SocketActions } from "../../types";
import { changeRoundStatus, getLobbySettings, getVotingIssue } from "../models";

type IssueVoting = {
  startVoting: () => void;
  addVoice: (player: Player, score: string) => void;
  checkProcess: () => boolean;
};

const issueVoting = (io: Server, issue: Issue, timerLimit: number) => {
  const voters: Map<string, string> = new Map();
  const result: Map<string, number> = new Map();
  let startTime = timerLimit - 1;
  let isVoting = false;
  let timer: NodeJS.Timer;
  return {
    startVoting: () => {
      isVoting = true;
      voters.clear();
      result.clear();
      timer = setInterval(async () => {
        const minutes = Math.floor(startTime / 60);
        const seconds = startTime - minutes * 60;
        const time = [
          minutes < 10 ? `0${minutes}` : `${minutes}`,
          seconds < 10 ? `0${seconds}` : `${seconds}`,
        ];
        io.to(issue.lobbyId).emit(SocketActions.TIK_TAK, time);
        if (startTime === 0) {
          const votersQty = voters.size;
          console.log("votersQty", votersQty);
          voters.forEach((itm) => {
            if (!result.has(itm)) {
              result.set(itm, 1);
            } else {
              let value = result.get(itm) as number;
              value += 1;
              result.set(itm, value);
            }
          });
          result.forEach((itm, key) => {
            let value = itm;
            value = (value / votersQty) * 100;
            result.set(key, value);
            console.log("key", key, "value", value);
          });
          const roundControl = await changeRoundStatus(
            issue.lobbyId,
            "isStoped"
          );
          const votes: Record<string, string> = {};
          const results: Record<string, number> = {};
          result.forEach((value, key) => {
            results[key] = value;
          });
          voters.forEach((value, key) => {
            votes[key] = value;
          });
          io.to(issue.lobbyId).emit(
            SocketActions.NOTIFY_ABOUT_ROUND_STOP,
            results,
            votes,
            issue,
            roundControl
          );
          clearInterval(timer);
          startTime = timerLimit;
          isVoting = false;
        }
        startTime--;
      }, 1000);
    },
    addVoice: (player: Player, score: string) => {
      voters.set(player.id, score);
    },
    checkProcess: () => isVoting,
  };
};

export const issueVotingDb = (io: Server) => {
  const issuesVoting: Map<string, IssueVoting> = new Map();
  return {
    runRound: async (
      lobbyId: string,
      callback: (response: { isStarted: boolean; message: string }) => void
    ) => {
      const issue = await getVotingIssue(lobbyId);
      const roundControl = await changeRoundStatus(lobbyId, "isRun");
      io.to(lobbyId).emit(
        SocketActions.NOTIFY_ABOUT_ROUND_RUNNIG,
        roundControl
      );
      const config = await getLobbySettings(lobbyId);
      const roundTime = config?.roundTime as number;
      const voting = issueVoting(io, issue, roundTime);
      voting.startVoting();
      issuesVoting.set(issue.id, voting);
      callback({ isStarted: true, message: "ROUND_IS_RUN" });
    },
    giveVoteForIssue: async (
      player: Player,
      issue: Issue,
      score: string,
      callback: (response: { isVoted: boolean; message: string }) => void
    ) => {
      const voting = issuesVoting.get(issue.id) as IssueVoting;
      if (!voting.checkProcess)
        callback({ isVoted: false, message: "VOTING_HAS_NOT_STARTED" });
      else {
        voting.addVoice(player, score);
        console.log("lobbyId: ", player.id);
        io.to(player.lobbyId).emit(
          SocketActions.NOTIFY_ABOUT_NEW_VOTE_FOR_ISSUE,
          issue,
          player,
          score
        );
        callback({ isVoted: true, message: "DONE" });
      }
    },
  };
};
