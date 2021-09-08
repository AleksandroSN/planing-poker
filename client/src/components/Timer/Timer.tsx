import { FunctionComponent } from "react";
import "./timer.scss";
import { TimerClasses } from "./timerHelper";

interface TimerProps {
  seconds?: number;
  settings?: boolean;
}

export const Timer: FunctionComponent<TimerProps> = (): JSX.Element => {
  // const classes = TimerClasses(settings);

  return (
    <div className="timer timer--settings">
      <div className="timer__wrapper">
        <div className="timer__minutes">
          <label
            htmlFor="timerMinutes"
            className="timer__label text-bold text-s"
          >
            minutes
            <input
              type="text"
              name="timerMinutes"
              className="timer__input text-bold text-xxl"
            />
          </label>
        </div>
        <span className="timer__splitter text-bold text-xl">:</span>
        <div className="timer__seconds">
          <label
            htmlFor="timerSeconds"
            className="timer__label text-bold text-s"
          >
            seconds
            <input
              type="text"
              name="timerSeconds"
              className="timer__input text-bold text-xxl"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
