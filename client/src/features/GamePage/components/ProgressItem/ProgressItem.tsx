import { FunctionComponent } from "react";
import { User } from "../../../../components/User/User";
import { isReallyYou } from "../../../../lib/isReallyYou";
import { Player } from "../../../Socket/types";
import "./progress.scss";

interface ProgressItemProps {
  player: Player;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
  player,
}) => {
  const isYou = isReallyYou(player.id);
  return (
    <div className="progress-item__wrapper">
      <p className="progress-item">In progress</p>
      <User
        key={player.id}
        avatar={player.avatarImage}
        firstName={player.firstName}
        lastName={player.lastName}
        jobPosition={player.jobPosition}
        isChat
        player={player}
        isYou={isYou}
      />
    </div>
  );
};
