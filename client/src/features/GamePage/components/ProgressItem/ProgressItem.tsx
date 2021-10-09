import { FunctionComponent } from "react";
import { User } from "../../../../components/User/User";
import { UserAnonymous } from "../../../../components/UserAnonymous/UserAnonymous";
import { isReallyYou } from "../../../../lib/isReallyYou";
import { Player } from "../../../Socket/types";
import "./progress.scss";

interface ProgressItemProps {
  gameStatus: string;
  playerData: Player;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
  gameStatus,
  playerData,
}) => {
  if (playerData === undefined) {
    return (
      <div className="progress-item__wrapper">
        <p className="progress-item">{gameStatus}</p>
        <UserAnonymous id="id" />
      </div>
    );
  }

  const isYou = isReallyYou(playerData.id);
  return (
    <div className="progress-item__wrapper">
      <p className="progress-item">{gameStatus}</p>
      <User
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
