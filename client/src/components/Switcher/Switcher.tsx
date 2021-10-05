import { FunctionComponent } from "react";
import { SwitcherProps } from "./types";
import "./switcher.scss";

export const Switcher: FunctionComponent<SwitcherProps> = ({
  labelText,
  id,
  defaultValue,
  register,
  toggle,
}: SwitcherProps): JSX.Element => {
  return (
    <div className="switcher">
      <p className="switcher__text">{labelText}</p>
      <label htmlFor={id} className="switcher__label">
        <input
          type="checkbox"
          id={id}
          className="switcher__input"
          checked={defaultValue}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(labelText)}
          onChange={toggle}
        />
        <span className="switcher__slider round" role="none">
          switch
        </span>
      </label>
    </div>
  );
};
