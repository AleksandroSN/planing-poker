import { FunctionComponent, useEffect, useState } from "react";
import { a, useSpring } from "react-spring";
import { gameSettingsReducer } from "../../../redux/GameSettingsReducer";
import {
  AppSettings,
  GameSettingsCurrent,
  useAppSelector,
} from "../../../redux/store";
import { CardsValueModel } from "../types";
import { searchEnterKey } from "./cardsWithValueHelper";

interface CardsWithValueProps {
  value: string;
  scoreTypeShort: string;
  /* updateCards: (newData: CardsValueModel) => void; */
  onClick: (value: string) => void;
  selected: boolean | undefined;
  disabled: boolean | undefined;
}

export const CardsWithValue: FunctionComponent<CardsWithValueProps> = ({
  value,
  scoreTypeShort,
  onClick,
  disabled,
  selected,
  /* updateCards, */
}): JSX.Element => {
  // const [editMode, setEditMode] = useState<boolean>(false);
  const [cardValue, setCardValue] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { cardsCover } = useAppSelector(GameSettingsCurrent);
  const { roundControl } = useAppSelector(AppSettings);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    setCardValue(value);
    return () => {};
  }, [value]);

  useEffect(() => {
    if (roundControl.status === "isRun") {
      setIsFlipped(true);
    }
  }, [roundControl]);

  const toggleClass = () => {
    if (selected === true) {
      return "game-cards__cards-value-item selected";
    }
    if (disabled === true) {
      return "game-cards__cards-value-item disabled";
    }
    return "game-cards__cards-value-item";
  };

  const handleClick = () => {
    onClick(value);
  };

  /* const toggleState = (): void => {
    setEditMode(false);
    updateCards({
      value: cardValue,
    });
  }; */

  return (
    <>
      {roundControl.status === "default" && (
        <a.div
          className="game-cards__cover-item"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <img src={`.${cardsCover}`} alt="card cover" />
        </a.div>
      )}
      {roundControl.status === "isRun" && (
        <a.div
          className={toggleClass()}
          onClick={handleClick}
          role="none"
          style={{
            opacity,
            transform,
            rotateY: "180deg",
          }}
        >
          <div className="game-cards__cards-value-item__header text-s">
            <p className="game-cards__cards-value-item__header-text">
              {cardValue}
            </p>
          </div>
          <div className="game-cards__cards-value-item__body text-xml text-bold">
            {scoreTypeShort}
          </div>
          <p className="game-cards__cards-value-item__footer text-s">
            {cardValue}
          </p>
        </a.div>
      )}
    </>
  );
};
