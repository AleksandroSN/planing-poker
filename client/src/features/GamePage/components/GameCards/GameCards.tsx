import { FunctionComponent, useEffect, useState } from "react";
import { Cards } from "../../../../components/AddCardSection/Cards";
import { cardsSets } from "../../../../lib";
import { useAppSelector, GameSettingsCurrent } from "../../../../redux/store";
import { GameCardsProps } from "./types";

const updateCards = () => {
  console.log("Update");
};

const isStart = true; // change to redux variable

export const GameCards: FunctionComponent<GameCardsProps> = ({
  role,
}): JSX.Element => {
  const [cardsDeck, setCardsDeck] = useState<string[]>([]);
  const { cardValues, masterIsPlayer } = useAppSelector(GameSettingsCurrent);
  const gameCards = cardsDeck.map((value) => {
    return (
      <Cards
        key={value}
        value={value}
        scoreTypeShort="SP"
        updateCards={updateCards}
      />
    );
  });

  useEffect(() => {
    const deck = cardsSets.filter((set) => set.category === cardValues)[0];
    if (deck) {
      setCardsDeck(deck.values);
    }
  }, [cardValues]);

  if (role !== "Dealer") {
    return (
      <>{isStart && <div className="game-page__cards">{gameCards}</div>}</>
    );
  }

  return (
    <>
      {masterIsPlayer && isStart && (
        <div className="game-page__cards">{gameCards}</div>
      )}
    </>
  );
};
