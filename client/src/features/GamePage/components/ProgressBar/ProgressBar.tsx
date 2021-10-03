import { FunctionComponent } from "react";
import { ProgressItem } from "../ProgressItem";
import { Players, useAppSelector } from "../../../../redux/store";
import { User } from "../../../../components/User/User";
import "./style.scss";

export const ProgressBar: FunctionComponent = () => {
  const playersFromRedux = useAppSelector(Players);
  const players = playersFromRedux
    .filter((player) => {
      return player.role !== "Dealer";
    })
    .map((filterPlayers) => {
      return (
        <User
          avatar={filterPlayers.avatarImage}
          firstName={filterPlayers.firstName}
          lastName={filterPlayers.lastName}
          jobPosition={filterPlayers.jobPosition}
          isChat={false}
          isYou={false}
        />
      );
    });

  return (
    <aside className="progress-bar">
      <div className="progress-bar__score">
        <h2>Score</h2>
        <ProgressItem />
      </div>
      <div className="progress-bar__palyers">
        <h2>Players</h2>
        {players}
      </div>
    </aside>
  );
};
