import { FunctionComponent } from "react";
import "./inputSelect.scss";

interface InputTextProps {
  labelText: string;
}

export const InputSelect: FunctionComponent<InputTextProps> = ({
  labelText,
}: InputTextProps): JSX.Element => {
  return (
    <div className="input-select">
      <label htmlFor="inputSelect" className="input-select__label">
        {labelText}
        <select
          name="inputSelect"
          id="inputSelect"
          className="input-select__input"
        >
          <option value="low">Low</option>
          <option value="middle">Middle</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
};
