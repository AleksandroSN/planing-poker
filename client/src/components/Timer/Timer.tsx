import "./timer.scss";
import { TimerClasses } from "./timerHelper";

interface TimerProps {
  // minutes?: number;
  // seconds?: number;
  settings: boolean;
}

export const Timer: React.FC<TimerProps> = ({ settings }: TimerProps) => {
  // const regex = /^[0-9\b]+$/;
  const classes = TimerClasses(settings);
  return (
    <div className={classes.main}>
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
