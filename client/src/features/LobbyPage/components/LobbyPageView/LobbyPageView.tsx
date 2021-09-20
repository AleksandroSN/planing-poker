import { FunctionComponent } from "react";
import "./style.scss";

interface LobbyPageViewProps {
  message?: string;
}

export const LobbyPageView: FunctionComponent<LobbyPageViewProps> = ({
  message = "Hello",
}): JSX.Element => {
  return <div>{message}</div>;
};
