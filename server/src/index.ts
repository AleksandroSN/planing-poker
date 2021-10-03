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
  deleteIssue,
  getChatMessages,
  getLobbyIssues,
  getLobbyMembers,
  getLobbySettingsCtr,
  reconnectToLobby,
  sendChatMessage,
  updateIssue,
  validateLobby,
} from "./tools/controllers";
import { timersDb } from "./tools/timeCounter.ts";
import fileUpload from "express-fileupload";
import { routerFiles } from "./tools/controllers/router-file";
import { kickDb } from "./tools/kick-voting";
import { issueVotingDb } from "./tools/issue-voting";
import { db } from "./db/db";

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
  res.sendFile(path.resolve("../client/index.html"));
});

const timers = timersDb(io);

const kickVoting = kickDb(io);

const issueVoting = issueVotingDb(io);

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
  socket.on(SocketActions.RECIEVE_UPDATED_ISSUE, async function (issue: Issue) {
    await updateIssue(io, issue);
  });
  socket.on(SocketActions.RECIEVE_DELETED_ISSUE, async function (issue: Issue) {
    await deleteIssue(io, issue);
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
    SocketActions.GET_LOBBY_SETTINGS,
    async function (
      lobbyId: string,
      callback: (response: { lobbySettings: LobbySetting | null }) => void
    ) {
      await getLobbySettingsCtr(lobbyId, callback);
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
    async function (
      lobbyId: string,
      callback: (response: { isValidate: boolean }) => void
    ) {
      await validateLobby(lobbyId, callback);
    }
  );
  socket.on(
    SocketActions.KICK_MEMBER,
    async function (
      requester: Player,
      victim: Player,
      callback: (response: { isStarted: boolean; message: string }) => void
    ) {
      kickVoting.kickMember(requester, victim, callback);
    }
  );
  socket.on(
    SocketActions.CONFIRM_TO_KICK_MEMBER,
    async function (
      player: Player,
      callback: (response: { isVoted: boolean; message: string }) => void
    ) {
      kickVoting.voteForKicking(player, callback);
    }
  );
  socket.on(
    SocketActions.RUN_ROUND,
    async function (
      player: Player,
      issue: Issue,
      callback: (response: { isStarted: boolean; message: string }) => void
    ) {
      issueVoting.runRound(player, issue, callback);
    }
  );
  socket.on(
    SocketActions.GIVE_A_VOTE_FOR_ISSUE,
    async function (
      player: Player,
      issue: Issue,
      score: number,
      callback: (response: { isVoted: boolean; message: string }) => void
    ) {
      issueVoting.giveVoteForIssue(player, issue, score, callback);
    }
  );
});

http.listen(3030, function () {
  console.log("listening on *:3030");
});
