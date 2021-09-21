import { FunctionComponent } from "react";
import { Switch } from "react-router-dom";
import { listRoutes } from "./listRoutes";
import { PrivateRoutes } from "./privateRoute";
import { PublicRoutes } from "./publicRoute";

const routesList = listRoutes.map(({ path, Component }) => {
  if (path === "/" || path === "*") {
    return <PublicRoutes path={path} Component={Component} exact />;
  }
  return <PrivateRoutes path={path} Component={Component} />;
});

export const RoutesConfig: FunctionComponent = (): JSX.Element => {
  return <Switch>{routesList}</Switch>;
};
