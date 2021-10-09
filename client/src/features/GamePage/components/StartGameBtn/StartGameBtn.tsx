import { FunctionComponent } from "react";
import { Button } from "../../../../components";
import { startGame } from "../../../Socket/lib/game/methods";
import { Player } from "../../../Socket/types";

export const StartGameBtn: FunctionComponent = (): JSX.Element => {
  const player = sessionStorage.getItem("player");
  const { lobbyId } = player as unknown as Player;
  return (
    <Button
      type="button"
      onClick={() => startGame(lobbyId)}
      classes="button-start"
    >
      Run Round
    </Button>
  );
};
