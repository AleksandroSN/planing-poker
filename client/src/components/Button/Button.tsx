import { FunctionComponent } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  classes?: string | undefined;
  children: React.ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  classes = "button-start",
}): JSX.Element => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};
