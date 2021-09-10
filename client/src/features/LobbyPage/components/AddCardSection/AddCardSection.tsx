import { FunctionComponent } from "react";
import { CardsWithValue } from "../CardsValue";
import { arrCardsWithValue } from "./addCardSectionhelper";
import "./style.scss";

// interface AddCardSectionProps {
//     message?: string;
// }

// TO-DO add create card component. onClick create card component add value in input, then this card go in state.
// TO-DO if we click on exist card, we can modify this card value

export const AddCardSection: FunctionComponent = (): JSX.Element => {
  const dataForRender = arrCardsWithValue.map(({ value, scoreTypeShort }) => {
    return (
      <CardsWithValue
        key={value}
        value={value}
        scoreTypeShort={scoreTypeShort}
      />
    );
  });
  return (
    <div className="game-cards__container">
      <div className="game-cards__cards-value">
        <h2 className="game-cards__cards-value-title text-24">
          Add card values
        </h2>
        <div className="game-cards__cards-value__container">
          {dataForRender}
        </div>
      </div>
    </div>
  );
};
