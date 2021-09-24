import { FunctionComponent } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { findID } from "../lib";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
}

const isLogin = true;

export const PrivateRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
}) => {
  const { pathname } = useLocation();
  const idGame = findID(pathname);
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
