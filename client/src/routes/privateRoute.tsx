import { FunctionComponent } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Player } from "../features/Socket/types";
import { findID } from "../lib";
import { useAppSelector, GameSettingsState } from "../redux/store";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
}

// const isLogin = localStorage.getItem("player"); // TO DO and search in redux

export const PrivateRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
}) => {
  const { pathname } = useLocation();
  const idGame = findID(pathname);
  const lobbyId = useAppSelector(GameSettingsState);
  const localPlayer = localStorage.getItem("player");
  let isLogin = lobbyId.lobbyId === idGame;
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    isLogin = lobbyId.lobbyId === idGame && player.lobbyId === idGame;
  }
  return (
    <Route
      key={path}
      path={path}
      render={() => {
        return isLogin ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/", state: { idGame } }} />
        );
      }}
    />
  );
};
