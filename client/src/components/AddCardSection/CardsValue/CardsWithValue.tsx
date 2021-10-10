import { FunctionComponent, useEffect, useState } from "react";
import { CardsValueModel } from "../types";
import { searchEnterKey } from "./cardsWithValueHelper";

interface CardsWithValueProps {
  value: string;
  scoreTypeShort: string;
  /* updateCards: (newData: CardsValueModel) => void; */
  onClick: (value: string) => void;
  selected: boolean | undefined;
  disabled: boolean | undefined;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  scoreTypeShort,
  onClick,
  disabled,
  selected,
  /* updateCards, */
}): JSX.Element => {
  // const [editMode, setEditMode] = useState<boolean>(false);
  const [cardValue, setCardValue] = useState<string>("");

  useEffect(() => {
    setCardValue(value);
    return () => {};
  }, [value]);

  const toggleClass = () => {
    if (selected === true) {
      return "game-cards__cards-value-item selected";
    }
    if (disabled === true) {
      return "game-cards__cards-value-item disabled";
    }
    return "game-cards__cards-value-item";
  };

  const handleClick = () => {
    onClick(value);
  };

  /* const toggleState = (): void => {
    setEditMode(false);
    updateCards({
      value: cardValue,
    });
  }; */

  return (
    <div className={toggleClass()} onClick={handleClick} role="none">
      <div className="game-cards__cards-value-item__header text-s">
        <p className="game-cards__cards-value-item__header-text">{cardValue}</p>
      </div>
      <div className="game-cards__cards-value-item__body text-xml text-bold">
        {scoreTypeShort}
      </div>
      <p className="game-cards__cards-value-item__footer text-s">{cardValue}</p>
    </div>
  );
};
