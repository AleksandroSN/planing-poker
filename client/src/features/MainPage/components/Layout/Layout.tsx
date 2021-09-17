import { FunctionComponent, useState } from "react";
import planningPocker from "../../../../assets/images/planning-pocker.png";
import { Button, Modal } from "../../../../components";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    console.log("connect");
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="main-page__logo">
          <img src={planningPocker} alt="planning pocker" />
        </div>
        <div className="main-page__content">
          <h2>Start your planning:</h2>
          <div className="new-session">
            Create session:
            <Button
              // text="Start New Game"
              onClick={() => setIsOpen(true)}
              type="button"
              classes="button-start"
            >
              New Game
            </Button>
          </div>
          <div className="connect-game">
            <h2>OR</h2>
            <label htmlFor="connectGame">
              Connect to lobby by <span>URL</span>:
              <div className="connect-game__input">
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
            </label>
          </div>
        </div>
      </div>
      <div>
        <Modal open={isOpen} heading="Connect to lobby">
          <p>Test</p>
        </Modal>
      </div>
    </>
  );
};
