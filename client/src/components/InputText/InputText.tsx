import { FunctionComponent } from "react";
import "./inputText.scss";

interface InputTextProps {
  labelText: string;
}

export const InputText: FunctionComponent<InputTextProps> = ({
  labelText,
}: InputTextProps) => {
  return (
    <div className="input-text">
      <label htmlFor="inputText" className="input-text__label">
        {labelText}
        <input type="text" name="inputText" className="input-text__input" />
      </label>
    </div>
  );
};
