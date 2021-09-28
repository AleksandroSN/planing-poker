import { FunctionComponent } from "react";
import "./Button.scss";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  classes?: string | undefined;
  idForm?: string;
  children: React.ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  classes = "button-start",
  idForm,
}): JSX.Element => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      form={idForm}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};
