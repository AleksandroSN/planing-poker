import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../Layout";
import { ParamsLobbyPage } from "./types";
import "./style.scss";

interface LobbyPageViewProps {
  message?: string;
}

export const LobbyPageView: FunctionComponent<LobbyPageViewProps> = ({
  message = "Hello",
}): JSX.Element => {
  const { id } = useParams<ParamsLobbyPage>();
  return (
    <>
      <div>{`${message} ${id}`}</div>
      <Layout />
    </>
  );
};
