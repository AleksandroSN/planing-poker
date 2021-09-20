import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
import "./inputText.scss";

export const InputText: FunctionComponent<InputTextProps> = ({
  labelText,
  defaultValue,
  register,
}: InputTextProps): JSX.Element => {
  return (
    <div className="input-text">
      <label htmlFor="inputText" className="input-text__label">
        {labelText}
        <input
          type="text"
          id="inputText"
          className="input-text__input"
          defaultValue={defaultValue}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register!(labelText!)}
        />
      </label>
    </div>
  );
};
