export interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  classes?: string | undefined;
  idForm?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
}
