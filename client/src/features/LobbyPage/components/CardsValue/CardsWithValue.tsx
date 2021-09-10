import { FunctionComponent, useState } from "react";

interface CardsWithValueProps {
  value: string;
  scoreTypeShort: string;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  scoreTypeShort,
}): JSX.Element => {
  const [state, setState] = useState<boolean>(true);

  const toggleState = (): void => {
    setState((x) => !x);
  };
  return (
    <div className="game-cards__cards-value-item">
      <div className="game-cards__cards-value-item__header text-s">
        <input
          type="text"
          name="cardValue"
          id="cardValue"
          className="game-cards__cards-value-item__header-input"
          value={value}
          disabled={state}
        />
        <img
          src="./img/edit.svg"
          alt="edit card icon"
          className="game-cards__cards-value-item__header-icon"
          role="none"
          onClick={toggleState}
        />
      </div>
      <div className="game-cards__cards-value-item__body text-xxl text-bold">
        {scoreTypeShort}
      </div>
      <div className="game-cards__cards-value-item__footer text-s">{value}</div>
    </div>
  );
};
