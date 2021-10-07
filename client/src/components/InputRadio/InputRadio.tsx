import { FunctionComponent } from "react";
import { InputRadioProps } from "./types";
import "./style.scss";

export const InputRadio: FunctionComponent<InputRadioProps> = ({
  labelText,
  idInput,
  inputText,
  inputValue,
  onRegister,
}: InputRadioProps): JSX.Element => {
  return (
    <>
      <label htmlFor={idInput} className="lobby-page__cards-value__item">
        <input
          type="radio"
          value={inputValue}
          id={idInput}
          className="lobby-page__cards-value__input"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...onRegister(labelText)}
        />
        <span className="lobby-page__cards-value__text">{inputText}</span>
      </label>
    </>
  );
};
