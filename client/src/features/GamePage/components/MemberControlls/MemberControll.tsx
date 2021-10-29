import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Timer, Button } from "../../../../components";
import { exitGame } from "../../../../lib";
import {
  useAppSelector,
  GameSettingsCurrent,
  AppSettings,
} from "../../../../redux/store";

export const MemberControll: FunctionComponent = (): JSX.Element => {
  const { isTimerNeed } = useAppSelector(GameSettingsCurrent);
  const { tikTak } = useAppSelector(AppSettings);
  const dispatch = useDispatch();
  return (
    <>
      {isTimerNeed && (
        <div className="game-timer__wrapper">
          <Timer key="timer_member" isSettings={false} isTimer time={tikTak} />
        </div>
      )}
      <Button
        key="button_exit_member"
        type="button"
        onClick={() => exitGame(dispatch)}
        classes="button-start"
      >
        Exit
      </Button>
    </>
  );
};
