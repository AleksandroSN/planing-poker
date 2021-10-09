import { FunctionComponent } from "react";
import { useAppSelector, AppSettings } from "../../../../redux/store";
import { Chat, LobbyGameTitle } from "../../../../components";
import { AnimeChatMount } from "../../../../lib";
import { GameResult } from "../GameResult";
import "./style.scss";
import { DownloadResultBtn } from "../DonwloadResultBtn";

export const Layout: FunctionComponent = (): JSX.Element => {
  const { chatOpen } = useAppSelector(AppSettings);

  return (
    <>
      <div className="content__wrapper">
        <div className="round-result">
          <LobbyGameTitle classNames="lobby-page__title" /* fix classname */ />
          <div className="round-result__wrapper">
            <GameResult />
            <DownloadResultBtn />
          </div>
        </div>
      </div>
      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
