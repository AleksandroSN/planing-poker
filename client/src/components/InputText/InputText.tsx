import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
import { handlerErrors } from "../../lib";
import "./inputText.scss";

export const InputText: FunctionComponent<InputTextProps> = ({
  inputProps,
  hookForm,
}: InputTextProps): JSX.Element => {
  const errors = handlerErrors({
    labelText: inputProps.labelText,
    isError: hookForm?.isError,
    classes: "input-text__error",
  });
  return (
    <div className="input-text">
      {errors}
      <label
        htmlFor="inputText"
        className={inputProps.labelClasses || "input-text__label"}
      >
        {inputProps.labelText} :
        <input
          type="text"
          id="inputText"
          className={inputProps.inputClasses || "input-text__input"}
          defaultValue={inputProps.defaultValue}
          disabled={inputProps.isDisabled || false}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(hookForm && {
            ...hookForm.onRegister(inputProps.labelText, hookForm.regOptions),
          })}
        />
      </label>
    </div>
  );
};
