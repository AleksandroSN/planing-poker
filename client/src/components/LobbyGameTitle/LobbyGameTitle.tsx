import { FunctionComponent } from "react";
import { issuesArrToStr } from "../../lib";
import {
  GameSettingsCurrent,
  IssuesRedux,
  useAppSelector,
} from "../../redux/store";
import { gameStatus } from "./helperLobbyGameTitle";
import "./style.scss";
import { LobbyGameTitleProps } from "./types";

export const LobbyGameTitle: FunctionComponent<LobbyGameTitleProps> = ({
  classNames,
}): JSX.Element => {
  const { issues } = useAppSelector(IssuesRedux);
  const { appStage } = useAppSelector(GameSettingsCurrent);
  const issuesName = issuesArrToStr(issues);
  const titleEl = gameStatus(appStage);
  return (
    <h1
      className={`page__title ${classNames}`}
    >{`Game ${titleEl} (issues ${issuesName})`}</h1>
  );
};
