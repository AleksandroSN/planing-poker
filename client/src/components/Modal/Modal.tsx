import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button";
import "./style.scss";
import { ModalProps } from "./types";

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({
  idForm,
  onCancel,
  open,
  children,
  heading,
  buttonTextConfirm,
  buttonClassesConfirm = "button-start",
  buttonTextCancel,
  buttonClassesCancel = "button-cancel",
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
            <Button
              idForm={idForm}
              classes={buttonClassesConfirm}
              type="submit"
            >
              {buttonTextConfirm}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              classes={buttonClassesCancel}
            >
              {buttonTextCancel}
            </Button>
          </div>
        </article>
      </div>
    </>,
    portalDiv
  );
};
