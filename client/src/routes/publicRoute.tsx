import { FunctionComponent } from "react";
import { Route } from "react-router-dom";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
}

export const PublicRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
}) => {
  return <Route exact key={path} path={path} render={() => <Component />} />;
};
