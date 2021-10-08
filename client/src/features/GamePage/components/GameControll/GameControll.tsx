import { FunctionComponent } from "react";
import { Button } from "../../../../components";

export const GameControll: FunctionComponent = (): JSX.Element => {
  return (
    <div className="game-issues__control">
      <Button
        type="button"
        onClick={() => console.log("restart game")} // TODO restart game logic
        classes="button-start"
      >
        Restart Round
      </Button>
      <Button
        type="button"
        onClick={() => console.log("next issue")} // TODO next issue logic
        classes="button-start"
      >
        Next issue
      </Button>
    </div>
  );
};
