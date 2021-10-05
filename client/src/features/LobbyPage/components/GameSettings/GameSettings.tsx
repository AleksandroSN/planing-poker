import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameSettingsProps } from "./types";
import { InputText, Switcher, Timer } from "../../../../components";
import { AnimeTimerMount } from "../../lib";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import { GameSettingsCurrent, useAppSelector } from "../../../../redux/store";
import { numberToArr } from "../../../../lib";
import "./gameSettings.scss";

export const GameSettings: FunctionComponent<GameSettingsProps> = ({
  onRegister,
  onWatch,
  errors,
}): JSX.Element => {
  const settings = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch(); // move all logic in context
  // refactor toggle func for controll switchers
  const toggleTimer = () => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { isTimerNeed: !settings.isTimerNeed },
    });
  };
  const toggleScrum = () => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { masterIsPlayer: !settings.masterIsPlayer },
    });
  };
  const toggleShirt = () => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { changingCardInRoundEnd: !settings.changingCardInRoundEnd },
    });
  };
  const baseTime = numberToArr(settings.roundTime);
  const spShortValue = onWatch("Score type (Short)");

  useEffect(() => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { scoreTypeShort: spShortValue },
    });
  }, [spShortValue]);

  return (
    <>
      <div className="game-settings">
        <Switcher
          register={onRegister}
          defaultValue={settings.masterIsPlayer}
          id="switcherBox1"
          labelText="Scrum master as player"
          toggle={toggleScrum}
        />
        <Switcher
          register={onRegister}
          defaultValue={settings.changingCardInRoundEnd}
          id="switcherBox2"
          labelText="Changing card in round end"
          toggle={toggleShirt}
        />
        <Switcher
          register={onRegister}
          defaultValue={settings.isTimerNeed}
          toggle={toggleTimer}
          id="switcherBox3"
          labelText="Is timer needed"
        />
        <InputText
          inputProps={{
            labelText: "Score type",
            defaultValue: settings.scoreType,
          }}
          hookForm={{
            onRegister,
            regOptions: {
              required: { value: true, message: "This field is required" },
            },
            isError: errors,
          }}
        />
        <InputText
          inputProps={{
            labelText: "Score type (Short)",
            defaultValue: settings.scoreTypeShort,
          }}
          hookForm={{
            onRegister,
            regOptions: {
              required: { value: true, message: "This field is required" },
            },
            isError: errors,
          }}
        />
        <AnimeTimerMount
          mount={settings.isTimerNeed}
          classes="game-settings__timer"
        >
          <p className="timer__text">Round time:</p>
          <Timer
            isSettings
            register={onRegister}
            isTimer={false}
            time={baseTime}
          />
        </AnimeTimerMount>
      </div>
    </>
  );
};
