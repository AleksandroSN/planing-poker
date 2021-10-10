import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { CardsWithValue } from "../CardsValue";
import { CardsValueModel } from "../types";
import "./style.scss";

interface CardsProps {
  value: string;
  scoreTypeShort: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
  updateCards?: (newData: CardsValueModel) => void;
}

export const Cards: FunctionComponent<CardsProps> = ({
  value,
  scoreTypeShort,
  updateCards,
  disabled,
  selected,
  onClick,
}): JSX.Element => {
  const dispatch = useDispatch();
  // const [editMode, setEditMode] = useState<boolean>(false);

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

  return (
    <CardsWithValue
      value={value}
      scoreTypeShort={scoreTypeShort}
      onClick={typeof onClick === "function" ? onClick : () => {}}
      disabled={disabled}
      selected={selected}
    />
  );
};
