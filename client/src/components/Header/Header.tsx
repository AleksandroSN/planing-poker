import { FC } from "react";
import "./Header.scss";

export const Header: FC = (): JSX.Element => {
  const isLoggedIn = false;
  return (
    <div className="header">
      <div className="header-logo">
        <img src="./img/logo.png" alt="logo" />
      </div>
      {!isLoggedIn && (
        <div className="chat-button">
          <button type="button">
            <img src="./icons/chat-icon.png" alt="chat" />
          </button>
        </div>
      )}
    </div>
  );
};