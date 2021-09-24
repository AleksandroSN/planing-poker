import { FunctionComponent, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Button, Modal } from "../../../../components";
import { MainPageForm } from "../Form";
import { MainPageLocationProps } from "./types";
import "./style.scss";
import { GameSettingsState, useAppSelector } from "../../../../redux/store";

export const Layout: FunctionComponent = (): JSX.Element => {
  const lobbyId = useAppSelector(GameSettingsState);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { state } = useLocation<MainPageLocationProps>();

  const toggleState = () => {
    setIsOpen((x) => !x);
  };

  const setMasterRole = () => {
    setRole("Dealer");
    toggleState();
  };

  const setMemberRole = () => {
    setRole("Member");
    toggleState();
  };

  const toggleAuth = () => {
    setIsAuth((x) => !x);
  };

  if (isAuth) {
    return <Redirect to={`lobby/${lobbyId.lobbyId}`} />;
  }

  return (
    <>
      <main className="content__wrapper">
        <div className="main-page__logo">
          <img src="../img/planning-pocker.png" alt="planning pocker" />
        </div>
        <div className="main-page__content">
          <h2 className="main-page__title">Start your planning:</h2>
          <div className="main-page__new-session">
            Create session:
            <Button
              onClick={setMasterRole}
              type="button"
              classes="button-start"
            >
              Start New Game
            </Button>
          </div>
          <div className="main-page__connect-game">
            <p className="main-page__connect-game__choose">OR :</p>
            <p className="main-page__connect-game__title">
              Connect to lobby by <span>URL</span> :
            </p>
            <div className="main-page__connect-game__input">
              <input
                type="text"
                defaultValue={state ? `/lobby/${state.idGame}` : `/lobby/`}
              />
              <Button
                onClick={setMemberRole}
                type="button"
                classes="button-start"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </main>
      <div>
        <Modal open={isOpen} heading="Connect to lobby">
          <MainPageForm
            toggleState={toggleState}
            role={role}
            toggleAuth={toggleAuth}
          />
        </Modal>
      </div>
    </>
  );
};
