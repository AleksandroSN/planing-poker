import { Server } from "socket.io";
import { Issue, Player, SocketActions } from "../../types";
import { changeRoundStatus, getLobbySettings } from "../models";

type IssueVoting = {
  startVoting: () => void;
  addVoice: (player: Player, score: number) => void;
  checkProcess: () => boolean;
};

const issueVoting = (io: Server, issue: Issue, timerLimit: number) => {
  const voters: Map<string, number> = new Map();
  const result: Map<number, number> = new Map();
  let startTime = 0;
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
        if (startTime >= timerLimit) {
          const votersQty = voters.size;
          voters.forEach((itm) => {
            if (!result.has(itm)) {
              result.set(itm, 0);
            } else {
              let value = result.get(itm) as number;
              value += 1;
              result.set(itm, value);
            }
          });
          result.forEach((itm) => {
            let value = result.get(itm) as number;
            value = (value / votersQty) * 100;
            result.set(itm, value);
          });
          const roundControl = await changeRoundStatus(
            issue.lobbyId,
            "isStoped"
          );
          io.to(issue.lobbyId).emit(
            SocketActions.NOTIFY_ABOUT_ROUND_STOP,
            result,
            voters,
            issue,
            roundControl
          );
          clearInterval(timer);
          startTime = 0;
          isVoting = false;
        }
        startTime++;
      }, 1000);
    },
    addVoice: (player: Player, score: number) => {
      voters.set(player.id, score);
    },
    checkProcess: () => isVoting,
  };
};

export const issueVotingDb = (io: Server) => {
  const issuesVoting: Map<string, IssueVoting> = new Map();
  return {
    runRound: async (
      issue: Issue,
      callback: (response: { isStarted: boolean; message: string }) => void
    ) => {
      const roundControl = await changeRoundStatus(issue.lobbyId, "isRun");
      io.to(issue.lobbyId).emit(
        SocketActions.NOTIFY_ABOUT_ROUND_RUNNIG,
        roundControl
      );
      const config = await getLobbySettings(issue.lobbyId);
      const roundTime = config?.roundTime as number;
      const voting = issueVoting(io, issue, roundTime);
      voting.startVoting();
      issuesVoting.set(issue.id, voting);
      callback({ isStarted: true, message: "ROUND_IS_RUN" });
    },
    giveVoteForIssue: async (
      player: Player,
      issue: Issue,
      score: number,
      callback: (response: { isVoted: boolean; message: string }) => void
    ) => {
      const voting = issuesVoting.get(issue.id) as IssueVoting; // TODO Отправить всем информацию об этом голосе
      if (!voting.checkProcess)
        callback({ isVoted: false, message: "VOTING_HAS_NOT_STARTED" });
      else {
        voting.addVoice(player, score);
        io.to(player.id).emit(
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
