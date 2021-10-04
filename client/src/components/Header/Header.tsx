import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  const { appStage } = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch();
  const toggleChatOpen = () => {
    dispatch({
      type: AppReducerActions.toggleChatState,
      payload: { chatOpen: !chatOpen },
    });
  };
  useEffect(() => {
    if (appStage !== "out") {
      setIsLogin((x) => !x);
    }
  }, [appStage]);

  return (
    <header className="App-header">
      <div className="App-header__logo">
        <a className="App-header__logo-lik" href="/">
          <img
            className="App-header__logo-img"
            src="../img/logo.png"
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
