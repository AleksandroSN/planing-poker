import express, { Request, Response } from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import * as path from "path";
import { createServer } from "http";
import {
  ChatMessage,
  Issue,
  LobbySetting,
  NewChatMessage,
  NewIssue,
  NewPlayer,
  Player,
  SocketActions,
} from "./types";
import {
  addNewIssue,
  addNewTeamMember,
  createNewRoom,
  getChatMessages,
  getLobbyIssues,
  getLobbyMembers,
  reconnectToLobby,
  sendChatMessage,
} from "./tools/constrollers";
import { timersDb } from "./tools/timeCounter.ts";

const app = express();
app.set("port", process.env.PORT || 3030);
app.use(
  cors({
    origin: "*",
  })
);

const http = createServer(app);
// set up socket.io and bind it to our
// http server.
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req: Request, res: Response) => {
  console.log("http connection happened");
  res.sendFile(path.resolve("./client/index.html"));
});

const timers = timersDb(io);

io.on("connection", function (socket: Socket) {
  socket.on(
    SocketActions.CREATE_NEW_ROOM,
    async function (
      master: NewPlayer,
      callback: (response: {
        player: Player;
        initLobbySettings: LobbySetting;
      }) => void
    ) {
      await createNewRoom(socket, master, callback);
    }
  );
  socket.on(
    SocketActions.ADD_NEW_TEAM_MEMBER,
    async function (
      newTeamMember: NewPlayer,
      lobbyId: string,
      callback: (response: {
        player: Player;
        initLobbySettings: LobbySetting;
      }) => void
    ) {
      await addNewTeamMember(socket, newTeamMember, lobbyId, callback);
    }
  );
  socket.on(
    SocketActions.GET_LOBBY_MEMBERS,
    async function (player: Player, callback: (members: Player[]) => void) {
      await getLobbyMembers(player, callback);
    }
  );
  socket.on(SocketActions.ADD_NEW_ISSUE, async function (newIssie: NewIssue) {
    await addNewIssue(io, newIssie);
  });
  socket.on(
    SocketActions.GET_LOBBY_ISSUES,
    async function (lobbyId: string, callback: (issues: Issue[]) => void) {
      await getLobbyIssues(lobbyId, callback);
    }
  );
  socket.on(
    SocketActions.GET_CHAT_MESSAGES,
    async function (
      lobbyId: string,
      lastMessageId: string,
      messageQty: number,
      callback: (messages: ChatMessage[]) => void
    ) {
      await getChatMessages(lobbyId, lastMessageId, messageQty, callback);
    }
  );
  socket.on(
    SocketActions.SEND_CHAT_MESSAGE,
    async function (newMessage: NewChatMessage) {
      await sendChatMessage(newMessage, io);
    }
  );
  socket.on(
    SocketActions.RECONNECT_TO_LOBBY,
    async function (player: Player, callback: (success: boolean) => void) {
      await reconnectToLobby(socket, player, callback);
    }
  );
  socket.on(
    SocketActions.MANAGE_TIMER,
    function (
      manager: { command: "start" | "stop" | "pause"; timerLimit?: number },
      player: Player
    ) {
      console.log(player.lobbyId, manager.command, manager.timerLimit);
      timers(player.lobbyId, manager.command, manager.timerLimit);
    }
  );
});

http.listen(3030, function () {
  console.log("listening on *:3030");
});
