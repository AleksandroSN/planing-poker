import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { GameSettings, Issues } from "..";
import { InputText } from "../../../../components";
import { User } from "../../../../components/User/User";
import { FormValues } from "../../../../types/interface";
import { AddCardSection } from "../AddCardSection";
import { CoverSection } from "../CoverSection";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    console.log("connect");
  };

  const { register } = useForm<FormValues>();

  return (
    <>
      <div className="content-wrapper">
        <form className="lobby-page-wrapper">
          <div>
            <h1 className="lobby-page__title text-xl">Issue</h1>
          </div>
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
          <div className="">
            <form className="start-game__form">
              {/* <InputText defaultValue="link" /> */}
            </form>
            <form className="start-game__form">
              {/* <InputText defaultValue="link" /> */}
            </form>
          </div>
          <div className="members__block">
            <h2 className="members__title text-xl">Members:</h2>
            <User
              avatar="RP"
              firstName="Sa"
              lastName="Nterna"
              jobPosition="developer"
              isChat
              isYou={false}
            />
          </div>
          <div className="issues__block">
            <Issues />
          </div>
          <div className="settings__block">
            <h2 className="settings__block__title text-xl">Game Settings:</h2>
            <GameSettings register={register} />
          </div>
          <div className="">
            <CoverSection />
          </div>
          <div className="card-values__block">
            <AddCardSection />
          </div>
        </form>
      </div>
    </>
  );
};
