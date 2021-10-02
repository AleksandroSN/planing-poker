import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValues } from "../../../../types/interface";

export interface GameSettingsProps {
  onRegister: UseFormRegister<FormValues>;
  onWatch: UseFormWatch<FormValues>;
}
