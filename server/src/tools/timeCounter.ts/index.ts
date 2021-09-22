import { Server } from "socket.io";

const timerCreate = (
  io: Server,
  timers: Map<string, typeof setInterval>,
  lobbyId: string,
  timerLimit: number,
) => {};

const timerDelete = (
  io: Server,
  timers: Map<string, typeof setInterval>,
  lobbyId: string
) => {};

export const timersDb = (io: Server) => {
  const socketIoServer = io;
  const timers: Map<string, typeof setInterval> = new Map();
  return function (
    lobbyId: string,
    command: "start" | "stop",
    timerLimit?: number
  ) {
    switch (command) {
      case "start":
        if (timerLimit !== undefined) {
          timerCreate(socketIoServer, timers, lobbyId, timerLimit);
        } else throw new Error("Time limite for timer is not define");
        break;
      case "stop":
        timerDelete(socketIoServer, timers, lobbyId);
        break;
    }
  };
};
