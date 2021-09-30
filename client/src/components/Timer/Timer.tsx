import { FunctionComponent } from "react";
import { InputText } from "../InputText";
import { timerClasses } from "./timerHelper";
import { TimerProps } from "./types";
import "./timer.scss";

export const Timer: FunctionComponent<TimerProps> = ({
  time,
  isSettings,
  isTimer,
  register,
}): JSX.Element => {
  const classes = timerClasses(isSettings);

  return (
    <div className={classes.main}>
      <div className="timer__wrapper">
        <div className="timer__minutes">
          <InputText
            inputProps={{
              labelText: "minutes",
              defaultValue: `${time && time[0]}`,
              inputClasses: "timer__input text-bold text-xxl",
              labelClasses: "timer__label text-bold text-s",
              isDisabled: true,
            }}
            hookForm={{ onRegister: register }}
          />
        </div>
        <span className="timer__splitter text-bold text-xl">:</span>
        <div className="timer__seconds">
          <InputText
            inputProps={{
              labelText: "seconds",
              defaultValue: `${time && time[1]}`,
              inputClasses: "timer__input text-bold text-xxl",
              labelClasses: "timer__label text-bold text-s",
              isDisabled: true,
            }}
            hookForm={{ onRegister: register }}
          />
        </div>
      </div>
    </div>
  );
};
