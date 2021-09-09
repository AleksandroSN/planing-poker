import { FunctionComponent } from "react";

interface CardsWithValueProps {
  value: string;
  ScoreTypeShort: string;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  ScoreTypeShort,
}): JSX.Element => {
  return (
    <div className="game-cards__cards-value-item">
      <div className="game-cards__cards-value-item__header text-s">{value}</div>
      <div className="game-cards__cards-value-item__body text-xxl text-bold">
        {ScoreTypeShort}
      </div>
      <div className="game-cards__cards-value-item__footer text-s">{value}</div>
    </div>
  );
};
