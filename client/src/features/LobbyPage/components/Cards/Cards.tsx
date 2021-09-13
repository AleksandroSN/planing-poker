import { FunctionComponent, useState } from "react";
import { CardsValueModel } from "../../types/interface";
import {
  CardsAddValue,
  CardsWithoutValue,
  CardsWithValue,
} from "../CardsValue";
import "./style.scss";

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
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = (): void => {
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

  if (!value) {
    return <CardsWithoutValue toggleEditMode={toggleEditMode} />;
  }

  return (
    <CardsWithValue
      value={value}
      scoreTypeShort={scoreTypeShort}
      updateCards={updateCards}
    />
  );
};
