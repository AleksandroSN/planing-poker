import { FunctionComponent } from "react";
import { Button } from "../../../../components";
import { AppSettings, useAppSelector } from "../../../../redux/store";
import { startGame } from "../../../Socket/lib/game/methods";

export const StartGameBtn: FunctionComponent = (): JSX.Element => {
  const { roundControl } = useAppSelector(AppSettings);
  return (
    <Button
      type="button"
      onClick={startGame}
      classes="button-start"
      isDisabled={roundControl.status === "isRun"}
    >
      Run Round
    </Button>
  );
};
