import { FunctionComponent } from "react";
import { issuesArrToStr } from "../../lib";
import { IssuesRedux, useAppSelector } from "../../redux/store";
import "./style.scss";
import { LobbyGameTitleProps } from "./types";

export const LobbyGameTitle: FunctionComponent<LobbyGameTitleProps> = ({
  classNames,
}): JSX.Element => {
  const { issues } = useAppSelector(IssuesRedux);
  const issuesName = issuesArrToStr(issues);
  return (
    <h1 className={classNames}>{`Game planning (issues ${issuesName})`}</h1>
  );
};
