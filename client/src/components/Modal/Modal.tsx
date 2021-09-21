import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD:client/src/components/Modal/Modal.tsx
=======
import { Button } from "../Button/Button/Button";
>>>>>>> 7eff4ae976f8109e5a8b808e6eb11c14eeb79a85:client/src/features/MainPage/components/Modal/Modal.tsx
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
          <main>{children}</main>
          {footer && <section>{footer}</section>}
        </div>
      </div>
    </>,
    portalDiv
  );
};
