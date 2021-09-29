import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
import { handlerErrors } from "./inputTextHelper";
import "./inputText.scss";

export const InputText: FunctionComponent<InputTextProps> = ({
  inputProps,
  hookForm,
}: InputTextProps): JSX.Element => {
  const errors = handlerErrors({ hookForm, inputProps });
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
          disabled={inputProps.isTimer || false}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(hookForm && {
            ...hookForm.onRegister(inputProps.labelText, hookForm.regOptions),
          })}
        />
      </label>
    </div>
  );
};

//   {
//   ...hookForm!.regOptions,
//   pattern: hookForm?.regOptions?.pattern || /^[A-Za-z]+$/i,
// }
