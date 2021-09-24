import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
}

const isLogin = true;

export const PrivateRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
}) => {
  return (
    <Route
      key={path}
      path={path}
      render={() => {
        return isLogin ? <Component /> : <Redirect to="/" />;
      }}
    />
  );
};
