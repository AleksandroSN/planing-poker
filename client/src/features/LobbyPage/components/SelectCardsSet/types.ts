import { FieldError, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../../../types/interface";

export interface SelectCardsProps {
  onRegister: UseFormRegister<FormValues>;
  errors: Record<string, FieldError> | undefined;
}
