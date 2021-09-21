import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { ParamsGamePage } from "./types";

interface GamePageViewProps {
  message?: string;
}

export const GamePageView: FunctionComponent<GamePageViewProps> = ({
  message = "Hello",
}): JSX.Element => {
  const { id } = useParams<ParamsGamePage>();
  return <div>{`${message} ${id}`}</div>;
};
