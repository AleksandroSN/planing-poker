import { FunctionComponent, useEffect, useState } from "react";
import { ChatMessage, Player } from "../../../features/Socket/types";
import { User } from "../../User/User";

export const ChatRow: FunctionComponent<ChatMessage> = ({
  messageText,
  id,
  playerData,
}): JSX.Element => {
  const [isYou, setIsYou] = useState<boolean>(false);

  useEffect(() => {
    const localPlayer = sessionStorage.getItem("player");
    if (localPlayer) {
      const player = JSON.parse(localPlayer) as Player;
      const isRealyYou = playerData.firstName === player.firstName;
      setIsYou(isRealyYou);
    }
  });

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
