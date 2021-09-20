import { FC } from "react";
import "./Header.scss";
// import {logo} from "../../../public/img/logo.png";

export const Header: FC = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="../../../public/img/logo.png" alt="logo" />
      </div>
      <div className="chat-button">
        <button type="button">
          <img src="../../../public/icons/chat-icon.png" alt="chat" />
        </button>
      </div>
    </div>
  );
};
