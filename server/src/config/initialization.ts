type InitialLobbySettings = {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: string[];
  appStage: "lobby" | "game";
};

export const initialLobbySettings: InitialLobbySettings = {
  masterIsPlayer: true,
  isTimerNeed: true,
  changingCardInRoundEnd: false,
  scoreType: "story point",
  scoreTypeShort: "SP",
  roundTime: 140, // seconds
  cardValues: [""],
  appStage: "lobby",
};
