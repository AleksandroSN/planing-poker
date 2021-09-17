import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
import "./inputText.scss";

export const InputText: FunctionComponent<InputTextProps> = ({
  labelText,
  register,
  updateMessages,
}: InputTextProps): JSX.Element => {
  const getInputValue = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return;
    const inputValue = (ev.target as HTMLInputElement).value;
    if (updateMessages) {
      updateMessages(inputValue);
    }
    // eslint-disable-next-line no-param-reassign
    (ev.target as HTMLInputElement).value = "";
  };

  return (
    <div className="input-text">
      <label htmlFor="inputText" className="input-text__label">
        {labelText}
        <input
          type="text"
          id="inputText"
          className="input-text__input"
          onKeyDown={(ev) => getInputValue(ev)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register!(labelText!)}
        />
      </label>
    </div>
  );
};
