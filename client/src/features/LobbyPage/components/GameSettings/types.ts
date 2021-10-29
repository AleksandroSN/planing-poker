import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValues } from "../../../../types/interface";

export interface GameSettingsProps {
  onRegister: UseFormRegister<FormValues>;
  onWatch: UseFormWatch<FormValues>;
  errors: Record<string, FieldError> | undefined;
}
