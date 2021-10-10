import { settings } from "cluster";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { defaultLobbySettings } from "../../features/LobbyPage/lib";
import { updateSettings } from "../../features/Socket/lib/updateSettings";
import { AppReducerActions } from "../../redux/AppReducer/actions";
import {
  AppSettings,
  GameSettingsCurrent,
  useAppSelector,
} from "../../redux/store";
import { KickStartModal } from "../KickStartModal";
import { KickSuggestModal } from "../KickSuggestModal";
import "./Header.scss";

export const Header: FunctionComponent = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { chatOpen } = useAppSelector(AppSettings);
  const { appStage, lobbyId } = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch();
  const toggleChatOpen = () => {
    dispatch({
      type: AppReducerActions.toggleChatState,
      payload: { chatOpen: !chatOpen },
    });
  };
  useEffect(() => {
    if (appStage !== "out" && appStage !== "") {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [appStage]);

  const clearStorage = async () => {
    await updateSettings(defaultLobbySettings(lobbyId), dispatch);
    sessionStorage.clear();
  };

  return (
    <header className="App-header">
      <div className="App-header__logo">
        <a className="App-header__logo-lik" href="/" onClick={clearStorage}>
          <img
            className="App-header__logo-img"
            src="../icons/poker-planing-icon.png"
            alt="logo"
          />
        </a>
      </div>
      {isLogin && (
        <div className="App-header__chat-button">
          <button type="button" onClick={toggleChatOpen}>
            <img src="../icons/chat-icon.png" alt="chat" />
          </button>
        </div>
      )}
      <KickStartModal />
      <KickSuggestModal />
    </header>
  );
};
