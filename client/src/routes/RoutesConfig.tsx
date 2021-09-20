import { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { listRoutes } from "./listRoutes";

const routesList = listRoutes.map(({ path, Component }) => {
  return (
    <Route key={path} exact path={path}>
      <div className="App-main__anime-page">
        <Component />
      </div>
    </Route>
  );
});

export const RoutesConfig: FunctionComponent = (): JSX.Element => {
  return <Switch>{routesList}</Switch>;
};
