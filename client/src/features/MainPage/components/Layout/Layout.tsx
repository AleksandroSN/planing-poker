import { FunctionComponent, useState } from "react";
import planningPocker from "../../../../assets/images/planning-pocker.png";
import { Button, Modal } from "../../../../components";
import { MainPageForm } from "../Form";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    console.log("connect");
  };

  return (
    <>
      <main className="content__wrapper">
        <div className="main-page__logo">
          <img src={planningPocker} alt="planning pocker" />
        </div>
        <div className="main-page__content">
          <h2 className="main-page__title">Start your planning:</h2>
          <div className="main-page__new-session">
            Create session:
            <Button
              onClick={() => setIsOpen(true)}
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
                value=" "
                onChange={() => console.log(`work`)}
              />
              <Button
                // text="Connect"
                onClick={handleConnect}
                type="button"
                classes="button-start"
              >
                Connect
              </Button>
            </div>
            {/* </p> */}
          </div>
        </div>
      </main>
      <div>
        <Modal open={isOpen} heading="Connect to lobby">
          <MainPageForm />
        </Modal>
      </div>
    </>
  );
};
