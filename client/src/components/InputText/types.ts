import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputTextProps {
  labelText?: Path<FormValues>;
  defaultValue: string;
  register?: UseFormRegister<FormValues>;
}
