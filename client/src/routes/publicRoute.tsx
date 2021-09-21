import { FunctionComponent } from "react";
import { Route } from "react-router-dom";

interface SomeProps {
  path: string;
  Component: FunctionComponent;
  exact: boolean;
}

export const PublicRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
  exact,
}) => {
  return <Route key={path} path={path} exact={exact} component={Component} />;
};
