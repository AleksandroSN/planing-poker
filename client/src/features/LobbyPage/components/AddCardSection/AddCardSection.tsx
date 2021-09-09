import React, { FunctionComponent } from "react";
import { CardsWithValue } from "../CardsValue/CardsWithValue";
import "./style.scss";

// interface AddCardSectionProps {
//     message?: string;
// }

// TO-DO add create card component. onClick create card component add value in input, then this card go in state.
// TO-DO if we click on exist card, we can modify this card value

export const AddCardSection: FunctionComponent = (): JSX.Element => {
  return (
    <div className="game-cards__container">
      <div className="game-cards__cards-value">
        <h2 className="game-cards__cards-value-title text-24">
          Add card values
        </h2>
        <div className="game-cards__cards-value__container">
          <CardsWithValue ScoreTypeShort="SP" value="12" />
          <CardsWithValue ScoreTypeShort="SP" value="1" />
          <CardsWithValue ScoreTypeShort="SP" value="3" />
          <CardsWithValue ScoreTypeShort="SP" value="14" />
        </div>
      </div>
    </div>
  );
};
