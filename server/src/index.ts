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
  changeLobbySettings,
  createNewRoom,
  getChatMessages,
  getLobbyIssues,
  getLobbyMembers,
  reconnectToLobby,
  sendChatMessage,
  validateLobby,
} from "./tools/controllers";
import { timersDb } from "./tools/timeCounter.ts";
import fileUpload from "express-fileupload";
import { routerFiles } from "./tools/controllers/router-file";

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

const staticFilesPath = path.resolve(__dirname, "../wwwroot");

app.use(fileUpload());

app.use("/", express.static(staticFilesPath));

app.use("/upload", routerFiles);

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
        allPlayers: Player[];
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
  socket.on(
    SocketActions.UPDATE_SETTINGS,
    async function (
      newSettings: LobbySetting,
      callback: (response: { newLobbySettings: LobbySetting } | null) => void
    ) {
      await changeLobbySettings(
        socket,
        newSettings,
        callback,
        SocketActions.NOTIFY_ABOUT_NEW_SETTINGS
      );
    }
  );
  socket.on(
    SocketActions.CHANGE_APP_STAGE,
    async function (
      newSettings: LobbySetting,
      callback: (response: { newLobbySettings: LobbySetting } | null) => void
    ) {
      await changeLobbySettings(
        socket,
        newSettings,
        callback,
        SocketActions.NOTIFY_ABOUT_APP_STAGE
      );
    }
  );
  socket.on(
    SocketActions.VALIDATE_LOBBY,
    async function (lobbyId: string, callback: (isValidate: boolean) => void) {
      await validateLobby(lobbyId, callback);
    }
  );
  socket.on(
    SocketActions.KICK_MEMBER,
    async function (requester: Player, victim: Player) {
      console.log("KICK_MEMBER");
    }
  );
});

http.listen(3030, function () {
  console.log("listening on *:3030");
});
