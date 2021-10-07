import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputRadioProps {
  labelText: Path<FormValues>;
  idInput: string;
  inputText: string;
  inputValue: string;
  onRegister: UseFormRegister<FormValues>;
}
