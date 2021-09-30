import { FunctionComponent, useState } from "react";
import { GameSettingsProps } from "./types";
import { InputText, Switcher, Timer } from "../../../../components";
import { AnimeTimerMount } from "../../lib";
import "./gameSettings.scss";

export const GameSettings: FunctionComponent<GameSettingsProps> = ({
  register,
}): JSX.Element => {
  const [isTimerNeed, setIsTimerNeed] = useState<boolean>(false);
  const toggleTimer = () => {
    setIsTimerNeed((prev) => !prev);
  };
  return (
    <>
      <div className="game-settings">
        <Switcher
          register={register}
          id="switcherBox1"
          labelText="Scrum master as player"
        />
        <Switcher
          register={register}
          id="switcherBox2"
          labelText="Changing card in round end"
        />
        <Switcher
          register={register}
          toggleTimer={toggleTimer}
          id="switcherBox3"
          labelText="Is timer needed"
        />
        <InputText
          inputProps={{ labelText: "Score type" }}
          hookForm={{ onRegister: register }}
        />
        <InputText
          inputProps={{ labelText: "Score type (Short)" }}
          hookForm={{ onRegister: register }}
        />
        <AnimeTimerMount mount={isTimerNeed} classes="game-settings__timer">
          <p className="timer__text">Round time:</p>
          <Timer isSettings register={register} isTimer={false} />
        </AnimeTimerMount>
      </div>
    </>
  );
};
