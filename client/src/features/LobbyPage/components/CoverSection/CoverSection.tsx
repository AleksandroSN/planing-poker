import { FunctionComponent, useState } from "react";
import { CoversDataModel } from "../../types/interface";
import { CardsCover } from "../CardsCover/CardsCover";
import { coversData } from "./coverSectionHelper";
import "./style.scss";

export const CoverSection: FunctionComponent = (): JSX.Element => {
  const [renderData, setRenderData] = useState<CoversDataModel[]>(coversData);
  const [state, setstate] = useState<string>("");

  const addInState = (str: string, idx: number): void => {
    setstate(str);
    const updatedData = renderData.map((data) => {
      if (data.idx === idx) {
        return {
          ...data,
          selected: true,
        };
      }
      return {
        ...data,
        selected: null,
      };
    });
    setRenderData(updatedData);
  };

  const cardsCover = renderData.map(({ idx, selected }) => {
    return (
      <CardsCover
        key={idx}
        imgNumber={idx}
        addInState={addInState}
        selected={selected}
      />
    );
  });

  return (
    <div className="game-cards__container">
      <div className="game-cards__cover">
        <h2 className="game-cards__cover-title text-24">Select cover:</h2>
        <div className="game-cards__cover-container">{cardsCover}</div>
      </div>
    </div>
  );
};
