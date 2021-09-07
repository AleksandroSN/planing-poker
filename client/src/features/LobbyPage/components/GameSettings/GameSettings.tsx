import { InputText, Switcher, Timer } from "../../../../components";
import "./gameSettings.scss";

export const GameSettings: React.FC = () => {
  const test = true;
  return (
    <>
      <div className="game-settings">
        <Switcher labelText="Scram master as player:" />
        <Switcher labelText="Changing card in round end:" />
        <Switcher labelText="Is timer needed:" />
        <InputText labelText="Score type:" />
        <div className="game-settings__timer">
          Round time: <Timer settings={test} />
        </div>
      </div>
    </>
  );
};
