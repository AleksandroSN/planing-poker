import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Chat,
  Issues,
  LobbyGameTitle,
  Timer,
} from "../../../../components";
import { FormValues } from "../../../../types/interface";
import {
  AppSettings,
  GameSettingsCurrent,
  Players,
  useAppSelector,
} from "../../../../redux/store";
import { ProgressBar } from "../ProgressBar";
import { Cards } from "../../../../components/AddCardSection/Cards";
import { ScrumMaster } from "../../../../components/ScrumMaster/ScrumMaster";
import { AnimeChatMount, cardsSets } from "../../../../lib";
import "./style.scss";

const handleExit = () => {
  console.log("exit");
};

const updateCards = () => {
  console.log("Update");
};

// TODO add chat
export const Layout: FunctionComponent = (): JSX.Element => {
  const [isMaster, setIsMaster] = useState(true);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [cardsDeck, setCardsDeck] = useState<string[]>([]);
  const { chatOpen } = useAppSelector(AppSettings);
  const playerFromRedux = useAppSelector(Players);
  const gameSettings = useAppSelector(GameSettingsCurrent);

  const gameCards = cardsDeck.map((value) => {
    return (
      <Cards value={value} scoreTypeShort="SP" updateCards={updateCards} />
    );
  });

  const { register } = useForm<FormValues>();

  useEffect(() => {
    const deck = cardsSets.filter(
      (set) => set.category === gameSettings.cardValues
    )[0];
    if (deck) {
      setCardsDeck(deck.values);
    }
  }, [gameSettings]);

  return (
    <>
      <div className="game-page__wrapper">
        <section className="game-content__wrapper">
          <div className="game-page__title">
            <LobbyGameTitle classNames="lobby-page__title" />
          </div>
          <div className="game-page__top">
            <ScrumMaster playersFromRedux={playerFromRedux} />
            {isMaster && (
              <Button
                type="button"
                onClick={handleExit} // TODO add stop game logic (redirect to result page)
                classes="button-cancel"
              >
                Stop Game
              </Button>
            )}
            {isPlayer && (
              <>
                <div className="game-timer__wrapper">
                  <Timer
                    isSettings={false}
                    isTimer
                    register={register}
                    time={["2", "19"]}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleExit} // exit from game
                  classes="button-cancel"
                >
                  Exit
                </Button>
              </>
            )}
          </div>
          <div className="game-issues__wrapper">
            <div className="game-issues__block">
              <Issues />
            </div>
            {isMaster && (
              <div className="game-issues__control-wrapper">
                <div className="game-timer__wrapper">
                  <Timer
                    isSettings={false}
                    isTimer
                    register={register}
                    time={["2", "19"]}
                  />
                </div>

                {isStart && (
                  <Button
                    type="submit"
                    onClick={() => console.log("start game")} // TODO add start game logic
                    classes="button-start"
                  >
                    Run Round
                  </Button>
                )}
                {isWaiting && (
                  <div className="game-issues__control">
                    <Button
                      type="button"
                      onClick={() => console.log("restart game")} // TODO restart game logic
                      classes="button-start"
                    >
                      Restart Round
                    </Button>
                    <Button
                      type="button"
                      onClick={() => console.log("next issue")} // TODO next issue logic
                      classes="button-start"
                    >
                      Next issue
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          {
            isStart && (
              <div className="game-page__cards">{gameCards}</div>
            ) /* if game start and master can vote */
          }
        </section>
        <ProgressBar />
      </div>

      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
