import { FunctionComponent } from "react";
import "./progress.scss";

export const ProgressItem: FunctionComponent = () => {
  return (
    <div className="progress-item__wrapper">
      <div className="progress-item">In progress</div>
    </div>
  );
};
