import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputTextProps {
  labelText?: Path<FormValues>;
  register?: UseFormRegister<FormValues>;
  updateMessages?: (text: string) => void;
}
