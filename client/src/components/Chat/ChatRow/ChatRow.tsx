import { FunctionComponent } from "react";
import { User } from "../../User/User";

interface ChatRowProps {
  message: string;
}

const test = true;

export const ChatRow: FunctionComponent<ChatRowProps> = ({ message }) => {
  return (
    <div className="chat__row">
      <p className="chat__user-message test-light text-s">{message}</p>
      <User
        avatar="SA"
        firstName="Semyon"
        lastName="Aleks"
        jobPosition="Junior front"
        isYou={test}
        isChat={test}
      />
    </div>
  );
};
