import { FunctionComponent } from "react";
import "./Button.scss";
import { ButtonProps } from "./types";

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  classes = "button-start",
  idForm,
  isDisabled,
  ariaLabel,
}): JSX.Element => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      form={idForm}
      onClick={onClick}
      className={classes}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
