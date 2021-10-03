import { FunctionComponent } from "react";
import { useTransition, animated } from "react-spring";

interface AnimeMountProps {
  mount: boolean;
  classes: string;
  children: JSX.Element | JSX.Element[];
}

export const AnimeChatMount: FunctionComponent<AnimeMountProps> = ({
  mount,
  classes,
  children,
}) => {
  const transitions = useTransition(mount, {
    from: { opacity: 0, right: -1000 },
    enter: { opacity: 1, right: 0 },
    leave: { opacity: 0 },
  });
  return transitions(
    (styles, item) =>
      item && (
        <animated.aside style={styles} className={classes}>
          {children}
        </animated.aside>
      )
  );
};
