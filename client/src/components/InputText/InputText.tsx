import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
import "./inputText.scss";

export const InputText: FunctionComponent<InputTextProps> = ({
  labelText,
  defaultValue,
  inputClasses,
  labelClasses,
  isTimer,
  register,
}: InputTextProps): JSX.Element => {
  return (
    <div className="input-text">
      <label
        htmlFor="inputText"
        className={labelClasses || "input-text__label"}
      >
        {labelText} :
        <input
          type="text"
          id="inputText"
          className={inputClasses || "input-text__input"}
          defaultValue={defaultValue}
          disabled={isTimer || false}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register!(labelText!)}
        />
      </label>
    </div>
  );
};
