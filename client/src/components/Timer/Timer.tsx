import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../../types/interface";
import { InputText } from "../InputText";
import { splitStr, timerClasses } from "./timerHelper";
import { TimerProps } from "./types";
import "./timer.scss";

export const Timer: FunctionComponent<TimerProps> = ({
  time,
  isSettings,
  isTimer,
}): JSX.Element => {
  const [splitTime, setSplitTime] = useState<Array<string>>([]);
  const { register } = useForm<FormValues>();
  const classes = timerClasses(isSettings);

  useEffect(() => {
    if (time) {
      const timer = splitStr(time, ":");
      setSplitTime(timer);
    }
    return () => {};
  }, [time]);

  return (
    <div className={classes.main}>
      <div className="timer__wrapper">
        <div className="timer__minutes">
          <InputText
            labelText="minutes"
            defaultValue={splitTime[0]}
            inputClasses="timer__input text-bold text-xxl"
            labelClasses="timer__label text-bold text-s"
            register={register}
            isTimer={isTimer}
          />
        </div>
        <span className="timer__splitter text-bold text-xl">:</span>
        <div className="timer__seconds">
          <InputText
            labelText="seconds"
            defaultValue={splitTime[1]}
            inputClasses="timer__input text-bold text-xxl"
            labelClasses="timer__label text-bold text-s"
            register={register}
            isTimer={isTimer}
          />
        </div>
      </div>
    </div>
  );
};
