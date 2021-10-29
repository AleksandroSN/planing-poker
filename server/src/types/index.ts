export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  avatarImage: string;
  role: "Dealer" | "Member" | "Observer" | "";
  lobbyId: string;
};

export type NewPlayer = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  avatarImage: string;
  role: "Dealer" | "Member" | "Observer" | "";
};

export type Issue = {
  id: string;
  title: string;
  link: string;
  priority: "Low" | "Middle" | "High";
  lobbyId: string;
  issueStatus: "created" | "voting" | "voted";
};

export type NewIssue = {
  title: string;
  link: string;
  priority: "Low" | "Middle" | "High";
  lobbyId: string;
  issueStatus: "created" | "voting" | "voted";
};

export type LobbySetting = {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: string;
  cardsCover: string;
  lobbyId: string;
  masterId: string;
  appStage: "lobby" | "game" | "out" | "results" | "";
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
  DELETE_TEAM_MEMBER = "delete team member",
  GET_LOBBY_MEMBERS = "get lobby members",
  ADD_NEW_ISSUE = "add new issue",
  RECIEVE_NEW_ISSUE = "recieve new issue",
  RECIEVE_UPDATED_ISSUE = "recieve updated issue",
  RECIEVE_DELETED_ISSUE = "recieve deleted issue",
  GET_LOBBY_ISSUES = "get lobby issues",
  GET_CHAT_MESSAGES = "get chat messages",
  GET_LOBBY_SETTINGS = "get lobby settings",
  SEND_CHAT_MESSAGE = "send chat message",
  RECONNECT_TO_LOBBY = "reconnect to lobby",
  RECIEVE_NEW_MESSAGE = "recieve new message",
  NOTIFY_ABOUT_NEW_MEMBER = "notify about new member",
  MANAGE_TIMER = "manage timer",
  TIK_TAK = "tik tak",
  TIMER_IS_STOPPED = "timer is stoped",
  UPDATE_SETTINGS = "update settings",
  NOTIFY_ABOUT_NEW_SETTINGS = "notify about new settings",
  CHANGE_APP_STAGE = "change app stage",
  NOTIFY_ABOUT_APP_STAGE = "notify about app stage",
  KICK_MEMBER = "kick member",
  SUGGEST_ALL_TO_KICK_MEMBER = "suggest all to kick member",
  CONFIRM_TO_KICK_MEMBER = "confirm to kick member",
  NOTIFY_ABOUT_KICKING_MEMBER = "notify about kicking member",
  VALIDATE_LOBBY = "validate_lobby",
  RUN_ROUND = "run round",
  NOTIFY_ABOUT_ROUND_RUNNIG = "notify about round running",
  GIVE_A_VOTE_FOR_ISSUE = "give a vote for issue",
  NOTIFY_ABOUT_NEW_VOTE_FOR_ISSUE = "notify_about_new_vote_for_issue",
  NOTIFY_ABOUT_ROUND_STOP = "notify about round stop",
  NEXT_ISSUE_FOR_VOTING = "next issue for voting",
  ALL_ISSUES_WERE_VOTED = "all issues were voted",
  RECIEVE_NEXT_ROUND_DATA = "recieve next round data",
  GET_VOTING_RESULTS = "get voting results",
}

export type RoundControl = {
  status: "default" | "isRun" | "isStoped";
};
