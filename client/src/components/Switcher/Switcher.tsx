import { FunctionComponent, useState } from "react";
import { SwitcherProps } from "./types";
import "./switcher.scss";

export const Switcher: FunctionComponent<SwitcherProps> = ({
  labelText,
  id,
  register,
  toggleTimer,
}: SwitcherProps): JSX.Element => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const handlerClick = () => {
    if (toggleTimer) {
      setIsCheck((prev) => !prev);
      toggleTimer();
    }
    setIsCheck((prev) => !prev);
  };
  return (
    <div className="switcher">
      <p className="switcher__text">{labelText}</p>
      <label htmlFor={id} className="switcher__label">
        <input
          type="checkbox"
          id={id}
          className="switcher__input"
          defaultChecked={isCheck}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(labelText)}
        />
        <span
          className="switcher__slider round"
          onClick={handlerClick}
          role="none"
        >
          switch
        </span>
      </label>
    </div>
  );
};
