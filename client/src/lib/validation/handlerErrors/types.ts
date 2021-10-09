import { Path, FieldError } from "react-hook-form";
import { FormValues } from "../../../types/interface";

export interface HandlerErrorsProps {
  labelText: Path<FormValues>;
  isError?: Record<string, FieldError> | undefined;
  classes: string;
}
