import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { GameSettingsActions } from "../../../../redux/GameSettingsReducer/actions";
import { GameSettingsCurrent, useAppSelector } from "../../../../redux/store";
import { CardsValueModel } from "../../types/interface";
import { Cards } from "../Cards";
import "./style.scss";

export const AddCardSection: FunctionComponent = (): JSX.Element => {
  const [cards, setCards] = useState<CardsValueModel[]>([]);
  const { scoreTypeShort, cardValues } = useAppSelector(GameSettingsCurrent);
  const dispatch = useDispatch();
  const updateCards = (newData: CardsValueModel): void => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { cardValues: [...cardValues, newData] },
    });
    setCards((old) => [...old, newData]);
  };

  const arrCardsWithValue = cards.map(({ value }) => {
    return (
      <Cards
        key={value}
        value={value}
        scoreTypeShort={scoreTypeShort}
        updateCards={updateCards}
      />
    );
  });

  const allItems = [
    ...arrCardsWithValue,
    <Cards value="" scoreTypeShort="" updateCards={updateCards} />,
  ];
  return (
    <div className="game-cards__container">
      <div className="game-cards__cards-value">
        <h2 className="game-cards__cards-value-title text-24">
          Add card values
        </h2>
        <div className="game-cards__cards-value__container">{allItems}</div>
      </div>
    </div>
  );
};
