import { useState } from "react";
import "./switcher.scss";

interface SwitcherProps {
  labelText: string;
}

export const Switcher: React.FC<SwitcherProps> = ({
  labelText,
}: SwitcherProps) => {
  const [isObserver, setIsObserver] = useState<boolean>(false);
  return (
    <div className="switcher">
      <p className="switcher__text">{labelText}</p>
      <label htmlFor="userRole" className="switcher__label">
        <input
          type="checkbox"
          name="userRole"
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
