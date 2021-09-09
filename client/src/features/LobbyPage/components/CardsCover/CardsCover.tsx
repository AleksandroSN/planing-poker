import { FunctionComponent } from "react";

interface CardsCoverProps {
  imgNumber: number;
}

export const CardsCover: FunctionComponent<CardsCoverProps> = ({
  imgNumber,
}): JSX.Element => {
  return (
    <div className="game-cards__cover-item">
      <img src={`./img/cover${imgNumber}.png`} alt="card cover" />
    </div>
  );
};
