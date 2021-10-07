import { FunctionComponent } from "react";
import { CoverSection } from "../../../../components";
import { SelectCardsSet } from "../SelectCardsSet/SelectCardsSet";
import { GameCardsProps } from "./types";
import "./gameCards.scss";

export const GameCards: FunctionComponent<GameCardsProps> = ({
  onRegister,
}) => {
  return (
    <section className="game-cards">
      <h2 className="game-cards__title text-xl">Game Cards</h2>
      <CoverSection />
      {/* <AddCardSection /> */}
      <SelectCardsSet onRegister={onRegister} />
    </section>
  );
};
