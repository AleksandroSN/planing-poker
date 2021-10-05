import { Dispatch } from "redux";
import { arrToNumber } from "../../../../lib";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import { FormValues } from "../../../../types/interface";
import { UpdatedSettings } from "../../types/interface";

export const saveSettings = (data: FormValues): void => {
  const newSettings: UpdatedSettings = {
    masterIsPlayer: data["Scrum master as player"],
    isTimerNeed: data["Is timer needed"],
    changingCardInRoundEnd: data["Changing card in round end"],
    scoreType: data["Score type"],
    scoreTypeShort: data["Score type (Short)"],
    roundTime: arrToNumber([data.minutes, data.seconds]),
    appStage: "lobby",
  };
  sessionStorage.setItem("settings", JSON.stringify(newSettings));
};

export const loadSettings = (dispatch: Dispatch): void => {
  const savedSettings = sessionStorage.getItem("settings");
  if (savedSettings) {
    const updatedSettings: UpdatedSettings = JSON.parse(savedSettings);
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: updatedSettings,
    });
  }
};
