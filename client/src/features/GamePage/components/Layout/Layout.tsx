import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Chat, Timer } from "../../../../components";
import { FormValues } from "../../../../types/interface";
import {
  AppSettings,
  IssuesRedux,
  useAppSelector,
} from "../../../../redux/store";
import { ProgressBar } from "../ProgressBar";
import { Cards } from "../../../../components/AddCardSection/Cards";
import "../GamePageView/style.scss";
import { ScrumMaster } from "../../../../components/ScrumMaster/ScrumMaster";
import { AnimeChatMount } from "../../../../lib";
import { Issue } from "../../../../components/Issues/IssueItem/Issue";

// TODO add chat
export const Layout: FunctionComponent = (): JSX.Element => {
  const [isMaster, setIsMaster] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);
  const [isStart, setIsStart] = useState(true);
  const { chatOpen } = useAppSelector(AppSettings);
  const issuesFromRedux = useAppSelector(IssuesRedux);

  /* useEffect(() => {
    if (issuesFromRedux.issues) {
      const activeIssue = issuesFromRedux.issues.filter(
        (issue) => issue.status === "Active"
      );
      setIsActive(activeIssue);
    }
  }, [issuesFromRedux]);
 */

  const issues = issuesFromRedux.issues.map((issue) => {
    return (
      <Issue
        id={issue.id}
        title={issue.title}
        link={issue.link}
        priority={issue.priority}
      />
    );
  });

  const handleExit = () => {
    console.log("exit");
  };

  const updateCards = () => {
    console.log("Update");
  };

  const { register } = useForm<FormValues>();

  return (
    <>
      <div className="game-page__wrapper">
        <section className="game-content__wrapper">
          <h1 className="text-xl">Issue</h1>
          <div className="game-issues__wrapper">
            <ScrumMaster />
            {isMaster && (
              <Button
                type="button"
                onClick={handleExit} // TODO add exit logic
                classes="button-cancel"
              >
                Stop Game
              </Button>
            )}
            {isPlayer && (
              <>
                <Timer isSettings={false} isTimer={false} register={register} />
                <Button
                  type="button"
                  onClick={handleExit}
                  classes="button-cancel"
                >
                  Exit
                </Button>
              </>
            )}
          </div>
          <div className="game-issues__wrapper">
            <div className="game-issues__block">{issues}</div>
            {isMaster && (
              <div className="game-issues__block">
                <div className="game-timer__wrapper">
                  <Timer
                    isSettings={false}
                    isTimer={false}
                    register={register}
                  />
                </div>
                <Button
                  type="submit"
                  onClick={() => console.log("start game")} // TODO add start game logic
                  classes="button-start"
                >
                  Run Round
                </Button>
              </div>
            )}
          </div>
          {isStart && (
            <Cards value="1" scoreTypeShort="SP" updateCards={updateCards} />
          )}
        </section>
        <ProgressBar />
      </div>

      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
