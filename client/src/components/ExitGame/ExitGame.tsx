import { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { GameSettingsCurrent, useAppSelector } from "../../redux/store";
import "./style.scss";

export const ExitGame: FunctionComponent = (): JSX.Element => {
  const { appStage } = useAppSelector(GameSettingsCurrent);
  if (appStage === "out") {
    // after refresh page def app stage out, need replace logic for redux or something
    sessionStorage.clear();
    return <Redirect to="/" />;
  }
  return <></>;
};
