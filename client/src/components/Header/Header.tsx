import { FC } from "react";
import "./Header.scss";

export const Header: FC = (): JSX.Element => {
  const isLoggedIn = false;
  return (
    <header className="App-header">
      <div className="App-header__logo">
        <a className="App-header__logo-lik" href="/">
          <img
            className="App-header__logo-img"
            src="../img/logo.png"
            alt="logo"
          />
        </a>
      </div>
      {isLoggedIn && (
        <div className="App-header__chat-button">
          <button type="button">
            <img src="../icons/chat-icon.png" alt="chat" />
          </button>
        </div>
      )}
    </header>
  );
};
