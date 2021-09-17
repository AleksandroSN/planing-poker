import { FunctionComponent } from "react";
import { InputSelectProps } from "./types";
import "./inputSelect.scss";

export const InputSelect: FunctionComponent<InputSelectProps> = ({
  labelText,
  register,
}: InputSelectProps): JSX.Element => {
  return (
    <div className="input-select">
      <label htmlFor="inputSelect" className="input-select__label">
        {labelText}
        <select
          id="inputSelect"
          className="input-select__input"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register!(labelText!)}
        >
          <option value="low">Low</option>
          <option value="middle">Middle</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
};
