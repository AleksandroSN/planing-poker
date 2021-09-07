// import { useState } from "react";
import { InputText } from "../../../../components/InputText/InputText";
import { Switcher } from "../../../../components/Switcher/Switcher";

export const GameSettings: React.FC = () => {
  // const [isObserver, setIsObserver] = useState<boolean>(false);

  return (
    <div>
      <h2>Game Settings</h2>
      <div>
        <Switcher labelText="Scram master as player:" />
        <Switcher labelText="Changing card in round end:" />
        <Switcher labelText="Is timer needed:" />
        <InputText labelText="Score type:" />
      </div>
    </div>
  );
};
