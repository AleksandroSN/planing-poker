export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  jpbPosition: string;
  avatarImage: string;
  role: string;
  lobbyId: string;
};

export type NewPlayer = {
  firstName: string;
  lastName: string;
  jpbPosition: string;
  avatarImage: string;
  role: string;
};

export type Issue = {
  id: string;
  title: string;
  link: string;
  priority: "Low" | "Middle" | "Hight";
  lobbyId: string;
};

export type NewIssue = {
  title: string;
  link: string;
  priority: "Low" | "Middle" | "Hight";
  lobbyId: string;
};

export type LobbySetting = {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: string[];
  lobbyId: string;
  masterId: string;
};

export type ChatMessage = {
  id: string;
  messageText: string;
  messageTime: string;
  playerId: string;
  lobbyId: string;
};

export type NewChatMessage = {
  messageText: string;
  playerId: string;
  lobbyId: string;
};

export enum SocketActions {
  CREATE_NEW_ROOM = "create new room",
  ADD_NEW_TEAM_MEMBER = "add new team member",
  GET_LOBBY_MEMBERS = "get lobby members",
  ADD_NEW_ISSUE = "add new issue",
  RECIEVE_NEW_ISSUE = "recieve new issue",
  GET_LOBBY_ISSUES = "get lobby issues",
  GET_CHAT_MESSAGES = "get chat messages",
  SEND_CHAT_MESSAGE = "send chat message",
  RECONNECT_TO_LOBBY = "reconnect to lobby",
  RECIEVE_NEW_MESSAGE = "recieve new message",
  NOTIFY_ABOUT_NEW_MEMBER = "notify about new member",
}
