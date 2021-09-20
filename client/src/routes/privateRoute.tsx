import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";

interface SomeProps {
  path: string;
  Component: React.FunctionComponent;
}

const isLogin = false;

export const PrivateRoutes: FunctionComponent<SomeProps> = ({
  path,
  Component,
}) => {
  return (
    <Route exact key={path} path={path}>
      {isLogin ? <Component /> : <Redirect to="/" />}
    </Route>
  );
};
