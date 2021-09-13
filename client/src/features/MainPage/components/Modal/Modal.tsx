import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "../../../../components/Button/Button/Button";
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
            {children}
            <div className="modal-buttons">
              <Button
                text="Confirm"
                onClick={() => console.log(`confirm`)}
                classes="button-start"
              />
              <Button text="Cancel" onClick={close} classes="button-cancel" />
            </div>
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