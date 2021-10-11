import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Chat,
  Issues,
  LobbyGameTitle,
  ResultOnCards,
  ScrumMaster,
  Timer,
} from "../../../../components";
import {
  AppSettings,
  GameSettingsCurrent,
  IssuesRedux,
  Players,
  ResultRedux,
  useAppSelector,
} from "../../../../redux/store";
import { AnimeChatMount } from "../../../../lib";
import { Player } from "../../../Socket/types";
import { ProgressBar } from "../ProgressBar";
import { MemberControll } from "../MemberControlls";
import { StopGameBtn } from "../StopGameBtn";
import { StartGameBtn } from "../StartGameBtn";
import { GameControll } from "../GameControll";
import { GameCards } from "../GameCards";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [playerRole, setPlayerRole] = useState<string>("Observer");
  const [issueId, setIssueId] = useState<string>("");
  const { chatOpen, tikTak, roundControl } = useAppSelector(AppSettings);
  const playerFromRedux = useAppSelector(Players);
  const { appStage, lobbyId, isTimerNeed } =
    useAppSelector(GameSettingsCurrent);
  const issueResults = useAppSelector(ResultRedux);
  const { issues } = useAppSelector(IssuesRedux);

  useEffect(() => {
    const player = sessionStorage.getItem("player");
    if (player) {
      const { role } = JSON.parse(player) as Player;
      setPlayerRole(role);
    }
  }, [playerRole]);

  useEffect(() => {
    const votingIssueIdx = issues.findIndex(
      (issue) => issue.issueStatus === "voting"
    );
    console.log(votingIssueIdx);
    if (votingIssueIdx >= 0) {
      const curIssue = issues[votingIssueIdx];
      setIssueId(curIssue.id);
    }
  }, [issues, issueResults]);

  if (appStage === "results") {
    return <Redirect to={`/result/${lobbyId}`} />;
  }

  return (
    <>
      <div className="game-page__wrapper">
        <section className="game-content__wrapper">
          <div className="game-page__title">
            <LobbyGameTitle
              classNames="lobby-page__title" /* fix classname */
            />
          </div>
          <div className="game-page__top">
            <ScrumMaster playersFromRedux={playerFromRedux} />
            {playerRole === "Dealer" && <StopGameBtn />}
            {playerRole === "Member" && <MemberControll />}
          </div>
          <div className="game-issues__wrapper">
            <div className="game-issues__block">
              <Issues />
            </div>
            {playerRole === "Dealer" && (
              <div className="game-issues__control-wrapper">
                {isTimerNeed && (
                  <div className="game-timer__wrapper">
                    <Timer isSettings={false} isTimer time={tikTak} />
                  </div>
                )}

                {roundControl.status !== "isStoped" && <StartGameBtn />}
                {roundControl.status === "isStoped" && <GameControll />}
              </div>
            )}
            {playerRole === "Member" && roundControl.status === "isStoped" && (
              <>
                <h2>Statistics</h2>
                <ResultOnCards issueResults={issueResults} issueId={issueId} />
              </>
            )}
          </div>
          {playerRole === "Dealer" && roundControl.status === "isStoped" && (
            <>
              <h2>Statistics</h2>
              <ResultOnCards issueResults={issueResults} issueId={issueId} />
            </>
          )}
          <GameCards role={playerRole} />
        </section>
        <ProgressBar />
      </div>

      <AnimeChatMount mount={chatOpen} classes="chat__container">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
