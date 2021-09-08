import { FunctionComponent } from "react";
import { User } from "../User/User";
import "./chat.scss";

interface ChatProps {
  message?: string;
}

const test = true;

export const Chat: FunctionComponent<ChatProps> = (): JSX.Element => {
  return (
    <div className="chat">
      <div className="chat__row">
        <p className="chat__user-message test-light text-s">Hello All !:)</p>
        <User
          avatar="SA"
          firstName="Semyon"
          lastName="Aleks"
          jobPosition="Junior front"
          isYou={test}
          isChat={test}
        />
      </div>
    </div>
  );
};
