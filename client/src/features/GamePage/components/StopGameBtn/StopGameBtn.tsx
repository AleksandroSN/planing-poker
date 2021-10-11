import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import {
  AppSettings,
  useAppSelector,
  GameSettingsCurrent,
} from "../../../../redux/store";
import { updateSettings } from "../../../Socket/lib/updateSettings";

type TypeAppStage = "lobby" | "game" | "out" | "results" | "";

export const StopGameBtn: FunctionComponent = (): JSX.Element => {
  const { roundControl } = useAppSelector(AppSettings);
  const settings = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch();
  const roundStart = roundControl.status === "isRun";
  const moveToResults = async () => {
    const appStage: TypeAppStage = "results";
    const newSettings = { ...settings, appStage };
    await updateSettings(newSettings, dispatch);
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
