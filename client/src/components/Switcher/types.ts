import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface SwitcherProps {
  labelText: Path<FormValues>;
  id: string;
  register: UseFormRegister<FormValues>;
  toggleTimer?: () => void;
}
