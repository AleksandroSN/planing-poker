import { FunctionComponent } from "react";
import { CardsCover } from "../CardsCover/CardsCover";
import { CardsWithValue } from "../CardsValue/CardsWithValue";
import "./gameCards.scss";

// interface Props {

// }

export const GameCards: FunctionComponent = () => {
  return (
    <section className="game-cards">
      <h2 className="game-cards__title text-xl">Game Cards</h2>
      <div className="game-cards__container">
        <div className="game-cards__cover">
          <h2 className="game-cards__cover-title text-24">Select cover:</h2>
          <div className="game-cards__cover-container">
            <CardsCover imgNumber={1} />
            <CardsCover imgNumber={2} />
            <CardsCover imgNumber={3} />
          </div>
        </div>
      </div>
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
    </section>
  );
};
