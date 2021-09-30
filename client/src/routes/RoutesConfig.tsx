import { useTransition, animated } from "react-spring";
import { FunctionComponent } from "react";
import { Switch, useLocation } from "react-router-dom";
import { listRoutes } from "./listRoutes";
import { PrivateRoutes } from "./privateRoute";
import { PublicRoutes } from "./publicRoute";
import { findID, checkAuth } from "../lib";

export const RoutesConfig: FunctionComponent = (): JSX.Element => {
  const location = useLocation();
  const idGame = findID(location.pathname);
  const isLogin = checkAuth(idGame);

  const routesList = listRoutes.map(({ path, Component }) => {
    if (path === "/" || path === "*") {
      return (
        <PublicRoutes key={path} path={path} Component={Component} exact />
      );
    }
    return (
      <PrivateRoutes
        key={path}
        path={path}
        Component={Component}
        isLogin={isLogin}
        idGame={idGame}
      />
    );
  });

  const transitions = useTransition(location, {
    from: { opacity: 0, left: -4000 },
    enter: { opacity: 1, position: "relative", left: 0 },
    leave: { opacity: 0 },
  });
  return transitions((styles, item) => (
    <animated.main style={styles} className="App-main">
      <Switch location={item}>{routesList}</Switch>
    </animated.main>
  ));
};
