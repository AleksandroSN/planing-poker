import { FunctionComponent, useState } from "react";
import { CardsValueModel } from "../../types/interface";
import { searchEnterKey } from "./cardsWithValueHelper";

interface CardsAddValueProps {
  toggleEditMode: () => void;
  updateCards: (newData: CardsValueModel) => void;
}

export const CardsAddValue: FunctionComponent<CardsAddValueProps> = ({
  toggleEditMode,
  updateCards,
}): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const newData = (): void => {
    toggleEditMode();
    updateCards({
      value,
    });
  };

  return (
    <div className="game-cards__cards-value-item" role="none">
      <div className="game-cards__cards-value-item__edit-wrapper">
        <p className="text-l">Enter the number</p>
        <input
          type="text"
          name="cardValue"
          id="cardValue"
          className="game-cards__cards-value-item__header-input create-mode text-xxl"
          maxLength={2}
          onChange={(evt) => setValue(evt.target.value)}
          onKeyDown={(evt) => searchEnterKey(evt, newData)}
        />
      </div>
    </div>
  );
};
