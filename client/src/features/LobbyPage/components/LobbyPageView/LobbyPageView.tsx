import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { ParamsLobbyPage } from "./types";

interface LobbyPageViewProps {
  message?: string;
}

export const LobbyPageView: FunctionComponent<LobbyPageViewProps> = ({
  message = "Hello",
}): JSX.Element => {
  const { id } = useParams<ParamsLobbyPage>();
  return <div>{`${message} ${id}`}</div>;
};
