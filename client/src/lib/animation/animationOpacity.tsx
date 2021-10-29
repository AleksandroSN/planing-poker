import { FunctionComponent } from "react";
import { animated, useTransition } from "react-spring";
import { ChatMessage } from "../../features/Socket/types";

interface AnimeOpacityProps {
  item: ChatMessage;
  children: JSX.Element | JSX.Element[];
}

export const AnimeOpacity: FunctionComponent<AnimeOpacityProps> = ({
  item,
  children,
}) => {
  const transitions = useTransition(item, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions((styles) => (
    <animated.div style={styles}>{children}</animated.div>
  ));
};
