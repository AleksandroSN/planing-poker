import { FunctionComponent, useState } from "react";

interface CardsCoverProps {
  imgNumber: number;
}

export const CardsCover: FunctionComponent<CardsCoverProps> = ({
  imgNumber,
}): JSX.Element => {
  const [select, setSelect] = useState<boolean>(false);

  const toggleSelect = () => {
    setSelect((prev) => !prev);
  };

  return (
    <div
      className={
        select ? "game-cards__cover-item selected" : "game-cards__cover-item"
      }
      role="none"
      onClick={toggleSelect}
    >
      <img src={`./img/cover${imgNumber}.png`} alt="card cover" />
    </div>
  );
};
