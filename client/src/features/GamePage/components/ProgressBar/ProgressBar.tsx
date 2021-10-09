import { FunctionComponent } from "react";
import { ProgressItem } from "../ProgressItem";
import { Players, useAppSelector } from "../../../../redux/store";
import { User } from "../../../../components/User";
import "./style.scss";

export const ProgressBar: FunctionComponent = () => {
  const playersFromRedux = useAppSelector(Players);
  const status = useAppSelector(GameData);
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
  const index = players.findIndex((itm) => itm.id === gameStatus.playerId);
  const playerData = players[index];

  return (
    <aside className="progress-bar">
      <div className="progress-bar__score">
        <h2>Score</h2>
        <ProgressItem gameStatus="In progress" playerData={players} />
        {/* </div>
      <div className="progress-bar__palyers">
        <h2>Players</h2>
        {players} */}
      </div>
    </aside>
  );
};
