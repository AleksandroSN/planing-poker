import { FunctionComponent } from "react";
import "./style.scss";

interface ErrorWindowProps {
  message: string;
}

export const ErrorWindow: FunctionComponent<ErrorWindowProps> = ({
  message,
}): JSX.Element => {
  return <div className="modal-error-text">{message}</div>;
};
