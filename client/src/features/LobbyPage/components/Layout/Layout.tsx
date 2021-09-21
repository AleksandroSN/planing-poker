import { FunctionComponent, useState } from "react";
import { User } from "../../../../components/User/User";
import "./style.scss";

export const Layout: FunctionComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    console.log("connect");
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="lobby-page__title">
          <h1>Issue</h1>
        </div>
        <div className="member-card">
          <User
            avatar="SA"
            firstName="Sa"
            lastName="Nterna"
            jobPosition=""
            isChat
            isYou
          />
        </div>
        <form />
      </div>
    </>
  );
};
