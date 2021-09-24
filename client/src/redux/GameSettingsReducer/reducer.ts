import { FluxStandardAction } from "flux-standard-action";
import { GameSettingsActions } from "./actions";

interface GameSettingsState {
  masterIsPlayer: boolean;
  isTimerNeed: boolean;
  changingCardInRoundEnd: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  cardValues: Array<string>;
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
  lobbyId: "2be7d3c0-4b9a-490f-b063-a5eadbc390f1",
  masterId: "03e02f09-32ee-40da-93e7-5b6fc50891c7",
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
