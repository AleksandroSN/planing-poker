import { FunctionComponent } from "react";
import { ChatMessage } from "../../../features/Socket/types";
import { isReallyYou } from "../../../lib";
import { User } from "../../User/User";

export const ChatRow: FunctionComponent<ChatMessage> = ({
  messageText,
  id,
  playerData,
}): JSX.Element => {
  const isYou = isReallyYou(playerData.firstName);

  return (
    <div className="chat__row">
      <p className="chat__user-message test-light text-s">{messageText}</p>
      <User
        key={id}
        avatar={playerData.avatarImage}
        firstName={playerData.firstName}
        lastName={playerData.lastName}
        jobPosition={playerData.jobPosition}
        isYou={isYou}
        isChat
      />
    </div>
  );
};
