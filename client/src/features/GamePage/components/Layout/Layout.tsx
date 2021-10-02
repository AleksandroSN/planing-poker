import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Issues } from "../../../LobbyPage/components/Issues/Issues";
import { Button, Chat, Timer } from "../../../../components";
import { User } from "../../../../components/User/User";
import { FormValues } from "../../../../types/interface";
import "../GamePageView/style.scss";

// TODO add chat
export const Layout: FunctionComponent = (): JSX.Element => {
  const [isMaster, setIsMaster] = useState(true);
  const [isStart, setIsStart] = useState(false);

  const handleExit = () => {
    console.log("exit");
  };

  const { register } = useForm<FormValues>();

  return (
    <main>
      <div className="content__wrapper">
        <div>
          <h1 className="lobby-page__title text-xl">Issue</h1>
        </div>
        <section className="game-info__wrapper">
          <div className="master-card">
            <div className="master-card__title">Scrum master:</div>
            <User
              avatar="SA"
              firstName="Sa"
              lastName="Nterna"
              jobPosition="developer"
              isChat
              isYou
            />
          </div>
          <Button
            type="button"
            onClick={handleExit} // TODO add exit logic
            classes="button-cancel"
          >
            Exit
          </Button>
          <div className="game-issues__block">
            <Issues />
          </div>
          <div className="">
            <Timer isSettings={false} isTimer={false} register={register} />
            <Button
              type="submit"
              onClick={() => console.log("start game")} // TODO add start game logic
              classes="button-submit"
            >
              Run Round
            </Button>
          </div>
        </section>
      </div>
      <aside className="chat__wrapper">
        <Chat />
      </aside>
    </main>
  );
};
