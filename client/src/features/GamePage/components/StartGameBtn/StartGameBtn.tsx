import { FunctionComponent } from "react";
import { Button } from "../../../../components";

export const StartGameBtn: FunctionComponent = (): JSX.Element => {
  return (
    <Button
      type="button"
      onClick={() => console.log("start game")} // TODO add start game logic
      classes="button-start"
    >
      Run Round
    </Button>
  );
};
