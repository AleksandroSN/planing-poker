import { FunctionComponent } from "react";
import "./inputText.scss";

interface InputTextProps {
  labelText: string;
  updateMessages?: (text: string) => void;
}

export const InputText: FunctionComponent<InputTextProps> = ({
  labelText,
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
          name="inputText"
          className="input-text__input"
          onKeyDown={(ev) => getInputValue(ev)}
        />
      </label>
    </div>
  );
};
