import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { InputText, Switcher, Timer } from "../../../../components";
import { FormValues } from "../../../../types/interface";
import "./gameSettings.scss";

export const GameSettings: FunctionComponent = (): JSX.Element => {
  const { register } = useForm<FormValues>();
  return (
    <>
      <div className="game-settings">
        <Switcher labelText="Scram master as player:" />
        <Switcher labelText="Changing card in round end:" />
        <Switcher labelText="Is timer needed:" />
        <InputText
          labelText="Score type:"
          defaultValue=""
          register={register}
        />
        <InputText
          labelText="Score type (Short):"
          defaultValue=""
          register={register}
        />
        <div className="game-settings__timer">
          Round time: <Timer isSettings time="3:30" isTimer={false} />
        </div>
      </div>
    </>
  );
};
