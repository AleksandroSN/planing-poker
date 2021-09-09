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
      <div className="game-cards__cards-value-item__header">{value}</div>
      <div className="game-cards__cards-value-item__body">{ScoreTypeShort}</div>
      <div className="game-cards__cards-value-item__footer">{value}</div>
    </div>
  );
};
