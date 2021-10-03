import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GameSettingsProps } from "./types";
import { InputText, Switcher, Timer } from "../../../../components";
import { AnimeTimerMount } from "../../lib";
import "./gameSettings.scss";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import { GameSettingsCurrent, useAppSelector } from "../../../../redux/store";
import { numberToArr } from "../../../../lib";

export const GameSettings: FunctionComponent<GameSettingsProps> = ({
  onRegister,
  onWatch,
}): JSX.Element => {
  const [isTimerNeed, setIsTimerNeed] = useState<boolean>(false);
  const settings = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch(); // move all logic in context
  const toggleTimer = () => {
    setIsTimerNeed((prev) => !prev);
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
        />
        <Switcher
          register={onRegister}
          defaultValue={settings.changingCardInRoundEnd}
          id="switcherBox2"
          labelText="Changing card in round end"
        />
        <Switcher
          register={onRegister}
          defaultValue={settings.isTimerNeed}
          toggleTimer={toggleTimer}
          id="switcherBox3"
          labelText="Is timer needed"
        />
        <InputText
          inputProps={{
            labelText: "Score type",
            defaultValue: settings.scoreType,
          }}
          hookForm={{ onRegister }}
        />
        <InputText
          inputProps={{
            labelText: "Score type (Short)",
            defaultValue: settings.scoreTypeShort,
          }}
          hookForm={{ onRegister }}
        />
        <AnimeTimerMount mount={isTimerNeed} classes="game-settings__timer">
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
