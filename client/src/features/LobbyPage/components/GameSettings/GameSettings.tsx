import { InputText, Switcher, Timer } from "../../../../components";
import "./gameSettings.scss";

export const GameSettings: React.FC = () => {
  return (
    <>
      <div className="game-settings">
        <Switcher labelText="Scram master as player:" />
        <Switcher labelText="Changing card in round end:" />
        <Switcher labelText="Is timer needed:" />
        <InputText labelText="Score type:" />
        <InputText labelText="Score type (Short):" />
        <div className="game-settings__timer">
          Round time: <Timer />
        </div>
      </div>
    </>
  );
};
