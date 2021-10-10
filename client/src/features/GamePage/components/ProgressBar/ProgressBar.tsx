import { FunctionComponent } from "react";
import { ProgressItem } from "../ProgressItem";
import {
  GameSettingsCurrent,
  Players,
  useAppSelector,
} from "../../../../redux/store";
import "./style.scss";

export const ProgressBar: FunctionComponent = () => {
  const playersFromRedux = useAppSelector(Players);
  const { masterIsPlayer } = useAppSelector(GameSettingsCurrent);
  const players = masterIsPlayer
    ? playersFromRedux
        .filter((player) => {
          return player.role !== "Dealer";
        })
        .map((filterPlayer) => {
          return <ProgressItem player={filterPlayer} />;
        })
    : playersFromRedux.map((gamePlayer) => {
        return <ProgressItem player={gamePlayer} />;
      });

  return (
    <aside className="progress-bar">
      <div className="progress-bar__score">
        {players}
        {/* </div>
      <div className="progress-bar__palyers">
        <h2>Players</h2>
        {players} */}
      </div>
    </aside>
  );
};
