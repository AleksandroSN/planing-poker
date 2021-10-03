import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Chat, InputText, User, Issues } from "../../../../components";
import { FormValues } from "../../../../types/interface";
import {
  BASE_CLIENT,
  dummyPlayer,
  isReallyYou,
  AnimeChatMount,
  arrToNumber,
} from "../../../../lib";
import {
  useAppSelector,
  AppSettings,
  Players,
  GameSettingsCurrent,
} from "../../../../redux/store";
import { LobbySetting, Player } from "../../../Socket/types";
import { GameSettings } from "../GameSettings";
import "./style.scss";
import { GameCards } from "../GameCards";
import { updateSettings } from "../../../Socket/lib/updateSettings";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [dealerState, setDealerState] = useState<Player>(dummyPlayer);
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const { pathname } = useLocation();
  const { chatOpen } = useAppSelector(AppSettings);
  const settings = useAppSelector(GameSettingsCurrent);
  const playersFromRedux = useAppSelector(Players);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playersFromRedux.length > 0) {
      const dealer = playersFromRedux.filter(
        (player) => player.role === "Dealer"
      )[0];
      setDealerState(dealer);
    }
  }, [playersFromRedux]);

  const [isMaster, setIsMaster] = useState<boolean>(false);
  const players = playersFromRedux
    .filter((player) => {
      return player.role !== "Dealer";
    })
    .map((filterPlayers) => {
      return (
        <User
          avatar={filterPlayers.avatarImage}
          firstName={filterPlayers.firstName}
          lastName={filterPlayers.lastName}
          jobPosition={filterPlayers.jobPosition}
          isChat={false}
          isYou={isReallyYou(filterPlayers.firstName)}
        />
      );
    });

  useEffect(() => {
    const localPlayer = sessionStorage.getItem("player");
    if (localPlayer) {
      const player = JSON.parse(localPlayer) as Player;
      const reallyMaster = player.role === "Dealer";
      setIsMaster(reallyMaster);
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    const newSettings = {
      masterIsPlayer: data["Scrum master as player"],
      isTimerNeed: data["Is timer needed"],
      changingCardInRoundEnd: data["Changing card in round end"],
      scoreType: data["Score type"],
      scoreTypeShort: data["Score type (Short)"],
      roundTime: arrToNumber([data.minutes, data.seconds]),
    };
    const allNewSettins: LobbySetting = { ...settings, ...newSettings };
    await updateSettings(allNewSettins, dispatch);
  };
  return (
    <>
      <div className="content__wrapper">
        <form className="lobby-page-wrapper">
          <div>
            <h2 className="lobby-page__title text-xl">Issue</h2>
          </div>
          <div className="master-card">
            <div className="master-card__title">Scrum master:</div>
            <User
              avatar={dealerState.avatarImage}
              firstName={dealerState.firstName}
              lastName={dealerState.lastName}
              jobPosition={dealerState.jobPosition}
              isChat={false}
              isYou={isReallyYou(dealerState.firstName)}
            />
          </div>
          {isMaster && (
            <div className="start-game__block">
              <div className="link__block">
                <InputText
                  inputProps={{
                    defaultValue: `${BASE_CLIENT}${pathname}`,
                    labelText: "Link",
                    labelClasses: "lobby-link__label",
                    inputClasses: "lobby-page-link__input",
                    isDisabled: true,
                  }}
                  hookForm={{
                    onRegister: register,
                  }}
                />
                <CopyToClipboard text={`${BASE_CLIENT}${pathname}`}>
                  <Button type="button" classes="copy-link__button">
                    Copy
                  </Button>
                </CopyToClipboard>
              </div>
              <div className="start-game__button-block">
                <Button type="button" onClick={handleSubmit(onSubmit)}>
                  Start Game
                </Button>
                <Button
                  type="button"
                  onClick={() => console.log("Redirect to main page")}
                  classes="button-cancel"
                >
                  Cancel Game
                </Button>
              </div>
            </div>
          )}
          {!isMaster && (
            <div className="exit-game__block">
              <Button
                type="button"
                onClick={() => console.log("Exit")}
                classes="button-cancel"
              >
                Exit
              </Button>
            </div>
          )}
          <div className="members__block">
            <h2 className="members__title text-xl">Members:</h2>
            <div className="members__wrapper">{players}</div>
          </div>
          {isMaster && (
            <div className="issues__block">
              <Issues />
            </div>
          )}
          {isMaster && (
            <div className="settings__block">
              <h2 className="settings__block__title text-xl">Game Settings:</h2>
              <GameSettings onRegister={register} onWatch={watch} />
            </div>
          )}
          {isMaster && <GameCards />}
        </form>
      </div>
      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
