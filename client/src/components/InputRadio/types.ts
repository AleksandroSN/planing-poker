import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "../../types/interface";

export interface InputRadioProps {
  inputProps: InputTextDep;
  hookForm?: HookFormDep;
}

export interface InputTextDep {
  labelText: Path<FormValues>;
  idInput: string;
  inputText: string;
  inputValue: string;
}

export interface HookFormDep {
  regOptions?: RegisterOptions;
  isError?: Record<string, FieldError> | undefined;
  onRegister: UseFormRegister<FormValues>;
}
