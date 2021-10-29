import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface SwitcherProps {
  labelText: Path<FormValues>;
  id: string;
  defaultValue: boolean;
  register: UseFormRegister<FormValues>;
  toggle?: () => void;
}
