import { FunctionComponent, useState } from "react";

interface CardsCoverProps {
  imgNumber: number;
  selected: boolean | null;
  addInState: (str: string, idx: number) => void;
}

export const CardsCover: FunctionComponent<CardsCoverProps> = ({
  imgNumber,
  selected,
  addInState,
}): JSX.Element => {
  // const [select, setSelect] = useState<boolean>(false);

  const handlerClick = () => {
    // setSelect((prev) => !prev);
    addInState(`./img/cover${imgNumber}.png`, imgNumber);
  };

  return (
    <div
      className={
        selected ? "game-cards__cover-item selected" : "game-cards__cover-item"
      }
      role="none"
      onClick={() => {
        handlerClick();
      }}
    >
      <img src={`./img/cover${imgNumber}.png`} alt="card cover" />
    </div>
  );
};
