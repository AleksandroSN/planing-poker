/* eslint-disable jsx-a11y/label-has-associated-control */
import { FunctionComponent } from "react";
import { InputRadioProps } from "./types";
import { handlerErrors } from "../../lib";
import "./style.scss";

export const InputRadio: FunctionComponent<InputRadioProps> = ({
  inputProps,
  hookForm,
}: InputRadioProps): JSX.Element => {
  const errors = handlerErrors({
    labelText: inputProps.labelText,
    isError: hookForm?.isError,
    classes: "input-radio__error",
  });
  return (
    <div className="field-row">
      <input
        type="radio"
        value={inputProps.inputValue}
        id={inputProps.idInput}
        className="lobby-page__cards-value__input"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(hookForm && {
          ...hookForm.onRegister(inputProps.labelText, hookForm.regOptions),
        })}
      />
      <label
        htmlFor={inputProps.idInput}
        className="lobby-page__cards-value__item"
      >
        <span className="lobby-page__cards-value__text">
          {inputProps.inputText}
        </span>
      </label>

      {errors}
    </div>
  );
};
