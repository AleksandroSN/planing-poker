import { FunctionComponent } from "react";
import { CardsCover } from "../CardsCover/CardsCover";
import "./style.scss";

// interface CoverSectionProps {
//     message?: string;
// }

// TO-DO onClick cover selected cover add new class and add in state

export const CoverSection: FunctionComponent = (): JSX.Element => {
  return (
    <div className="game-cards__container">
      <div className="game-cards__cover">
        <h2 className="game-cards__cover-title text-24">Select cover:</h2>
        <div className="game-cards__cover-container">
          <CardsCover imgNumber={1} />
          <CardsCover imgNumber={2} />
          <CardsCover imgNumber={3} />
          <CardsCover imgNumber={4} />
          <CardsCover imgNumber={5} />
        </div>
      </div>
    </div>
  );
};
