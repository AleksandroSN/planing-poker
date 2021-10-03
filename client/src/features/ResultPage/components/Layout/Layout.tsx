import { FunctionComponent, useEffect, useState } from "react";
import "./style.scss";
import { useAppSelector, AppSettings, Players } from "../../../../redux/store";
import { Player } from "../../../Socket/types";
import { Chat } from "../../../../components";
import { Issue } from "../../../../components/Issues/IssueItem/Issue";
import { AnimeChatMount } from "../../../../lib";

export const Layout: FunctionComponent = (): JSX.Element => {
  const { chatOpen } = useAppSelector(AppSettings);
  const playersFromRedux = useAppSelector(Players);
  const dealer = playersFromRedux.filter(
    (player) => player.role === "Dealer"
  )[0];
  const [isMaster, setIsMaster] = useState<boolean>(false);

  useEffect(() => {
    const localPlayer = sessionStorage.getItem("player");
    if (localPlayer) {
      const player = JSON.parse(localPlayer) as Player;
      const reallyMaster = player.role === "Dealer";
      setIsMaster(reallyMaster);
    }
  }, []);

  return (
    <>
      <div className="content__wrapper">
        <div>
          <h2 className="lobby-page__title text-xl">Issue</h2>
          <Issue id="" link="link" title="Issue" priority="Hight" />
          <div className="round-result__wrapper">Results</div>
        </div>
      </div>
      <AnimeChatMount mount={chatOpen} classes="chat-wrapper">
        <Chat key="uniqChat" />
      </AnimeChatMount>
    </>
  );
};
