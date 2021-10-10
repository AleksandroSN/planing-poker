import { FunctionComponent } from "react";
import { UserAnonymous } from "../..";
import { ChatMessage } from "../../../features/Socket/types";
import { isReallyYou } from "../../../lib";
import { User } from "../../User";

export const ChatRow: FunctionComponent<ChatMessage> = ({
  messageText,
  id,
  playerData,
}): JSX.Element => {
  if (playerData === undefined) {
    return (
      <div className="chat__row">
        <p className="chat__user-message test-light text-s">{messageText}</p>
        <UserAnonymous id="id" />
      </div>
    );
  }

  const isYou = isReallyYou(playerData.id);
  return (
    <div className="chat__row">
      <p className="window chat__user-message test-light text-s">
        {messageText}
      </p>
      <User
        key={id}
        avatar={playerData.avatarImage}
        firstName={playerData.firstName}
        lastName={playerData.lastName}
        jobPosition={playerData.jobPosition}
        isYou={isYou}
        isChat
        player={playerData}
      />
    </div>
  );
};
