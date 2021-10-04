type InitialLobbySettings = {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: string[];
  cardsCover: string;
  appStage: "lobby" | "game";
};

export const initialLobbySettings: InitialLobbySettings = {
  masterIsPlayer: false,
  isTimerNeed: false,
  changingCardInRoundEnd: false,
  scoreType: "story point",
  scoreTypeShort: "SP",
  roundTime: 140, // seconds
  cardValues: [""],
  cardsCover: "",
  appStage: "lobby",
};

export const KICK_VOTING_TIME = 30; // how much time is needed for votig to get any member out

export const ISSUE_VOTING_TIME = 30;
