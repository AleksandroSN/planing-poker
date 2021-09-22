import { FunctionComponent } from "react";
import { useTransition, animated } from "react-spring";

interface AnimeMountProps {
  mount: boolean;
  classes: string;
  children: JSX.Element | JSX.Element[];
}

export const AnimeMount: FunctionComponent<AnimeMountProps> = ({
  mount,
  classes,
  children,
}) => {
  const transitions = useTransition(mount, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles} className={classes}>
          {children}
        </animated.div>
      )
  );
};
