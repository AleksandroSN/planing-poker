import { FunctionComponent } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
  classes?: string | undefined;
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  text,
  classes,
}): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  classes: "button-start",
};
