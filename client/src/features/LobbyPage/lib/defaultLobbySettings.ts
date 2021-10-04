import { LobbySetting } from "../../Socket/types";

export const defaultLobbySettings = (lobbyId: string): LobbySetting => {
  return {
    masterIsPlayer: false,
    isTimerNeed: false,
    changingCardInRoundEnd: false,
    scoreType: "",
    scoreTypeShort: "",
    roundTime: 0, // seconds
    cardValues: [""],
    cardsCover: "",
    appStage: "out",
    lobbyId,
    masterId: "",
  };
};
