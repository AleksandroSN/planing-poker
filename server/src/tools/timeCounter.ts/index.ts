import { Server } from "socket.io";
import { SocketActions } from "../../types";

type GameTimer = {
  start: () => void;
  pause: () => void;
  stop: () => void;
};

const createTimer = (io: Server, lobbyId: string, timerLimit: number) => {
  let startTime = 0;
  let timer: NodeJS.Timer;
  return {
    start: () => {
      timer = setInterval(() => {
        const minutes = Math.floor(startTime / 60);
        const seconds = startTime - minutes * 60;
        const time = [
          minutes < 10 ? `0${minutes}` : `${minutes}`,
          seconds < 10 ? `0${seconds}` : `${seconds}`,
        ];
        io.to(lobbyId).emit(SocketActions.TIK_TAK, time);
        if (startTime >= timerLimit) {
          io.to(lobbyId).emit(SocketActions.TIMER_IS_STOPPED, true);
          clearInterval(timer);
          startTime = 0;
        }
        startTime++;
      }, 1000);
    },
    pause: () => {
      clearInterval(timer);
    },
    stop: () => {
      startTime = 0;
      clearInterval(timer);
    },
  };
};

const timerStart = (
  io: Server,
  timers: Map<string, GameTimer>,
  lobbyId: string,
  timerLimit?: number
) => {
  if (timers.has(lobbyId)) timers.get(lobbyId)?.start();
  else {
    const timer = createTimer(io, lobbyId, timerLimit as number);
    timers.set(lobbyId, timer);
    timers.get(lobbyId)?.start();
  }
};

const timerStop = (timers: Map<string, GameTimer>, lobbyId: string) => {
  timers.get(lobbyId)?.stop();
};

const timerPause = (timers: Map<string, GameTimer>, lobbyId: string) => {
  timers.get(lobbyId)?.pause();
};

export const timersDb = (io: Server) => {
  const socketIoServer = io;
  const timers: Map<string, GameTimer> = new Map();
  return function (
    lobbyId: string,
    command: "start" | "stop" | "pause",
    timerLimit?: number
  ) {
    switch (command) {
      case "start":
        timerStart(socketIoServer, timers, lobbyId, timerLimit);
        break;
      case "stop":
        timerStop(timers, lobbyId);
        break;
      case "pause":
        timerPause(timers, lobbyId);
        break;
    }
  };
};
