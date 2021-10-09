import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Button,
  Chat,
  InputText,
  User,
  Issues,
  ScrumMaster,
  LobbyGameTitle,
} from "../../../../components";
import { FormValues } from "../../../../types/interface";
import {
  isReallyYou,
  AnimeChatMount,
  arrToNumber,
  exitGame,
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
import { UpdatedSettings } from "../../types/interface";
import { defaultLobbySettings } from "../../lib";
import { loadSettings, saveSettings } from "./layoutHelper";
import { BASE_CLIENT } from "../../../../api";

export const Layout: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isMaster, setIsMaster] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const { chatOpen } = useAppSelector(AppSettings);
  const settings = useAppSelector(GameSettingsCurrent);
  const playersFromRedux = useAppSelector(Players);
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
          isYou={isReallyYou(filterPlayers.id)}
          player={filterPlayers}
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

  const toggleCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const cancelGame = async () => {
    if (settings) {
      await updateSettings(defaultLobbySettings(settings.lobbyId), dispatch);
    }
    // delete lobby on back-end
  };

  const onSubmit = async (data: FormValues) => {
    const newSettings: UpdatedSettings = {
      masterIsPlayer: data["Scrum master as player"],
      isTimerNeed: data["Is timer needed"],
      cardValues: data.cardsValue,
      changingCardInRoundEnd: data["Changing card in round end"],
      scoreType: data["Score type"],
      scoreTypeShort: data["Score type (Short)"],
      roundTime: arrToNumber([data.minutes, data.seconds]),
      appStage: "game",
    };
    const allNewSettins: LobbySetting = { ...settings, ...newSettings };
    await updateSettings(allNewSettins, dispatch);
  };
  if (settings.appStage === "game") {
    return <Redirect to={`/game/${settings.lobbyId}`} />;
  }

  return (
    <>
      <div className="content__wrapper">
        <form className="lobby-page-wrapper">
          <div>
            <LobbyGameTitle classNames="lobby-page__title" />
          </div>
          <ScrumMaster playersFromRedux={playersFromRedux} />
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
                />
                <CopyToClipboard text={`${BASE_CLIENT}${pathname}`}>
                  <Button
                    type="button"
                    classes="copy-link__button"
                    onClick={toggleCopy}
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
                {isCopy && <p className="copy-link__text">Copied</p>}
              </div>
              <div className="start-game__button-block">
                <Button type="button" onClick={handleSubmit(onSubmit)}>
                  Start Game
                </Button>
                <Button
                  type="button"
                  onClick={cancelGame}
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
                onClick={() => exitGame(dispatch)}
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
              <div className="settings__block-wrapper">
                <GameSettings
                  onRegister={register}
                  onWatch={watch}
                  errors={errors}
                />
                <div className="settings__block__buttons">
                  <Button
                    type="button"
                    onClick={handleSubmit(saveSettings)}
                    classes="button-start"
                  >
                    Save settings
                  </Button>
                  <Button
                    type="button"
                    onClick={() => loadSettings(dispatch)}
                    classes="button-cancel"
                  >
                    Load settings
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isMaster && <GameCards onRegister={register} errors={errors} />}
        </form>
      </div>
      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
