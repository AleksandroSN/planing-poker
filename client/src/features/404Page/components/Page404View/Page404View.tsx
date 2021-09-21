import { FunctionComponent } from "react";
import "./style.scss";

interface Page404ViewProps {
  message?: string;
}

export const Page404View: FunctionComponent<Page404ViewProps> = ({
  message = "404 PAGE",
}): JSX.Element => {
  return <div>{message}</div>;
};
