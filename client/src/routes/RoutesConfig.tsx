import { useTransition, animated } from "react-spring";
import { FunctionComponent } from "react";
import { Switch, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, left: -4000 },
    enter: { opacity: 1, position: "relative", left: 0 },
    leave: { opacity: 0 },
  });
  return transitions((styles, item) => (
    <animated.div style={styles}>
      <Switch location={item}>{routesList}</Switch>
    </animated.div>
  ));
};
