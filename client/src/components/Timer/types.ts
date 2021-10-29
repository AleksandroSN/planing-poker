import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface TimerProps {
  time?: Array<string>;
  isSettings: boolean;
  isTimer: boolean;
  register?: UseFormRegister<FormValues>;
}
