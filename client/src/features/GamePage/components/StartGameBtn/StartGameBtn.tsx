import { FunctionComponent } from "react";
import { Button } from "../../../../components";
import { AppSettings, useAppSelector } from "../../../../redux/store";
import { startGame } from "../../../Socket/lib/game/methods";
import { Player } from "../../../Socket/types";

export const StartGameBtn: FunctionComponent = (): JSX.Element => {
  const { roundControl } = useAppSelector(AppSettings);
  const player = sessionStorage.getItem("player");
  const { lobbyId } = JSON.parse(player as string) as Player;
  return (
    <Button
      type="button"
      onClick={() => startGame(lobbyId)}
      classes="button-start"
      isDisabled={roundControl.status === "isRun"}
    >
      Run Round
    </Button>
  );
};
