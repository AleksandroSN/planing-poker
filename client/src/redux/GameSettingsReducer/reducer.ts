import { FluxStandardAction } from "flux-standard-action";
import { GameSettingsActions } from "./actions";

export interface GameSettingsState {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: Array<string>; // to do rework
  lobbyId: string;
  masterId: string;
}

const initialGameSettingsState: GameSettingsState = {
  masterIsPlayer: true,
  isTimerNeed: true,
  changingCardInRoundEnd: false,
  scoreType: "story point",
  scoreTypeShort: "SP",
  roundTime: 140,
  cardValues: [""],
  lobbyId: "",
  masterId: "",
};

export const gameSettingsReducer = (
  state: GameSettingsState = initialGameSettingsState,
  action: FluxStandardAction
): GameSettingsState => {
  switch (action.type) {
    case GameSettingsActions.updateSetiings: {
      return { ...state, ...(action.payload as unknown as GameSettingsState) };
    }
    default:
      return state;
  }
};
