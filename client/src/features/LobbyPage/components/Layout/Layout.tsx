import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GameSettings, Issues } from "..";
import { Button, InputText } from "../../../../components";
import { User } from "../../../../components/User/User";
import { FormValues } from "../../../../types/interface";
import { AddCardSection } from "../AddCardSection";
import { CoverSection } from "../CoverSection";
import "./style.scss";

// TODO add chat
export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaster, setIsMaster] = useState(true);
  const location = useLocation();

  const handleConnect = () => {
    console.log("connect");
  };

  const { register } = useForm<FormValues>();

  return (
    <>
      <div className="content__wrapper">
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
          {isMaster && (
            <div className="start-game__block">
              <div className="link__block">
                <InputText
                  defaultValue={`${window.location.href}`}
                  register={register}
                  labelText="Link:"
                  inputClasses="lobby-page-link__input"
                  labelClasses="lobby-link__label"
                />
                <Button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.href}/aasss`
                    )
                  }
                  classes="copy-link__button"
                >
                  Copy
                </Button>
              </div>
              <div className="start-game__button-block">
                <Button
                  type="submit"
                  onClick={() => console.log("Redirect to game page")}
                >
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
            <User
              avatar="RP"
              firstName="Sa"
              lastName="Nterna"
              jobPosition="developer"
              isChat
              isYou={false}
            />
          </div>
          {isMaster && (
            <div className="issues__block">
              <Issues />
            </div>
          )}
          {isMaster && (
            <div className="settings__block">
              <h2 className="settings__block__title text-xl">Game Settings:</h2>
              <GameSettings register={register} />
            </div>
          )}
          {isMaster && (
            <div className="">
              <CoverSection />
            </div>
          )}
          {isMaster && (
            <div className="card-values__block">
              <AddCardSection />
            </div>
          )}
        </form>
      </div>
    </>
  );
};
