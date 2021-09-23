import { FunctionComponent, useState } from "react";
import { GameSettings, Issues } from "..";
import { InputText } from "../../../../components";
import { User } from "../../../../components/User/User";
import { Issue } from "../IssueItem/Issue";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    console.log("connect");
  };

  return (
    <>
      <div className="content-wrapper">
        <form className="">
          <div className="lobby-page__title">
            <p>Issue</p>
          </div>
          <div className="member-card">
            <div className="member-card__title">Scrum master:</div>
            <User
              avatar="SA"
              firstName="Sa"
              lastName="Nterna"
              jobPosition="developer"
              isChat
              isYou
            />
          </div>
          <div>
            <Issues />
          </div>
          <form className="start-game__form">
            {/* <InputText defaultValue="link" /> */}
          </form>
          <form className="start-game__form">
            {/* <InputText defaultValue="link" /> */}
          </form>
        </form>
        <GameSettings />
        <form />
      </div>
    </>
  );
};
