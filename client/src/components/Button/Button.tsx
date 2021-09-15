import { FunctionComponent } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
  classes?: string | undefined;
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  text,
  classes = "button-start",
}): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={classes}>
      {text}
    </button>
  );
};
