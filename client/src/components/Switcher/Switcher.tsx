import { FunctionComponent, useState } from "react";
import "./switcher.scss";

interface SwitcherProps {
  labelText: string;
}

export const Switcher: FunctionComponent<SwitcherProps> = ({
  labelText,
}: SwitcherProps): JSX.Element => {
  const [isObserver, setIsObserver] = useState<boolean>(true);
  return (
    <div className="switcher">
      <p className="switcher__text">{labelText}</p>
      <label htmlFor="switcherBox" className="switcher__label">
        <input
          type="checkbox"
          name="switcherBox"
          className="switcher__input"
          checked={isObserver}
        />
        <span
          className="switcher__slider round"
          onClick={() => setIsObserver((prev) => !prev)}
          role="none"
        >
          switch
        </span>
      </label>
    </div>
  );
};
