export interface ModalProps {
  idForm?: string;
  onCancel: () => void;
  open: boolean;
  heading: string;
  children: JSX.Element;
  buttonTextConfirm: string;
  buttonTextCancel: string;
}