import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";

export const StopGameBtn: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();

  const moveToResults = () => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { appStage: "results" },
    });
  };
  return (
    <Button
      type="button"
      onClick={moveToResults} // TODO add stop game logic (redirect to result page)
      classes="button-cancel"
    >
      Stop Game
    </Button>
  );
};
