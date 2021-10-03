import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { GameSettingsCurrent, useAppSelector } from "../../../../redux/store";
import { Button, ErrorWindow, Modal } from "../../../../components";
import { MainPageContext } from "../../lib";
import { MainPageLocationProps } from "./types";
import { MainPageForm } from "../Form";
import "./style.scss";
import { findID } from "../../../../lib";

export const Layout: FunctionComponent = (): JSX.Element => {
  const lobbyId = useAppSelector(GameSettingsCurrent);
  const { state } = useLocation<MainPageLocationProps>();
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (state) {
      setLink(state.idGame);
    }
  }, [state]);

  const {
    MainPageState,
    setMasterRole,
    validateLobby,
    toggleModal,
    toggleErrorModal,
  } = useContext(MainPageContext);

  if (MainPageState.isAuth) {
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
                onChange={(ev) => setLink(ev.target.value)}
              />
              <Button
                onClick={() => validateLobby(findID(link))}
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
        <Modal
          idForm="main-form"
          open={MainPageState.openModal}
          heading="Connect to lobby"
          onCancel={toggleModal}
          buttonTextConfirm="Confirm"
          buttonTextCancel="Cancel"
        >
          <MainPageForm />
        </Modal>
        <Modal
          open={MainPageState.openModalError}
          heading="LOBBY INVALID"
          onCancel={toggleErrorModal}
          buttonTextCancel="Close"
          buttonTextConfirm="Close"
        >
          <ErrorWindow message="Please enter an existing room id" />
        </Modal>
      </div>
    </>
  );
};
