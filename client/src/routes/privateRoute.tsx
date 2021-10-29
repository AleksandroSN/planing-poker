import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
  isLogin: boolean;
  idGame: string;
}

export const PrivateRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
  isLogin,
  idGame,
}) => {
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
