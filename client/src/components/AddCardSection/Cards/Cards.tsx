import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CardsAddValue,
  CardsWithoutValue,
  CardsWithValue,
} from "../CardsValue";
import { CardsValueModel } from "../types";
import { valueData } from "./cardsValueHelper";
import "./style.scss";
import { CardsDataModel } from "./types";
import { GameSettingsActions } from "../../../redux/GameSettingsReducer/actions";

interface CardsProps {
  value: string;
  scoreTypeShort: string;
  updateCards: (newData: CardsValueModel) => void;
}

export const Cards: FunctionComponent<CardsProps> = ({
  value,
  scoreTypeShort,
  updateCards,
}): JSX.Element => {
  const dispatch = useDispatch();
  // const [editMode, setEditMode] = useState<boolean>(false);

  const [renderData, setRenderData] = useState<CardsDataModel[]>(valueData);
  const addInState = (str: string, idx: number): void => {
    dispatch({
      type: GameSettingsActions.updateSetiings,
      payload: { cardsCover: str },
    });
    const updatedData = renderData.map((data) => {
      if (data.idx === idx) {
        return {
          ...data,
          selected: true,
          disabled: null,
        };
      }
      return {
        ...data,
        selected: null,
        disabled: true,
      };
    });
    setRenderData(updatedData);
  };

  const cards = renderData.map(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ idx, value, selected, disabled /* scoreTypeShort */ }) => {
      return (
        <CardsWithValue
          key={idx}
          value={value}
          selected={selected}
          disabled={disabled}
          scoreTypeShort={scoreTypeShort}
        />
      );
    }
  );

  /* const toggleEditMode = (): void => {
    setEditMode((x) => !x);
  };

  if (editMode) {
    return (
      <CardsAddValue
        toggleEditMode={toggleEditMode}
        updateCards={updateCards}
      />
    );
  }
 */
  /* if (!value) {
    return <CardsWithoutValue toggleEditMode={toggleEditMode} />;
  } */

  /* return (
    <CardsWithValue
      value={value}
      scoreTypeShort={scoreTypeShort}
      updateCards={updateCards}
    />
  ); */

  return <div className="game-cards__container">{cards}</div>;
};
