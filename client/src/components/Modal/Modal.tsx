import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button/Button/Button";
import "./style.scss";

interface ModalProps {
  open: boolean;
  close: () => void;
  heading: string;
  children: string;
  footer?: JSX.Element;
}

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  close,
  children,
  heading,
  footer,
}): JSX.Element => {
  if (!open) return null as never;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay">
        <div className="modal">
          <section>
            <h1>{heading}</h1>
          </section>
          <main>
            <form>{children}</form>
          </main>
          {footer && <section>{footer}</section>}
        </div>
      </div>
    </>,
    portalDiv
  );
};

Modal.defaultProps = {
  footer: undefined,
};
