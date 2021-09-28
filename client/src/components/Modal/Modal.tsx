import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button";
import "./style.scss";

interface ModalProps {
  idForm?: string;
  onCancel: () => void;
  open: boolean;
  heading: string;
  children: JSX.Element;
}

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({
  idForm,
  onCancel,
  open,
  children,
  heading,
}): JSX.Element => {
  if (!open) return null as never;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay">
        <article className="modal">
          <section>
            <h2 className="modal__title">{heading}</h2>
          </section>
          <main>{children}</main>
          <div className="modal-buttons">
            <Button idForm={idForm} classes="button-start" type="submit">
              Confirm
            </Button>
            <Button type="button" onClick={onCancel} classes="button-cancel">
              Cancel
            </Button>
          </div>
        </article>
      </div>
    </>,
    portalDiv
  );
};
