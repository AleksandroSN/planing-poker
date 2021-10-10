import { FunctionComponent, useEffect, useState } from "react";
import { CardsValueModel } from "../types";
import { searchEnterKey } from "./cardsWithValueHelper";

interface CardsWithValueProps {
  value: string;
  scoreTypeShort: string;
  updateCards: (newData: CardsValueModel) => void;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  scoreTypeShort,
  updateCards,
}): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cardValue, setCardValue] = useState<string>("");

  useEffect(() => {
    setCardValue(value);
    return () => {};
  }, [value]);

  const toggleState = (): void => {
    setEditMode(false);
    updateCards({
      value: cardValue,
    });
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
          src="../icons/edit.svg"
          alt="edit card icon"
          className="game-cards__cards-value-item__header-icon"
          role="none"
          onClick={() => setEditMode(true)}
        />
      </div>
      <div className="game-cards__cards-value-item__body text-xml text-bold">
        {scoreTypeShort}
      </div>
      <p className="game-cards__cards-value-item__footer text-s">{cardValue}</p>
    </div>
  );
};
