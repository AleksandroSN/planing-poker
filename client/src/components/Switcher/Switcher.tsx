import { FunctionComponent } from "react";
import { SwitcherProps } from "./types";
import "./switcher.scss";

export const Switcher: FunctionComponent<SwitcherProps> = ({
  labelText,
  id,
  defaultValue,
  register,
  toggleTimer,
}: SwitcherProps): JSX.Element => {
  return (
    <div className="switcher">
      <p className="switcher__text">{labelText}</p>
      <label htmlFor={id} className="switcher__label">
        <input
          type="checkbox"
          id={id}
          className="switcher__input"
          defaultChecked={defaultValue}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(labelText)}
        />
        <span
          className="switcher__slider round"
          onClick={toggleTimer}
          role="none"
        >
          switch
        </span>
      </label>
    </div>
  );
};
