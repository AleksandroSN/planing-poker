import { FunctionComponent } from "react";
import { User } from "../../../../components/User/User";
import { UserAnonymous } from "../../../../components/UserAnonymous/UserAnonymous";
import { isReallyYou } from "../../../../lib/isReallyYou";
import { ResultRedux, useAppSelector } from "../../../../redux/store";
import { Player } from "../../../Socket/types";
import "./progress.scss";

interface ProgressItemProps {
  player: Player;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
  player,
}) => {
  // const gameStatus = useAppSelector(ResultRedux);
  // const playerStatus = gameStatus.
  return (
    <div className="progress-item__wrapper">
      <h2>Score</h2>
      <p className="progress-item">In progress</p>
      <h2>Player</h2>
      <User
        key={player.id}
        avatar={player.avatarImage}
        firstName={player.firstName}
        lastName={player.lastName}
        jobPosition={player.jobPosition}
        isChat
        player={player}
        isYou={false}
      />
    </div>
  );
};
