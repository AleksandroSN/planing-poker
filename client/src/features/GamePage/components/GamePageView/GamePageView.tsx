import { FunctionComponent } from "react";
import "./style.scss";

interface GamePageViewProps {
  message?: string;
}

export const GamePageView: FunctionComponent<GamePageViewProps> = ({
  message = "Hello",
}): JSX.Element => {
  return <div>{message}</div>;
};
