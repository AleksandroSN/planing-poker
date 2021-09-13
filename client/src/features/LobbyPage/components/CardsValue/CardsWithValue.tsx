import React, { FunctionComponent, useEffect, useState } from "react";
import { searchEnterKey } from "./cardsWithValueHelper";

interface CardsWithValueProps {
  value: string;
  scoreTypeShort: string;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  scoreTypeShort,
}): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cardValue, setCardValue] = useState<string>("");

  useEffect(() => {
    setCardValue(value);
    return () => {};
  }, [value]);

  const toggleState = (): void => {
    setEditMode((x) => !x);
  };

  return (
    <div className="game-cards__cards-value-item">
      <div className="game-cards__cards-value-item__header text-s">
        {editMode ? (
          <input
            type="text"
            name="cardValue"
            id="cardValue"
            className="game-cards__cards-value-item__header-input"
            maxLength={2}
            placeholder={cardValue}
            onChange={(evt) => setCardValue(evt.target.value)}
            onKeyDown={(evt) => searchEnterKey(evt, toggleState)}
          />
        ) : (
          <p className="game-cards__cards-value-item__header-text">
            {cardValue}
          </p>
        )}
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
      <p className="game-cards__cards-value-item__footer text-s">{cardValue}</p>
    </div>
  );
};
