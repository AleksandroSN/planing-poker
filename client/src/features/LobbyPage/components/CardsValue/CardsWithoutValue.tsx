import { FunctionComponent } from "react";

interface CardsWithoutValueProps {
  toggleEditMode: () => void;
}

export const CardsWithoutValue: FunctionComponent<CardsWithoutValueProps> = ({
  toggleEditMode,
}): JSX.Element => {
  return (
    <div
      className="game-cards__cards-value-item"
      onClick={toggleEditMode}
      role="none"
    >
      <img
        className="game-cards__cards-value-item__img"
        src="./img/cross.svg"
        alt="Add new card"
      />
    </div>
  );
};
