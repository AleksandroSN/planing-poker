import { FunctionComponent, useEffect, useState } from "react";
import { Cards } from "../../../../components/AddCardSection/Cards";
import { cardsSets } from "../../../../lib";
import { ICardsSets, IValue } from "../../../../lib/cardsSets";
import {
  useAppSelector,
  GameSettingsCurrent,
  IssuesRedux,
} from "../../../../redux/store";
import { sendIssueVote } from "../../../Socket/lib/game/methods";
import { Player } from "../../../Socket/types";
import { GameCardsProps } from "./types";

const isStart = true; // change to redux variable
const mockState: ICardsSets = {
  category: "",
  value: [],
};

export const GameCards: FunctionComponent<GameCardsProps> = ({
  role,
}): JSX.Element => {
  const [cardsDeck, setCardsDeck] = useState<IValue[]>(mockState.value);
  const { cardValues, masterIsPlayer } = useAppSelector(GameSettingsCurrent);
  const { issues } = useAppSelector(IssuesRedux);
  const localPlayer = JSON.parse(
    sessionStorage.getItem("player") as string
  ) as Player;
  const index = issues.findIndex((issue) => issue.issueStatus === "voting");
  const currentIssue = issues[index];
  const handleClick = (value: string): void => {
    const updatedData = cardsDeck.map((data) => {
      if (data.cardValue === value) {
        return {
          ...data,
          selected: true,
          disabled: false,
        };
      }

      return {
        ...data,
        selected: false,
        disabled: true,
      };
    });
    setCardsDeck(updatedData);
    sendIssueVote(localPlayer, currentIssue, value);
  };

  const gameCards = cardsDeck.map((value) => {
    const { cardValue } = value;
    return (
      <Cards
        key={cardValue}
        value={cardValue}
        scoreTypeShort="SP"
        disabled={value.disabled}
        selected={value.selected}
        onClick={handleClick}
      />
    );
  });
  // const [renderData, setRenderData] = useState<CardsDataModel[]>([]);

  /* const cards = renderData.map(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ idx, value, selected, disabled, scoreTypeShort }) => {
      return (
        <CardsWithValue
          key={idx}
          value={value}
          selected={selected}
          disabled={disabled}
          scoreTypeShort={scoreTypeShort}
          onClick
        />
      );
    }
  ); */

  useEffect(() => {
    const deck = cardsSets.filter((set) => set.category === cardValues)[0];
    if (deck) {
      setCardsDeck(deck.value);
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
