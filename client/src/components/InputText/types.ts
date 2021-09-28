import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputTextProps {
  inputProps: InputTextDep;
  hookForm?: HookFormDep;
}

export interface InputTextDep {
  labelText: Path<FormValues>;
  defaultValue?: string;
  labelClasses?: string;
  inputClasses?: string;
  isTimer?: boolean;
}

export interface HookFormDep {
  regOptions?: RegisterOptions;
  isError?: Record<string, FieldError> | undefined;
  onRegister: UseFormRegister<FormValues>;
}
