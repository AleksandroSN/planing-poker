import { FunctionComponent } from "react";
import { Cards } from "../AddCardSection/Cards";
import { CardsWithStatsProps } from "./types";
import "./style.scss";

const mockFunc = () => {};

export const CardsWithStats: FunctionComponent<CardsWithStatsProps> = ({
  value,
  scoreTypeShort,
  stats,
}): JSX.Element => {
  return (
    <div className="game-cards__stats-container">
      <Cards
        value={value}
        scoreTypeShort={scoreTypeShort}
        // updateCards={mockFunc}
      />
      <p className="game-cards__stats-percents">{`${stats} %`}</p>
    </div>
  );
};
