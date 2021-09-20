import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./style.scss";

interface ModalProps {
  open: boolean;
  heading: string;
  children: JSX.Element;
  footer?: JSX.Element;
}

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({
  open,
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
<<<<<<< HEAD
          <main>{children}</main>
=======
          <main>
            <form>{children}</form>
          </main>
>>>>>>> 7eff4ae (fix: fix img src, change input to InputText)
          {footer && <section>{footer}</section>}
        </div>
      </div>
    </>,
    portalDiv
  );
};
