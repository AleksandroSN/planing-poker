import { FunctionComponent } from "react";
import { issuesArrToStr } from "../../lib";
import {
  GameSettingsCurrent,
  IssuesRedux,
  useAppSelector,
} from "../../redux/store";
import "./style.scss";
import { LobbyGameTitleProps } from "./types";

export const LobbyGameTitle: FunctionComponent<LobbyGameTitleProps> = ({
  classNames,
}): JSX.Element => {
  const { issues } = useAppSelector(IssuesRedux);
  const { appStage } = useAppSelector(GameSettingsCurrent);
  const issuesName = issuesArrToStr(issues);
  return (
    <h1 className={classNames}>{`Game ${
      appStage === "lobby" ? "planning" : "start"
    } (issues ${issuesName})`}</h1>
  );
};
