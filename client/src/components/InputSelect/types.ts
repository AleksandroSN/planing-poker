import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputSelectProps {
  labelText?: Path<FormValues>;
  register?: UseFormRegister<FormValues>;
}
