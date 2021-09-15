import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Button } from "../../../../components";
import "./style.scss";

interface ModalProps {
  open: boolean;
  close: () => void;
  handler?: () => void;
  heading: string;
  children: JSX.Element;
  footer?: JSX.Element;
  buttonTextConfirm: string;
  buttonTextReject: string;
}

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  close,
  handler,
  children,
  heading,
  footer,
  buttonTextConfirm,
  buttonTextReject,
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
                text={buttonTextConfirm}
                onClick={() => console.log("confirm")}
                classes="button-start"
              />
              <Button
                text={buttonTextReject}
                onClick={close}
                classes="button-cancel"
              />
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
