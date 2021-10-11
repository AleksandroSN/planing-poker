import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import { AppSettings, useAppSelector } from "../../../../redux/store";

export const StopGameBtn: FunctionComponent = (): JSX.Element => {
  const { roundControl } = useAppSelector(AppSettings);
  const dispatch = useDispatch();
  const roundStart = roundControl.status === "isRun";
  const moveToResults = () => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { appStage: "results" },
    });
  };
  return (
    <Button
      type="button"
      onClick={moveToResults}
      classes="button-start"
      isDisabled={roundStart}
    >
      Stop Game
    </Button>
  );
};
