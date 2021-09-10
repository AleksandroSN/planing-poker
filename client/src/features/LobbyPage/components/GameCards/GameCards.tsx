import { FunctionComponent } from "react";
import { AddCardSection } from "../AddCardSection";
import { CoverSection } from "../CoverSection";
import "./gameCards.scss";

export const GameCards: FunctionComponent = () => {
  return (
    <section className="game-cards">
      <h2 className="game-cards__title text-xl">Game Cards</h2>
      <CoverSection />
      <AddCardSection />
    </section>
  );
};