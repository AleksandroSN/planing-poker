import React, { FunctionComponent, useState } from "react";
import "./style.scss";

interface LayoutProps {
  message?: string;
}

export const Layout: FunctionComponent<LayoutProps> = (): JSX.Element => {
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
            <label htmlFor="newGame">
              Create session:
              <Button
                text="Start New Game"
                onClick={() => setIsOpen(true)}
                classes="button-start"
              />
            </label>
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
                  text="Connect"
                  onClick={handleConnect}
                  classes="button-start"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Connect to lobby
        </Modal>
      </div>
    </>
  );
};
