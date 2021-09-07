import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./style.scss";

interface ModalProps {
    heading: string;
    footer?: JSX.Element;
}

const portalDiv = document.getElementById("portal") as HTMLElement;

export const Modal: FunctionComponent<ModalProps> = ({ children, heading, footer }): JSX.Element => {

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay">
                <div className="modal">               
                    <section>
                        <h1>{heading}</h1>
                    </section>
                    <main>
                        {children}
                    </main>
                    {footer && <section>{footer}</section>} 
                </div>
            </div>  
        </>, 
        portalDiv
    )
};
