import { FunctionComponent } from "react";
import { HandlerErrorsProps } from "./types";

export const handlerErrors: FunctionComponent<HandlerErrorsProps> = ({
  labelText,
  isError,
  classes,
}): JSX.Element | null => {
  if (isError && isError[`${labelText}`]) {
    return (
      <span className={classes}>{`${isError[`${labelText}`].message}`}</span>
    );
  }
  return null;
};
