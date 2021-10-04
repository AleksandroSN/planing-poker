import { FluxStandardAction } from "flux-standard-action";
import { GameSettingsActions } from "./actions";

export interface GameSettingsState {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: string[]; // arr CardValuesModel
  cardsCover: string;
  lobbyId: string;
  masterId: string;
  appStage: "lobby" | "game" | "out";
}

const initialGameSettingsState: GameSettingsState = {
  masterIsPlayer: false,
  isTimerNeed: false,
  changingCardInRoundEnd: false,
  scoreType: "story point",
  scoreTypeShort: "SP",
  roundTime: 140,
  cardValues: [],
  cardsCover: "",
  lobbyId: "",
  masterId: "",
  appStage: "out",
};

export const gameSettingsReducer = (
  state: GameSettingsState = initialGameSettingsState,
  action: FluxStandardAction
): GameSettingsState => {
  switch (action.type) {
    case GameSettingsActions.updateSetiings: {
      const newData = action.payload as unknown as GameSettingsState;
      return { ...state, ...newData };
    }
    case GameSettingsActions.outGameSettings: {
      return { ...state, appStage: "out" };
    }
    default:
      return state;
  }
};
